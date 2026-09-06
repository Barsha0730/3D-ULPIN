import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { 
  Parcel, 
  Building, 
  PropertyVolume, 
  UndergroundAsset, 
  LayerVisibilityState 
} from '../../types';
import { 
  Maximize2, 
  Minimize2, 
  RotateCcw, 
  Layers, 
  Eye, 
  EyeOff, 
  Compass, 
  Box, 
  Info,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface Cadastral3DViewerProps {
  parcels: Parcel[];
  buildings: Building[];
  properties: PropertyVolume[];
  undergroundAssets: UndergroundAsset[];
  selectedParcelId: string | null;
  selectedBuildingId: string | null;
  selectedFloorNumber: number | null;
  selectedPropertyId: string | null;
  selectedInfrastructureId: string | null;
  explodedFloors: boolean;
  undergroundMode: boolean;
  layerVisibility: LayerVisibilityState;
  onSelectParcel: (parcelId: string | null) => void;
  onSelectBuilding: (buildingId: string | null) => void;
  onSelectFloor: (floorNumber: number | null) => void;
  onSelectProperty: (propertyId: string | null) => void;
  onSelectInfrastructure: (assetId: string | null) => void;
  height?: string;
  showControls?: boolean;
}

export const Cadastral3DViewer: React.FC<Cadastral3DViewerProps> = ({
  parcels,
  buildings,
  properties,
  undergroundAssets,
  selectedParcelId,
  selectedBuildingId,
  selectedFloorNumber,
  selectedPropertyId,
  selectedInfrastructureId,
  explodedFloors,
  undergroundMode,
  layerVisibility,
  onSelectParcel,
  onSelectBuilding,
  onSelectFloor,
  onSelectProperty,
  onSelectInfrastructure,
  height = '100%',
  showControls = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Group references for clean layer toggle
  const groupsRef = useRef<{
    parcels: THREE.Group;
    buildings: THREE.Group;
    floors: THREE.Group;
    properties: THREE.Group;
    roads: THREE.Group;
    underground: THREE.Group;
    terrain: THREE.Group;
    selectedHighlight: THREE.Group;
  }>({
    parcels: new THREE.Group(),
    buildings: new THREE.Group(),
    floors: new THREE.Group(),
    properties: new THREE.Group(),
    roads: new THREE.Group(),
    underground: new THREE.Group(),
    terrain: new THREE.Group(),
    selectedHighlight: new THREE.Group()
  });

  const groundMeshRef = useRef<THREE.Mesh | null>(null);
  const groundGridRef = useRef<THREE.GridHelper | null>(null);

  // Camera control state
  const isDraggingRef = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const cameraTargetRef = useRef(new THREE.Vector3(0, 5, 0));
  const cameraAngleRef = useRef({ theta: Math.PI / 4, phi: Math.PI / 3, radius: 95 });

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [cameraPreset, setCameraPreset] = useState<'perspective' | 'top' | 'isometric'>('perspective');
  const [hoveredEntity, setHoveredEntity] = useState<string | null>(null);

  // Update camera position from spherical angles
  const updateCameraPosition = useCallback(() => {
    if (!cameraRef.current) return;
    const { theta, phi, radius } = cameraAngleRef.current;
    const target = cameraTargetRef.current;

    const x = target.x + radius * Math.sin(phi) * Math.sin(theta);
    const y = target.y + radius * Math.cos(phi);
    const z = target.z + radius * Math.sin(phi) * Math.cos(theta);

    cameraRef.current.position.set(x, y, z);
    cameraRef.current.lookAt(target);
  }, []);

  // Initialize Three.js scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#060913');
    scene.fog = new THREE.FogExp2('#060913', 0.0035);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      1,
      1000
    );
    cameraRef.current = camera;
    updateCameraPosition();

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight('#94a3b8', 1.2);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight('#38bdf8', 1.8);
    sunLight.position.set(60, 100, 40);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight('#06b6d4', 0.8);
    fillLight.position.set(-60, -20, -40);
    scene.add(fillLight);

    // Add groups to scene
    const groups = groupsRef.current;
    scene.add(groups.terrain);
    scene.add(groups.parcels);
    scene.add(groups.roads);
    scene.add(groups.buildings);
    scene.add(groups.floors);
    scene.add(groups.properties);
    scene.add(groups.underground);
    scene.add(groups.selectedHighlight);

    // Ground Plane
    const groundGeo = new THREE.PlaneGeometry(300, 300);
    const groundMat = new THREE.MeshStandardMaterial({
      color: '#0a1020',
      roughness: 0.85,
      metalness: 0.2,
      transparent: true,
      opacity: 1.0
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.receiveShadow = true;
    groundMeshRef.current = groundMesh;
    groups.terrain.add(groundMesh);

    // Ground Grid
    const grid = new THREE.GridHelper(300, 60, '#0284c7', '#0f172a');
    grid.position.y = 0.05;
    groundGridRef.current = grid;
    groups.terrain.add(grid);

    // Resize handler
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // Animation Loop
    let time = 0;
    const animate = () => {
      time += 0.015;
      animationFrameRef.current = requestAnimationFrame(animate);

      // Subtle pulse on underground assets or highlights
      if (groups.underground.children.length > 0) {
        groups.underground.children.forEach((child, i) => {
          if ((child as any).material && (child as any).material.emissive) {
            (child as any).material.emissiveIntensity = 0.5 + 0.3 * Math.sin(time * 2 + i);
          }
        });
      }

      // Smooth camera interpolation
      updateCameraPosition();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      resizeObserver.disconnect();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [updateCameraPosition]);

  // Handle Underground Mode opacity and lighting
  useEffect(() => {
    if (groundMeshRef.current && groundGridRef.current) {
      if (undergroundMode) {
        (groundMeshRef.current.material as THREE.MeshStandardMaterial).opacity = 0.22;
        groundGridRef.current.position.y = 0.02;
        // Adjust camera angle if above ground
        if (cameraAngleRef.current.phi < Math.PI / 2.2) {
          cameraAngleRef.current.phi = Math.PI / 1.8;
          cameraAngleRef.current.radius = 85;
          cameraTargetRef.current.y = -3;
        }
      } else {
        (groundMeshRef.current.material as THREE.MeshStandardMaterial).opacity = 0.98;
        if (cameraAngleRef.current.phi > Math.PI / 2) {
          cameraAngleRef.current.phi = Math.PI / 3;
          cameraAngleRef.current.radius = 95;
          cameraTargetRef.current.y = 5;
        }
      }
    }
  }, [undergroundMode]);

  // Build/Rebuild 3D objects when data or explosion mode changes
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const { parcels: parcelGrp, buildings: bldgGrp, underground: ugGrp, roads: roadGrp } = groupsRef.current;

    // Clear previous dynamic meshes
    while (parcelGrp.children.length > 0) parcelGrp.remove(parcelGrp.children[0]);
    while (bldgGrp.children.length > 0) bldgGrp.remove(bldgGrp.children[0]);
    while (ugGrp.children.length > 0) ugGrp.remove(ugGrp.children[0]);
    while (roadGrp.children.length > 0) roadGrp.remove(roadGrp.children[0]);

    // 1. Build Parcels
    parcels.forEach((p, idx) => {
      const isSelected = p.parcelId === selectedParcelId;
      // Position offset based on demo parcels
      const xOffset = (idx === 0) ? 0 : (idx === 1) ? 52 : (idx === 2) ? -50 : (idx === 3) ? 10 : 65;
      const zOffset = (idx === 0) ? 0 : (idx === 1) ? -15 : (idx === 2) ? -25 : (idx === 3) ? 45 : 35;

      const parcelShape = new THREE.Shape();
      const hw = p.dimensions.width / 2;
      const hd = p.dimensions.depth / 2;
      parcelShape.moveTo(-hw, -hd);
      parcelShape.lineTo(hw, -hd);
      parcelShape.lineTo(hw, hd);
      parcelShape.lineTo(-hw, hd);
      parcelShape.closePath();

      const geom = new THREE.ShapeGeometry(parcelShape);
      const mat = new THREE.MeshStandardMaterial({
        color: isSelected ? '#0284c7' : '#0c1a30',
        roughness: 0.6,
        metalness: 0.3,
        transparent: true,
        opacity: isSelected ? 0.75 : 0.45
      });
      const mesh = new THREE.Mesh(geom, mat);
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.set(xOffset, 0.1, zOffset);
      mesh.userData = { type: 'parcel', id: p.parcelId };
      parcelGrp.add(mesh);

      // Cadastral border line with cyan glow
      const edges = new THREE.EdgesGeometry(geom);
      const lineMat = new THREE.LineBasicMaterial({
        color: isSelected ? '#38bdf8' : '#0284c7',
        linewidth: isSelected ? 2 : 1
      });
      const line = new THREE.LineSegments(edges, lineMat);
      line.rotation.x = -Math.PI / 2;
      line.position.set(xOffset, 0.15, zOffset);
      parcelGrp.add(line);
    });

    // 2. Build Roads
    const roadMat = new THREE.MeshStandardMaterial({ color: '#090d18', roughness: 0.9 });
    const roadH = new THREE.Mesh(new THREE.PlaneGeometry(280, 12), roadMat);
    roadH.rotation.x = -Math.PI / 2;
    roadH.position.set(0, 0.08, 26);
    roadGrp.add(roadH);

    const roadV = new THREE.Mesh(new THREE.PlaneGeometry(12, 280), roadMat);
    roadV.rotation.x = -Math.PI / 2;
    roadV.position.set(26, 0.08, 0);
    roadGrp.add(roadV);

    // 3. Build Buildings with Floor Separation
    buildings.forEach((b) => {
      const isSelectedBuilding = b.buildingId === selectedBuildingId;
      const bldgX = b.position.x;
      const bldgZ = b.position.z;

      // Render each floor
      b.floors.forEach((f) => {
        const isSelectedFloor = isSelectedBuilding && f.floorNumber === selectedFloorNumber;
        const floorH = f.topHeight - f.baseHeight;

        // When exploded, add vertical gap separation
        const verticalOffset = explodedFloors ? (f.floorNumber * 4.2) : 0;
        const currentY = f.baseHeight + floorH / 2 + verticalOffset;

        // Slab Geometry
        const slabGeo = new THREE.BoxGeometry(b.dimensions.width, floorH * 0.92, b.dimensions.depth);

        // Check if a property on this floor is selected
        const hasSelectedProp = properties.some(
          p => p.buildingId === b.buildingId && p.floorNumber === f.floorNumber && p.propertyId === selectedPropertyId
        );

        const floorMat = new THREE.MeshStandardMaterial({
          color: isSelectedFloor 
            ? '#0284c7' 
            : hasSelectedProp 
              ? '#0369a1' 
              : f.floorNumber === 0 
                ? '#1e293b' 
                : '#0f172a',
          roughness: 0.35,
          metalness: 0.65,
          transparent: true,
          opacity: (explodedFloors || isSelectedBuilding) ? 0.85 : 0.92
        });

        const floorMesh = new THREE.Mesh(slabGeo, floorMat);
        floorMesh.position.set(bldgX, currentY, bldgZ);
        floorMesh.castShadow = true;
        floorMesh.receiveShadow = true;
        floorMesh.userData = { 
          type: 'floor', 
          buildingId: b.buildingId, 
          floorNumber: f.floorNumber,
          floorId: f.floorId
        };
        bldgGrp.add(floorMesh);

        // Architectural edge lines
        const edgeGeo = new THREE.EdgesGeometry(slabGeo);
        const edgeMat = new THREE.LineBasicMaterial({
          color: isSelectedFloor ? '#38bdf8' : '#0ea5e9',
          transparent: true,
          opacity: isSelectedFloor ? 0.9 : 0.4
        });
        const edgeLines = new THREE.LineSegments(edgeGeo, edgeMat);
        edgeLines.position.copy(floorMesh.position);
        bldgGrp.add(edgeLines);

        // Glass window panels
        const windowGeo = new THREE.PlaneGeometry(b.dimensions.width * 0.9, floorH * 0.55);
        const windowMat = new THREE.MeshStandardMaterial({
          color: '#38bdf8',
          roughness: 0.1,
          metalness: 0.9,
          emissive: '#0284c7',
          emissiveIntensity: 0.15,
          transparent: true,
          opacity: 0.7
        });
        
        // Front window
        const winFront = new THREE.Mesh(windowGeo, windowMat);
        winFront.position.set(bldgX, currentY, bldgZ + b.dimensions.depth / 2 + 0.05);
        bldgGrp.add(winFront);

        // Back window
        const winBack = new THREE.Mesh(windowGeo, windowMat);
        winBack.position.set(bldgX, currentY, bldgZ - b.dimensions.depth / 2 - 0.05);
        winBack.rotation.y = Math.PI;
        bldgGrp.add(winBack);
      });

      // Core Elevator Shaft when exploded
      if (explodedFloors) {
        const totalExplodedH = b.height + (b.floorCount * 4.2);
        const coreGeo = new THREE.BoxGeometry(6, totalExplodedH, 6);
        const coreMat = new THREE.MeshStandardMaterial({
          color: '#0284c7',
          roughness: 0.2,
          metalness: 0.8,
          wireframe: true,
          transparent: true,
          opacity: 0.65
        });
        const coreMesh = new THREE.Mesh(coreGeo, coreMat);
        coreMesh.position.set(bldgX, totalExplodedH / 2, bldgZ);
        bldgGrp.add(coreMesh);
      }
    });

    // 4. Highlight Selected Property Volume
    if (selectedPropertyId) {
      const prop = properties.find(p => p.propertyId === selectedPropertyId);
      if (prop) {
        const bldg = buildings.find(b => b.buildingId === prop.buildingId);
        if (bldg) {
          const bldgX = bldg.position.x;
          const bldgZ = bldg.position.z;
          const verticalOffset = explodedFloors ? (prop.floorNumber * 4.2) : 0;
          const posY = prop.relativePosition.y + verticalOffset;
          const posX = bldgX + prop.relativePosition.x;
          const posZ = bldgZ + prop.relativePosition.z;

          // Translucent Glowing 3D Property Volume Box
          const volGeo = new THREE.BoxGeometry(
            prop.dimensions.width,
            prop.dimensions.height,
            prop.dimensions.depth
          );
          const volMat = new THREE.MeshStandardMaterial({
            color: '#06b6d4',
            emissive: '#06b6d4',
            emissiveIntensity: 0.6,
            roughness: 0.1,
            metalness: 0.5,
            transparent: true,
            opacity: 0.65
          });
          const volMesh = new THREE.Mesh(volGeo, volMat);
          volMesh.position.set(posX, posY, posZ);
          bldgGrp.add(volMesh);

          // Glowing wireframe cage
          const volEdges = new THREE.EdgesGeometry(volGeo);
          const volLineMat = new THREE.LineBasicMaterial({
            color: '#ffffff',
            linewidth: 2
          });
          const volLines = new THREE.LineSegments(volEdges, volLineMat);
          volLines.position.set(posX, posY, posZ);
          bldgGrp.add(volLines);
        }
      }
    }

    // 5. Build Underground Infrastructure
    undergroundAssets.forEach((asset) => {
      const isSelected = asset.infrastructureId === selectedInfrastructureId;
      if (asset.type === 'Underground Parking') {
        // Underground Bunker Box
        const pGeo = new THREE.BoxGeometry(36, 4.5, 24);
        const pMat = new THREE.MeshStandardMaterial({
          color: asset.color,
          roughness: 0.4,
          metalness: 0.6,
          transparent: true,
          opacity: isSelected ? 0.9 : 0.6,
          emissive: asset.color,
          emissiveIntensity: isSelected ? 0.6 : 0.25
        });
        const pMesh = new THREE.Mesh(pGeo, pMat);
        pMesh.position.set(0, -asset.depth, 0);
        pMesh.userData = { type: 'infrastructure', id: asset.infrastructureId };
        ugGrp.add(pMesh);

        const pEdge = new THREE.LineSegments(
          new THREE.EdgesGeometry(pGeo),
          new THREE.LineBasicMaterial({ color: '#c084fc', linewidth: 2 })
        );
        pEdge.position.copy(pMesh.position);
        ugGrp.add(pEdge);
      } else {
        // Pipeline/Conduit Curve using TubeGeometry
        const points = asset.path.map(pt => new THREE.Vector3(pt[0], pt[1], pt[2]));
        const curve = new THREE.CatmullRomCurve3(points);
        const tubeGeo = new THREE.TubeGeometry(curve, 32, isSelected ? 1.4 : 0.85, 12, false);
        const tubeMat = new THREE.MeshStandardMaterial({
          color: asset.color,
          emissive: asset.color,
          emissiveIntensity: isSelected ? 0.9 : 0.5,
          roughness: 0.2,
          metalness: 0.7,
          transparent: true,
          opacity: 0.95
        });
        const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
        tubeMesh.userData = { type: 'infrastructure', id: asset.infrastructureId };
        ugGrp.add(tubeMesh);
      }
    });

    // Visibility toggles
    parcelGrp.visible = layerVisibility.parcels;
    roadGrp.visible = layerVisibility.roads;
    bldgGrp.visible = layerVisibility.buildings;
    ugGrp.visible = layerVisibility.water || layerVisibility.sewer || layerVisibility.electricity || layerVisibility.undergroundParking;

  }, [
    parcels,
    buildings,
    properties,
    undergroundAssets,
    selectedParcelId,
    selectedBuildingId,
    selectedFloorNumber,
    selectedPropertyId,
    selectedInfrastructureId,
    explodedFloors,
    layerVisibility
  ]);

  // Handle Layer Visibility toggles dynamically
  useEffect(() => {
    const { parcels: pG, buildings: bG, roads: rG, underground: uG } = groupsRef.current;
    pG.visible = layerVisibility.parcels;
    bG.visible = layerVisibility.buildings;
    rG.visible = layerVisibility.roads;
    uG.visible = undergroundMode || layerVisibility.water || layerVisibility.sewer || layerVisibility.electricity || layerVisibility.undergroundParking;
  }, [layerVisibility, undergroundMode]);

  // Raycasting Click and Hover Interaction
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDraggingRef.current) {
      const deltaX = e.clientX - previousMousePosition.current.x;
      const deltaY = e.clientY - previousMousePosition.current.y;

      // Orbit around center
      cameraAngleRef.current.theta -= deltaX * 0.007;
      cameraAngleRef.current.phi = Math.max(
        0.1,
        Math.min(Math.PI - 0.1, cameraAngleRef.current.phi + deltaY * 0.007)
      );

      previousMousePosition.current = { x: e.clientX, y: e.clientY };
      updateCameraPosition();
      return;
    }

    // Hover Raycasting
    const container = containerRef.current;
    const camera = cameraRef.current;
    const scene = sceneRef.current;
    if (!container || !camera || !scene) return;

    const rect = container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
    const y = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

    const checkObjects = [
      ...groupsRef.current.buildings.children,
      ...groupsRef.current.parcels.children,
      ...groupsRef.current.underground.children
    ];

    const intersects = raycaster.intersectObjects(checkObjects, true);
    if (intersects.length > 0) {
      const hit = intersects[0].object;
      if (hit.userData?.type) {
        setHoveredEntity(`${hit.userData.type.toUpperCase()}: ${hit.userData.id || hit.userData.buildingId || ''}`);
        container.style.cursor = 'pointer';
        return;
      }
    }
    setHoveredEntity(null);
    container.style.cursor = 'grab';
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;

    // Check if it was a quick click rather than a drag
    const container = containerRef.current;
    const camera = cameraRef.current;
    if (!container || !camera) return;

    const rect = container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
    const y = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

    const checkObjects = [
      ...groupsRef.current.buildings.children,
      ...groupsRef.current.parcels.children,
      ...groupsRef.current.underground.children
    ];

    const intersects = raycaster.intersectObjects(checkObjects, true);
    if (intersects.length > 0) {
      const hit = intersects[0].object;
      const data = hit.userData;

      if (data.type === 'parcel') {
        onSelectParcel(data.id);
      } else if (data.type === 'floor') {
        onSelectBuilding(data.buildingId);
        onSelectFloor(data.floorNumber);
      } else if (data.type === 'infrastructure') {
        onSelectInfrastructure(data.id);
      }
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    cameraAngleRef.current.radius = Math.max(
      20,
      Math.min(220, cameraAngleRef.current.radius + e.deltaY * 0.08)
    );
    updateCameraPosition();
  };

  // Fly Camera to Selected Target
  const flyToTarget = (x: number, y: number, z: number, radius = 55) => {
    cameraTargetRef.current.set(x, y, z);
    cameraAngleRef.current.radius = radius;
    cameraAngleRef.current.phi = Math.PI / 3;
    updateCameraPosition();
  };

  // Focus effect when selected property changes
  useEffect(() => {
    if (selectedPropertyId) {
      const prop = properties.find(p => p.propertyId === selectedPropertyId);
      if (prop) {
        const bldg = buildings.find(b => b.buildingId === prop.buildingId);
        const posX = (bldg ? bldg.position.x : 0) + prop.relativePosition.x;
        const posY = prop.relativePosition.y + (explodedFloors ? prop.floorNumber * 4.2 : 0);
        const posZ = (bldg ? bldg.position.z : 0) + prop.relativePosition.z;
        flyToTarget(posX, posY, posZ, 45);
      }
    } else if (selectedBuildingId) {
      const bldg = buildings.find(b => b.buildingId === selectedBuildingId);
      if (bldg) {
        flyToTarget(bldg.position.x, bldg.height / 2, bldg.position.z, 65);
      }
    } else if (selectedInfrastructureId) {
      const infra = undergroundAssets.find(a => a.infrastructureId === selectedInfrastructureId);
      if (infra && infra.path[0]) {
        flyToTarget(infra.path[0][0], -infra.depth, infra.path[0][2], 40);
      }
    }
  }, [selectedPropertyId, selectedBuildingId, selectedInfrastructureId, explodedFloors, buildings, properties, undergroundAssets]);

  // Camera presets
  const setPreset = (preset: 'perspective' | 'top' | 'isometric') => {
    setCameraPreset(preset);
    if (preset === 'top') {
      cameraAngleRef.current.phi = 0.05;
      cameraAngleRef.current.radius = 110;
      cameraTargetRef.current.set(0, 0, 0);
    } else if (preset === 'isometric') {
      cameraAngleRef.current.theta = Math.PI / 4;
      cameraAngleRef.current.phi = Math.atan(Math.SQRT1_2);
      cameraAngleRef.current.radius = 95;
      cameraTargetRef.current.set(0, 5, 0);
    } else {
      cameraAngleRef.current.theta = Math.PI / 4;
      cameraAngleRef.current.phi = Math.PI / 3;
      cameraAngleRef.current.radius = 95;
      cameraTargetRef.current.set(0, 5, 0);
    }
    updateCameraPosition();
  };

  const resetView = () => {
    setPreset('perspective');
  };

  return (
    <div 
      className="relative w-full overflow-hidden select-none bg-[#060913]" 
      style={{ height }}
      id="cadastral-3d-viewport-container"
    >
      {/* 3D WebGL Canvas Host */}
      <div 
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onWheel={handleWheel}
      />

      {/* Floating HUD Badges and Coordinates */}
      <div className="absolute top-4 left-4 pointer-events-none flex flex-col gap-2 z-10">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 backdrop-blur-md text-[11px] font-mono text-cyan-400 shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>3D CADASTRAL ENGINE // WGS84 EPSG:4326</span>
        </div>
        {hoveredEntity && (
          <div className="px-3 py-1 rounded bg-slate-900/90 border border-cyan-500/30 text-[11px] font-mono text-slate-300 shadow-md">
            {hoveredEntity}
          </div>
        )}
      </div>

      {/* Top Right Controls */}
      {showControls && (
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
          {/* Underground Mode Badge */}
          {undergroundMode && (
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-500/15 border border-amber-500/40 text-amber-300 text-[11px] font-mono shadow-md backdrop-blur-md">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>SUBSURFACE ACTIVE</span>
            </div>
          )}

          {/* Exploded Floors Badge */}
          {explodedFloors && (
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 text-[11px] font-mono shadow-md backdrop-blur-md">
              <Box className="w-3.5 h-3.5 text-cyan-400" />
              <span>EXPLODED PRISM</span>
            </div>
          )}

          {/* View Preset Toggles */}
          <div className="flex items-center p-1 rounded-lg bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-lg">
            <button
              onClick={() => setPreset('perspective')}
              className={`px-2.5 py-1 text-xs font-mono font-medium rounded transition-colors ${
                cameraPreset === 'perspective' 
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Perspective Orbit"
              id="camera-preset-perspective-btn"
            >
              3D
            </button>
            <button
              onClick={() => setPreset('top')}
              className={`px-2.5 py-1 text-xs font-mono font-medium rounded transition-colors ${
                cameraPreset === 'top' 
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Orthographic Top Plan"
              id="camera-preset-top-btn"
            >
              2D Top
            </button>
            <button
              onClick={() => setPreset('isometric')}
              className={`px-2.5 py-1 text-xs font-mono font-medium rounded transition-colors ${
                cameraPreset === 'isometric' 
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Isometric Axonometric"
              id="camera-preset-iso-btn"
            >
              Axon
            </button>
          </div>

          <button
            onClick={resetView}
            className="p-2 rounded-lg bg-slate-900/80 text-slate-300 hover:text-cyan-400 border border-slate-800 backdrop-blur-md transition-colors shadow-lg"
            title="Reset Camera"
            id="camera-reset-btn"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Bottom Navigation Compass & Coordinate readout */}
      <div className="absolute bottom-4 left-4 flex items-center gap-3 z-10 pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-slate-400 backdrop-blur-md shadow-lg">
          <Compass className="w-3.5 h-3.5 text-cyan-400" />
          <span>LAT 22°34'21.4"N // LON 88°25'52.3"E // ELEV +4.8m</span>
        </div>
      </div>

      {/* Synthetic Demo Data Notice pill */}
      <div className="absolute bottom-4 right-4 z-10 pointer-events-auto">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 text-[11px] font-mono backdrop-blur-md shadow-lg">
          <Info className="w-3.5 h-3.5 text-cyan-400" />
          <span>3D ULPIN MVP // SPEC V2.4</span>
        </div>
      </div>
    </div>
  );
};
