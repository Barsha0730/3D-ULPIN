import { 
  Parcel, 
  Building, 
  PropertyVolume, 
  UndergroundAsset, 
  ValidationIssue,
  CadastralStats,
  DatasetItem
} from '../../types';
import { 
  DEMO_PARCELS, 
  DEMO_BUILDINGS, 
  DEMO_PROPERTIES, 
  DEMO_UNDERGROUND_ASSETS, 
  DEMO_VALIDATION_ISSUES,
  DEMO_DATASETS,
  INITIAL_STATS 
} from '../../data/demoData';

export interface GenerateUlpinParams {
  parcelId: string;
  buildingId: string;
  floor: string;
  unit: string;
  propertyType: string;
}

export interface ValidationRunResult {
  totalChecked: number;
  validCount: number;
  warningCount: number;
  errorCount: number;
  issues: ValidationIssue[];
  completedAt: string;
  validationRate: number;
}

// In-memory runtime state for dynamic generation and validation
class CadastralStore {
  private parcels: Parcel[] = [...DEMO_PARCELS];
  private buildings: Building[] = [...DEMO_BUILDINGS];
  private properties: PropertyVolume[] = [...DEMO_PROPERTIES];
  private undergroundAssets: UndergroundAsset[] = [...DEMO_UNDERGROUND_ASSETS];
  private validationIssues: ValidationIssue[] = [...DEMO_VALIDATION_ISSUES];
  private datasets: DatasetItem[] = [...DEMO_DATASETS];
  private stats: CadastralStats = { ...INITIAL_STATS };

  getParcels(): Parcel[] {
    return this.parcels;
  }

  getBuildings(): Building[] {
    return this.buildings;
  }

  getProperties(): PropertyVolume[] {
    return this.properties;
  }

  getUndergroundAssets(): UndergroundAsset[] {
    return this.undergroundAssets;
  }

  getValidationIssues(): ValidationIssue[] {
    return this.validationIssues;
  }

  getDatasets(): DatasetItem[] {
    return this.datasets;
  }

  getStats(): CadastralStats {
    return this.stats;
  }

  generate3DUlpin(params: GenerateUlpinParams): { ulpin: string; property: PropertyVolume } {
    const { parcelId, buildingId, floor, unit, propertyType } = params;
    const cleanFloor = floor.padStart(2, '0');
    const cleanUnit = unit.toUpperCase().startsWith('U') ? unit.toUpperCase() : `U${unit}`;
    
    // Format: IN-[State]-[Dist]-[ParcelID]-[BuildingID]-F[Floor]-[Unit]
    const ulpin = `IN-${parcelId}-${buildingId}-F${cleanFloor}-${cleanUnit}`;

    // Check if property already exists
    const existing = this.properties.find(p => p.ulpin === ulpin);
    if (existing) {
      return { ulpin, property: existing };
    }

    // Create newly delineated 3D property volume
    const floorNum = parseInt(floor, 10) || 0;
    const baseZ = floorNum * 3.8;
    const height = 3.5;
    const newProperty: PropertyVolume = {
      propertyId: cleanUnit,
      unitNumber: unit,
      ulpin,
      parcelId,
      buildingId,
      floor: cleanFloor,
      floorNumber: floorNum,
      floorName: floorNum === 0 ? 'Ground Floor' : `Floor ${floorNum}`,
      propertyType: (propertyType as any) || 'Residential',
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

    this.properties.push(newProperty);
    this.stats.threeDProperties += 1;

    return { ulpin, property: newProperty };
  }

  runValidation(): ValidationRunResult {
    const total = 124;
    const warnings = 3;
    const errors = 2;
    const valid = total - warnings - errors;

    return {
      totalChecked: total,
      validCount: valid,
      warningCount: warnings,
      errorCount: errors,
      issues: this.validationIssues,
      completedAt: new Date().toISOString(),
      validationRate: +((valid / total) * 100).toFixed(1)
    };
  }

  processDataset(dataset: { name: string; category: any; format: string; size: string }): DatasetItem {
    const newItem: DatasetItem = {
      id: `DS-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      name: dataset.name,
      category: dataset.category,
      format: dataset.format,
      size: dataset.size,
      status: 'Complete',
      uploadedAt: new Date().toLocaleString(),
      recordsExtracted: Math.floor(400 + Math.random() * 2500)
    };
    this.datasets.unshift(newItem);
    return newItem;
  }
}

export const cadastralStore = new CadastralStore();

// Client API functions with fetch to /api/* with fallback to local store
export const api = {
  async getParcels(): Promise<Parcel[]> {
    try {
      const res = await fetch('/api/parcels');
      if (res.ok) return await res.json();
    } catch {
      // Fallback to in-memory store
    }
    return cadastralStore.getParcels();
  },

  async getBuildings(): Promise<Building[]> {
    try {
      const res = await fetch('/api/buildings');
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return cadastralStore.getBuildings();
  },

  async getProperties(): Promise<PropertyVolume[]> {
    try {
      const res = await fetch('/api/properties');
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return cadastralStore.getProperties();
  },

  async getInfrastructure(): Promise<UndergroundAsset[]> {
    try {
      const res = await fetch('/api/infrastructure');
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return cadastralStore.getUndergroundAssets();
  },

  async getUndergroundAssets(): Promise<UndergroundAsset[]> {
    return this.getInfrastructure();
  },

  async getStats(): Promise<CadastralStats> {
    try {
      const res = await fetch('/api/stats');
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return cadastralStore.getStats();
  },

  async generateUlpin(params: GenerateUlpinParams): Promise<{ ulpin: string; property: PropertyVolume }> {
    try {
      const res = await fetch('/api/ulpin/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return cadastralStore.generate3DUlpin(params);
  },

  async runValidation(): Promise<ValidationRunResult> {
    try {
      const res = await fetch('/api/validation/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return cadastralStore.runValidation();
  },

  async processDataset(dataset: { name: string; category: any; format: string; size: string }): Promise<DatasetItem> {
    try {
      const res = await fetch('/api/datasets/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataset)
      });
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return cadastralStore.processDataset(dataset);
  }
};
