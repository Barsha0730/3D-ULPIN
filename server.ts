import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { 
  DEMO_PARCELS, 
  DEMO_BUILDINGS, 
  DEMO_PROPERTIES, 
  DEMO_UNDERGROUND_ASSETS, 
  DEMO_VALIDATION_ISSUES, 
  DEMO_DATASETS,
  INITIAL_STATS
} from './src/data/demoData.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory data store for the live server session
  const parcels = [...DEMO_PARCELS];
  const buildings = [...DEMO_BUILDINGS];
  const properties = [...DEMO_PROPERTIES];
  const underground = [...DEMO_UNDERGROUND_ASSETS];
  const validationIssues = [...DEMO_VALIDATION_ISSUES];
  const datasets = [...DEMO_DATASETS];
  let stats = { ...INITIAL_STATS };

  // API Endpoints as specified by 3D ULPIN architecture
  app.get('/api/parcels', (req, res) => {
    res.json(parcels);
  });

  app.get('/api/buildings', (req, res) => {
    res.json(buildings);
  });

  app.get('/api/properties', (req, res) => {
    res.json(properties);
  });

  app.get('/api/ulpins', (req, res) => {
    const ulpins = properties.map(p => ({
      ulpin: p.ulpin,
      parcelId: p.parcelId,
      buildingId: p.buildingId,
      floor: p.floor,
      unitNumber: p.unitNumber,
      propertyType: p.propertyType,
      area: p.area,
      volume: p.volume,
      status: p.status,
      ownerName: p.ownerName,
      assessmentNumber: p.assessmentNumber
    }));
    res.json(ulpins);
  });

  app.get('/api/infrastructure', (req, res) => {
    res.json(underground);
  });

  app.get('/api/stats', (req, res) => {
    res.json(stats);
  });

  app.post('/api/ulpin/generate', (req, res) => {
    const { parcelId, buildingId, floor, unit, propertyType } = req.body || {};
    if (!parcelId || !buildingId || !floor || !unit) {
      return res.status(400).json({ error: 'Missing required cadastral parameters' });
    }

    const cleanFloor = String(floor).padStart(2, '0');
    const cleanUnit = String(unit).toUpperCase().startsWith('U') ? String(unit).toUpperCase() : `U${unit}`;
    const generatedUlpin = `IN-${parcelId}-${buildingId}-F${cleanFloor}-${cleanUnit}`;

    let prop = properties.find(p => p.ulpin === generatedUlpin);
    if (!prop) {
      const floorNum = parseInt(String(floor), 10) || 0;
      const baseZ = floorNum * 3.8;
      const height = 3.5;
      prop = {
        propertyId: cleanUnit,
        unitNumber: String(unit),
        ulpin: generatedUlpin,
        parcelId,
        buildingId,
        floor: cleanFloor,
        floorNumber: floorNum,
        floorName: floorNum === 0 ? 'Ground Floor' : `Floor ${floorNum}`,
        propertyType: propertyType || 'Residential',
        area: 86.5,
        verticalRange: `${baseZ.toFixed(1)}–${(baseZ + height).toFixed(1)} m`,
        volume: +(86.5 * height).toFixed(1),
        status: 'Verified',
        ownerName: 'Registered Cadastral Titleholder',
        assessmentNumber: `ASS-KOL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        xExtent: { min: -5, max: 7, delta: 12 },
        yExtent: { min: -6, max: 6, delta: 12 },
        zExtent: { min: baseZ, max: baseZ + height, delta: height },
        relativePosition: { x: 0, y: baseZ + height / 2, z: 0 },
        dimensions: { width: 12, depth: 12, height },
        color: '#06b6d4'
      };
      properties.push(prop);
      stats.threeDProperties += 1;
    }

    res.json({
      success: true,
      ulpin: generatedUlpin,
      formatNotice: 'Proposed MVP 3D ULPIN Format',
      property: prop
    });
  });

  app.post('/api/validation/run', (req, res) => {
    const total = properties.length + 112;
    const warnings = validationIssues.filter(i => i.status === 'Warning').length;
    const errors = validationIssues.filter(i => i.status === 'Error').length;
    const valid = total - warnings - errors;

    res.json({
      totalChecked: total,
      validCount: valid,
      warningCount: warnings,
      errorCount: errors,
      validationRate: +((valid / total) * 100).toFixed(1),
      issues: validationIssues,
      completedAt: new Date().toISOString()
    });
  });

  app.post('/api/datasets/process', (req, res) => {
    const { name, category, format, size } = req.body || {};
    const newDataset = {
      id: `DS-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      name: name || 'Uploaded_Dataset.geojson',
      category: category || 'GIS DATA',
      format: format || 'GeoJSON',
      size: size || '14.2 MB',
      status: 'Complete' as const,
      uploadedAt: new Date().toLocaleString(),
      recordsExtracted: Math.floor(650 + Math.random() * 1800)
    };
    datasets.unshift(newDataset);
    res.json({ success: true, dataset: newDataset });
  });

  // Health endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: '3D ULPIN API Gateway' });
  });

  // Vite middleware in dev or static serving in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`3D ULPIN GIS Server listening on http://localhost:${PORT}`);
  });
}

startServer();
