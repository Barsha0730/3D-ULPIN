import React, { useState } from 'react';
import { 
  Building, 
  Parcel, 
  PropertyVolume, 
  UndergroundAsset, 
  LayerVisibilityState 
} from '../../types';
import { Cadastral3DViewer } from '../map/Cadastral3DViewer';
import { LayerControl } from '../map/LayerControl';
import { PropertyPanel } from '../map/PropertyPanel';
import { 
  SlidersHorizontal, 
  Info, 
  Box, 
  RotateCcw, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Zap, 
  Sparkles,
  ArrowDownCircle,
  Maximize2
} from 'lucide-react';

interface MainMapPageProps {
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
  onSelectParcel: (parcelId: string | null) => void;
  onSelectBuilding: (buildingId: string | null) => void;
  onSelectFloor: (floorNumber: number | null) => void;
  onSelectProperty: (propertyId: string | null) => void;
  onSelectInfrastructure: (assetId: string | null) => void;
  onToggleExplodedFloors: () => void;
  onToggleUndergroundMode: () => void;
  onOpenImport: () => void;
  onOpenGenerator: () => void;
  onRunValidation: () => void;
  onValidateProperty: (property: PropertyVolume) => void;
}

export const MainMapPage: React.FC<MainMapPageProps> = ({
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
  onSelectParcel,
  onSelectBuilding,
  onSelectFloor,
  onSelectProperty,
  onSelectInfrastructure,
  onToggleExplodedFloors,
  onToggleUndergroundMode,
  onOpenImport,
  onOpenGenerator,
  onRunValidation,
  onValidateProperty
}) => {
  const [showLeftSidebar, setShowLeftSidebar] = useState(true);
  const [showRightPanel, setShowRightPanel] = useState(true);

  const [layerVisibility, setLayerVisibility] = useState<LayerVisibilityState>({
    parcels: true,
    buildings: true,
    roads: true,
    floors: true,
    propertyUnits: true,
    threeDVolumes: true,
    water: true,
    sewer: true,
    electricity: true,
    undergroundParking: true,
    terrain: true,
    dem: true,
    dsm: true
  });

  const handleToggleLayer = (layer: keyof LayerVisibilityState) => {
    setLayerVisibility(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  // Derive active selected objects
  const currentParcel = parcels.find(p => p.parcelId === selectedParcelId) || null;
  const currentBuilding = buildings.find(b => b.buildingId === selectedBuildingId) || null;
  const currentFloor = currentBuilding && selectedFloorNumber !== null
    ? currentBuilding.floors.find(f => f.floorNumber === selectedFloorNumber) || null
    : null;
  const currentProperty = properties.find(p => p.propertyId === selectedPropertyId) || null;
  const currentInfra = undergroundAssets.find(u => u.infrastructureId === selectedInfrastructureId) || null;

  const handleClearSelection = () => {
    onSelectParcel(null);
    onSelectBuilding(null);
    onSelectFloor(null);
    onSelectProperty(null);
    onSelectInfrastructure(null);
  };

  return (
    <div className="relative w-full h-[calc(100vh-64px)] overflow-hidden bg-[#020617]" id="main-3d-gis-workspace">
      
      {/* 1. Main Center 3D GIS Viewport */}
      <div className="absolute inset-0 z-0">
        <Cadastral3DViewer
          parcels={parcels}
          buildings={buildings}
          properties={properties}
          undergroundAssets={undergroundAssets}
          selectedParcelId={selectedParcelId}
          selectedBuildingId={selectedBuildingId}
          selectedFloorNumber={selectedFloorNumber}
          selectedPropertyId={selectedPropertyId}
          selectedInfrastructureId={selectedInfrastructureId}
          explodedFloors={explodedFloors}
          undergroundMode={undergroundMode}
          layerVisibility={layerVisibility}
          onSelectParcel={onSelectParcel}
          onSelectBuilding={onSelectBuilding}
          onSelectFloor={onSelectFloor}
          onSelectProperty={onSelectProperty}
          onSelectInfrastructure={onSelectInfrastructure}
          height="100%"
          showControls={true}
        />
      </div>

      {/* 2. Top Banner Pill (Active Mode Indicators) */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none hidden md:flex items-center gap-3">
        <div className="px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-cyan-400 shadow-xl backdrop-blur-md flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>3D ULPIN CADASTRE // WGS84 COORDINATE RESOLUTION</span>
        </div>
      </div>

      {/* 3. Floating Left Sidebar Toggle */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <button
          onClick={() => setShowLeftSidebar(!showLeftSidebar)}
          className="px-2.5 py-1.5 rounded-lg bg-slate-900/80 text-slate-300 hover:text-cyan-400 border border-slate-800 shadow-lg backdrop-blur-md transition-colors flex items-center gap-1.5 text-[11px] font-mono"
          id="toggle-left-layers-btn"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">{showLeftSidebar ? 'Hide Layers' : 'GIS Layers'}</span>
        </button>
      </div>

      {/* 4. Floating Right Panel Toggle */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <button
          onClick={() => setShowRightPanel(!showRightPanel)}
          className="px-2.5 py-1.5 rounded-lg bg-slate-900/80 text-slate-300 hover:text-cyan-400 border border-slate-800 shadow-lg backdrop-blur-md transition-colors flex items-center gap-1.5 text-[11px] font-mono"
          id="toggle-right-inspector-btn"
        >
          <Info className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">{showRightPanel ? 'Hide Inspector' : 'Cadastral Inspector'}</span>
        </button>
      </div>

      {/* 5. Left GIS Layer Controls Sidebar Drawer */}
      {showLeftSidebar && (
        <div className="absolute top-16 left-4 z-20 animate-in fade-in slide-in-from-left duration-200">
          <LayerControl
            layerVisibility={layerVisibility}
            onToggleLayer={handleToggleLayer}
            undergroundMode={undergroundMode}
            onToggleUndergroundMode={onToggleUndergroundMode}
            explodedFloors={explodedFloors}
            onToggleExplodedFloors={onToggleExplodedFloors}
            onOpenImport={onOpenImport}
            onOpenGenerator={onOpenGenerator}
            onRunValidation={onRunValidation}
          />
        </div>
      )}

      {/* 6. Right Cadastral Property Inspector Panel */}
      {showRightPanel && (
        <div className="absolute top-16 right-4 z-20 animate-in fade-in slide-in-from-right duration-200">
          <PropertyPanel
            selectedParcel={currentParcel}
            selectedBuilding={currentBuilding}
            selectedFloor={currentFloor}
            selectedProperty={currentProperty}
            selectedInfrastructure={currentInfra}
            explodedFloors={explodedFloors}
            onToggleExplodeFloors={onToggleExplodedFloors}
            onSelectFloor={(fn) => {
              onSelectFloor(fn);
            }}
            onSelectProperty={(pId) => {
              onSelectProperty(pId);
            }}
            onValidateProperty={onValidateProperty}
            onOpenRecord={(prop) => {
              alert(`Opening official Cadastral Record for ULPIN: ${prop.ulpin}\nAssessment ID: ${prop.assessmentNumber}\nOwner: ${prop.ownerName}`);
            }}
            onClose={handleClearSelection}
          />
        </div>
      )}

    </div>
  );
};
