export type PropertyType = 'Residential' | 'Commercial' | 'Utility' | 'Mixed Use' | 'Civic';
export type VerificationStatus = 'Verified' | 'Pending' | 'Flagged' | 'Under Review';
export type ValidationSeverity = 'Valid' | 'Warning' | 'Error';

export interface SpatialExtent {
  min: number;
  max: number;
  delta: number;
}

export interface Parcel {
  parcelId: string;
  name: string;
  administrativeArea: string;
  area: number; // m²
  status: VerificationStatus;
  createdAt: string;
  coordinates: [number, number]; // lat, lng or local x, z
  dimensions: { width: number; depth: number };
  buildingIds: string[];
  zElevation: number;
  pinCode: string;
  ward: string;
}

export interface FloorData {
  floorId: string;
  floorCode: string; // e.g. "F00", "F01", "F02", "F03"
  floorNumber: number; // 0, 1, 2, 3
  name: string; // "Ground Floor", "First Floor", ...
  heightRange: string; // e.g. "11.5–15.0 m"
  baseHeight: number;
  topHeight: number;
  propertyCount: number;
  area: number; // m²
  buildingId: string;
  unitIds: string[];
}

export interface Building {
  buildingId: string;
  parcelId: string;
  name: string;
  height: number; // meters
  floorCount: number;
  builtUpArea: number; // m²
  propertyCount: number;
  status: VerificationStatus;
  position: { x: number; y: number; z: number };
  dimensions: { width: number; depth: number; height: number };
  floors: FloorData[];
  occupancyType: string;
  completionYear: number;
}

export interface PropertyVolume {
  propertyId: string;
  unitNumber: string; // e.g. "301"
  ulpin: string; // e.g. "IN-WB-KOL-00125-B01-F03-U301"
  parcelId: string;
  buildingId: string;
  floor: string; // "03"
  floorNumber: number;
  floorName: string;
  propertyType: PropertyType;
  area: number; // m²
  verticalRange: string; // "11.5–15.0 m"
  volume: number; // m³
  status: VerificationStatus;
  ownerName: string;
  assessmentNumber: string;
  xExtent: SpatialExtent;
  yExtent: SpatialExtent;
  zExtent: SpatialExtent;
  relativePosition: { x: number; y: number; z: number }; // relative to building
  dimensions: { width: number; depth: number; height: number };
  color: string;
  validationIssue?: ValidationIssue;
}

export type InfrastructureType = 
  | 'Water Pipeline' 
  | 'Sewer' 
  | 'Electrical Conduit' 
  | 'Underground Parking' 
  | 'Utility Corridor';

export interface UndergroundAsset {
  infrastructureId: string;
  type: InfrastructureType;
  depth: number; // m
  length: number; // m
  diameter?: string;
  capacity?: string;
  status: VerificationStatus;
  path: [number, number, number][]; // coordinates [x, y, z]
  color: string;
  material: string;
  installationYear: number;
}

export interface ValidationIssue {
  id: string;
  propertyId: string;
  ulpin: string;
  issueType: 'none' | 'overlap' | 'gap' | 'boundary' | 'duplicate';
  title: string;
  description: string;
  status: ValidationSeverity;
  affectedUnits?: string[];
  spatialDelta?: string;
}

export interface ValidationResult {
  valid: boolean;
  issues: ValidationIssue[];
  totalChecked: number;
  passed: number;
}

export interface CadastralStats {
  totalParcels: number;
  threeDProperties: number;
  buildings: number;
  undergroundAssets: number;
  validationRate: number;
  totalVolumeM3: number;
}

export interface DatasetItem {
  id: string;
  name: string;
  category: 'GIS DATA' | 'POINT CLOUD' | 'ELEVATION' | 'BUILDING DATA';
  format: string;
  size: string;
  status: 'Complete' | 'Processing' | 'Ready';
  uploadedAt: string;
  recordsExtracted: number;
}

export interface LayerVisibilityState {
  // Land
  parcels: boolean;
  buildings: boolean;
  roads: boolean;
  // Property
  floors: boolean;
  propertyUnits: boolean;
  threeDVolumes: boolean;
  // Infrastructure
  water: boolean;
  sewer: boolean;
  electricity: boolean;
  undergroundParking: boolean;
  // Environment
  terrain: boolean;
  dem: boolean;
  dsm: boolean;
}
