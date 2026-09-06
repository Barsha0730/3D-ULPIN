import { 
  Parcel, 
  Building, 
  PropertyVolume, 
  UndergroundAsset, 
  ValidationIssue, 
  CadastralStats,
  DatasetItem
} from '../types';

export const DEMO_NOTICE = {
  label: 'DEMO DATA',
  disclaimer: 'This demonstration dataset contains synthetic spatial attributes for testing the 3D ULPIN cadastral workflow. The identifier scheme is a Proposed MVP 3D ULPIN Format and does not represent an officially adopted government standard.',
};

export const INITIAL_STATS: CadastralStats = {
  totalParcels: 1248,
  threeDProperties: 5842,
  buildings: 1106,
  undergroundAssets: 2314,
  validationRate: 98.4,
  totalVolumeM3: 1489200
};

export const DEMO_PARCELS: Parcel[] = [
  {
    parcelId: 'WB-KOL-00125',
    name: 'Sector V Cyber Corridor Parcel 125',
    administrativeArea: 'Bidhannagar / Kolkata, West Bengal',
    area: 3420.5,
    status: 'Verified',
    createdAt: '2024-03-15T09:30:00Z',
    coordinates: [22.5726, 88.4312],
    dimensions: { width: 65, depth: 55 },
    buildingIds: ['B01'],
    zElevation: 4.8,
    pinCode: '700091',
    ward: 'Ward 29, Bidhannagar MC'
  },
  {
    parcelId: 'WB-KOL-00126',
    name: 'Bengal Silicon Square Parcel 126',
    administrativeArea: 'Bidhannagar / Kolkata, West Bengal',
    area: 2890.0,
    status: 'Verified',
    createdAt: '2024-04-10T11:15:00Z',
    coordinates: [22.5735, 88.4328],
    dimensions: { width: 55, depth: 50 },
    buildingIds: ['B02'],
    zElevation: 4.9,
    pinCode: '700091',
    ward: 'Ward 29, Bidhannagar MC'
  },
  {
    parcelId: 'WB-KOL-00127',
    name: 'EcoHabitat Tech Park Parcel 127',
    administrativeArea: 'New Town Action Area II / Kolkata, West Bengal',
    area: 4120.8,
    status: 'Verified',
    createdAt: '2024-05-02T14:40:00Z',
    coordinates: [22.5745, 88.4295],
    dimensions: { width: 70, depth: 60 },
    buildingIds: ['B03'],
    zElevation: 5.1,
    pinCode: '700156',
    ward: 'Ward 14, NKDA'
  },
  {
    parcelId: 'WB-KOL-00128',
    name: 'Metropolitan Transit Interchange Parcel 128',
    administrativeArea: 'Salt Lake Bypass / Kolkata, West Bengal',
    area: 5200.0,
    status: 'Verified',
    createdAt: '2024-06-18T08:20:00Z',
    coordinates: [22.5710, 88.4340],
    dimensions: { width: 80, depth: 65 },
    buildingIds: [],
    zElevation: 4.6,
    pinCode: '700091',
    ward: 'Ward 28, Bidhannagar MC'
  },
  {
    parcelId: 'WB-KOL-00129',
    name: 'Urban Green Reserve & Subsurface Utilities 129',
    administrativeArea: 'Ring Road Green Belt / Kolkata, West Bengal',
    area: 3100.2,
    status: 'Verified',
    createdAt: '2024-07-01T16:00:00Z',
    coordinates: [22.5752, 88.4345],
    dimensions: { width: 60, depth: 52 },
    buildingIds: [],
    zElevation: 5.0,
    pinCode: '700091',
    ward: 'Ward 29, Bidhannagar MC'
  }
];

export const DEMO_BUILDINGS: Building[] = [
  {
    buildingId: 'B01',
    parcelId: 'WB-KOL-00125',
    name: 'Cyber Vista Complex Tower A',
    height: 15.2,
    floorCount: 4,
    builtUpArea: 1850,
    propertyCount: 12,
    status: 'Verified',
    position: { x: 0, y: 0, z: 0 },
    dimensions: { width: 34, depth: 26, height: 15.2 },
    occupancyType: 'Commercial Ground + Residential High-Rise',
    completionYear: 2022,
    floors: [
      {
        floorId: 'B01-F00',
        floorCode: 'F00',
        floorNumber: 0,
        name: 'Ground Floor',
        heightRange: '0.0–3.5 m',
        baseHeight: 0,
        topHeight: 3.5,
        propertyCount: 3,
        area: 640,
        buildingId: 'B01',
        unitIds: ['U001', 'U002', 'U003']
      },
      {
        floorId: 'B01-F01',
        floorCode: 'F01',
        floorNumber: 1,
        name: 'First Floor',
        heightRange: '3.5–7.5 m',
        baseHeight: 3.5,
        topHeight: 7.5,
        propertyCount: 3,
        area: 620,
        buildingId: 'B01',
        unitIds: ['U101', 'U102', 'U103']
      },
      {
        floorId: 'B01-F02',
        floorCode: 'F02',
        floorNumber: 2,
        name: 'Second Floor',
        heightRange: '7.5–11.5 m',
        baseHeight: 7.5,
        topHeight: 11.5,
        propertyCount: 3,
        area: 620,
        buildingId: 'B01',
        unitIds: ['U201', 'U202', 'U203']
      },
      {
        floorId: 'B01-F03',
        floorCode: 'F03',
        floorNumber: 3,
        name: 'Third Floor',
        heightRange: '11.5–15.0 m',
        baseHeight: 11.5,
        topHeight: 15.0,
        propertyCount: 3,
        area: 620,
        buildingId: 'B01',
        unitIds: ['U301', 'U302', 'U303']
      }
    ]
  },
  {
    buildingId: 'B02',
    parcelId: 'WB-KOL-00126',
    name: 'Bengal Silicon Heights Tower B',
    height: 16.0,
    floorCount: 4,
    builtUpArea: 1680,
    propertyCount: 12,
    status: 'Verified',
    position: { x: 52, y: 0, z: -15 },
    dimensions: { width: 30, depth: 24, height: 16.0 },
    occupancyType: 'IT/ITES Multi-Tenant Facility',
    completionYear: 2023,
    floors: [
      {
        floorId: 'B02-F00',
        floorCode: 'F00',
        floorNumber: 0,
        name: 'Ground Floor',
        heightRange: '0.0–4.0 m',
        baseHeight: 0,
        topHeight: 4.0,
        propertyCount: 3,
        area: 580,
        buildingId: 'B02',
        unitIds: ['B02-U001', 'B02-U002', 'B02-U003']
      },
      {
        floorId: 'B02-F01',
        floorCode: 'F01',
        floorNumber: 1,
        name: 'First Floor',
        heightRange: '4.0–8.0 m',
        baseHeight: 4.0,
        topHeight: 8.0,
        propertyCount: 3,
        area: 550,
        buildingId: 'B02',
        unitIds: ['B02-U101', 'B02-U102', 'B02-U103']
      },
      {
        floorId: 'B02-F02',
        floorCode: 'F02',
        floorNumber: 2,
        name: 'Second Floor',
        heightRange: '8.0–12.0 m',
        baseHeight: 8.0,
        topHeight: 12.0,
        propertyCount: 3,
        area: 550,
        buildingId: 'B02',
        unitIds: ['B02-U201', 'B02-U202', 'B02-U203']
      },
      {
        floorId: 'B02-F03',
        floorCode: 'F03',
        floorNumber: 3,
        name: 'Third Floor',
        heightRange: '12.0–16.0 m',
        baseHeight: 12.0,
        topHeight: 16.0,
        propertyCount: 3,
        area: 550,
        buildingId: 'B02',
        unitIds: ['B02-U301', 'B02-U302', 'B02-U303']
      }
    ]
  },
  {
    buildingId: 'B03',
    parcelId: 'WB-KOL-00127',
    name: 'EcoHabitat Living Pavilion',
    height: 15.5,
    floorCount: 4,
    builtUpArea: 2100,
    propertyCount: 12,
    status: 'Verified',
    position: { x: -50, y: 0, z: -25 },
    dimensions: { width: 36, depth: 28, height: 15.5 },
    occupancyType: 'Green Mixed Residential Condominiums',
    completionYear: 2024,
    floors: [
      {
        floorId: 'B03-F00',
        floorCode: 'F00',
        floorNumber: 0,
        name: 'Ground Floor',
        heightRange: '0.0–3.8 m',
        baseHeight: 0,
        topHeight: 3.8,
        propertyCount: 3,
        area: 720,
        buildingId: 'B03',
        unitIds: ['B03-U001', 'B03-U002', 'B03-U003']
      },
      {
        floorId: 'B03-F01',
        floorCode: 'F01',
        floorNumber: 1,
        name: 'First Floor',
        heightRange: '3.8–7.7 m',
        baseHeight: 3.8,
        topHeight: 7.7,
        propertyCount: 3,
        area: 690,
        buildingId: 'B03',
        unitIds: ['B03-U101', 'B03-U102', 'B03-U103']
      },
      {
        floorId: 'B03-F02',
        floorCode: 'F02',
        floorNumber: 2,
        name: 'Second Floor',
        heightRange: '7.7–11.6 m',
        baseHeight: 7.7,
        topHeight: 11.6,
        propertyCount: 3,
        area: 690,
        buildingId: 'B03',
        unitIds: ['B03-U201', 'B03-U202', 'B03-U203']
      },
      {
        floorId: 'B03-F03',
        floorCode: 'F03',
        floorNumber: 3,
        name: 'Third Floor',
        heightRange: '11.6–15.5 m',
        baseHeight: 11.6,
        topHeight: 15.5,
        propertyCount: 3,
        area: 690,
        buildingId: 'B03',
        unitIds: ['B03-U301', 'B03-U302', 'B03-U303']
      }
    ]
  }
];

export const DEMO_PROPERTIES: PropertyVolume[] = [
  // Building B01 - Ground Floor (Commercial)
  {
    propertyId: 'U001',
    unitNumber: '001',
    ulpin: 'IN-WB-KOL-00125-B01-F00-U001',
    parcelId: 'WB-KOL-00125',
    buildingId: 'B01',
    floor: '00',
    floorNumber: 0,
    floorName: 'Ground Floor',
    propertyType: 'Commercial',
    area: 120.5,
    verticalRange: '0.0–3.5 m',
    volume: 421.8,
    status: 'Verified',
    ownerName: 'Apex Healthcare & Pharmacy LLP',
    assessmentNumber: 'ASS-KOL-2024-0019',
    xExtent: { min: -15, max: -4, delta: 11 },
    yExtent: { min: -11, max: 1, delta: 12 },
    zExtent: { min: 0.0, max: 3.5, delta: 3.5 },
    relativePosition: { x: -9.5, y: 1.75, z: -5 },
    dimensions: { width: 11, depth: 12, height: 3.5 },
    color: '#06b6d4'
  },
  {
    propertyId: 'U002',
    unitNumber: '002',
    ulpin: 'IN-WB-KOL-00125-B01-F00-U002',
    parcelId: 'WB-KOL-00125',
    buildingId: 'B01',
    floor: '00',
    floorNumber: 0,
    floorName: 'Ground Floor',
    propertyType: 'Commercial',
    area: 145.0,
    verticalRange: '0.0–3.5 m',
    volume: 507.5,
    status: 'Verified',
    ownerName: 'State Bank of India Digital Hub',
    assessmentNumber: 'ASS-KOL-2024-0020',
    xExtent: { min: -4, max: 8, delta: 12 },
    yExtent: { min: -11, max: 1, delta: 12 },
    zExtent: { min: 0.0, max: 3.5, delta: 3.5 },
    relativePosition: { x: 2, y: 1.75, z: -5 },
    dimensions: { width: 12, depth: 12, height: 3.5 },
    color: '#0284c7'
  },
  {
    propertyId: 'U003',
    unitNumber: '003',
    ulpin: 'IN-WB-KOL-00125-B01-F00-U003',
    parcelId: 'WB-KOL-00125',
    buildingId: 'B01',
    floor: '00',
    floorNumber: 0,
    floorName: 'Ground Floor',
    propertyType: 'Utility',
    area: 95.0,
    verticalRange: '0.0–3.5 m',
    volume: 332.5,
    status: 'Verified',
    ownerName: 'WBSEDCL Substation & Metering Chamber',
    assessmentNumber: 'ASS-KOL-2024-0021',
    xExtent: { min: 8, max: 16, delta: 8 },
    yExtent: { min: -11, max: 1, delta: 12 },
    zExtent: { min: 0.0, max: 3.5, delta: 3.5 },
    relativePosition: { x: 12, y: 1.75, z: -5 },
    dimensions: { width: 8, depth: 12, height: 3.5 },
    color: '#64748b'
  },

  // Building B01 - Floor 1
  {
    propertyId: 'U101',
    unitNumber: '101',
    ulpin: 'IN-WB-KOL-00125-B01-F01-U101',
    parcelId: 'WB-KOL-00125',
    buildingId: 'B01',
    floor: '01',
    floorNumber: 1,
    floorName: 'First Floor',
    propertyType: 'Residential',
    area: 84.5,
    verticalRange: '3.5–7.5 m',
    volume: 338.0,
    status: 'Verified',
    ownerName: 'Debabrata Mukherjee & Ananya Roy',
    assessmentNumber: 'ASS-KOL-2024-0101',
    xExtent: { min: -15, max: -4, delta: 11 },
    yExtent: { min: -11, max: 1, delta: 12 },
    zExtent: { min: 3.5, max: 7.5, delta: 4.0 },
    relativePosition: { x: -9.5, y: 5.5, z: -5 },
    dimensions: { width: 11, depth: 12, height: 4.0 },
    color: '#38bdf8'
  },
  {
    propertyId: 'U102',
    unitNumber: '102',
    ulpin: 'IN-WB-KOL-00125-B01-F01-U102',
    parcelId: 'WB-KOL-00125',
    buildingId: 'B01',
    floor: '01',
    floorNumber: 1,
    floorName: 'First Floor',
    propertyType: 'Residential',
    area: 88.0,
    verticalRange: '3.5–7.5 m',
    volume: 352.0,
    status: 'Verified',
    ownerName: 'Priya Sundaram & Ramesh Sundaram',
    assessmentNumber: 'ASS-KOL-2024-0102',
    xExtent: { min: -4, max: 8, delta: 12 },
    yExtent: { min: -11, max: 1, delta: 12 },
    zExtent: { min: 3.5, max: 7.5, delta: 4.0 },
    relativePosition: { x: 2, y: 5.5, z: -5 },
    dimensions: { width: 12, depth: 12, height: 4.0 },
    color: '#38bdf8'
  },
  {
    propertyId: 'U103',
    unitNumber: '103',
    ulpin: 'IN-WB-KOL-00125-B01-F01-U103',
    parcelId: 'WB-KOL-00125',
    buildingId: 'B01',
    floor: '01',
    floorNumber: 1,
    floorName: 'First Floor',
    propertyType: 'Residential',
    area: 76.5,
    verticalRange: '3.5–7.5 m',
    volume: 306.0,
    status: 'Verified',
    ownerName: 'Tanvi Chatterjee',
    assessmentNumber: 'ASS-KOL-2024-0103',
    xExtent: { min: 8, max: 16, delta: 8 },
    yExtent: { min: -11, max: 1, delta: 12 },
    zExtent: { min: 3.5, max: 7.5, delta: 4.0 },
    relativePosition: { x: 12, y: 5.5, z: -5 },
    dimensions: { width: 8, depth: 12, height: 4.0 },
    color: '#38bdf8'
  },

  // Building B01 - Floor 2
  {
    propertyId: 'U201',
    unitNumber: '201',
    ulpin: 'IN-WB-KOL-00125-B01-F02-U201',
    parcelId: 'WB-KOL-00125',
    buildingId: 'B01',
    floor: '02',
    floorNumber: 2,
    floorName: 'Second Floor',
    propertyType: 'Residential',
    area: 84.5,
    verticalRange: '7.5–11.5 m',
    volume: 338.0,
    status: 'Verified',
    ownerName: 'Arjun Sen & Meenakshi Sen',
    assessmentNumber: 'ASS-KOL-2024-0201',
    xExtent: { min: -15, max: -4, delta: 11 },
    yExtent: { min: -11, max: 1, delta: 12 },
    zExtent: { min: 7.5, max: 11.5, delta: 4.0 },
    relativePosition: { x: -9.5, y: 9.5, z: -5 },
    dimensions: { width: 11, depth: 12, height: 4.0 },
    color: '#38bdf8'
  },
  {
    propertyId: 'U202',
    unitNumber: '202',
    ulpin: 'IN-WB-KOL-00125-B01-F02-U202',
    parcelId: 'WB-KOL-00125',
    buildingId: 'B01',
    floor: '02',
    floorNumber: 2,
    floorName: 'Second Floor',
    propertyType: 'Residential',
    area: 88.0,
    verticalRange: '7.5–11.5 m',
    volume: 352.0,
    status: 'Verified',
    ownerName: 'Vivek Singhania',
    assessmentNumber: 'ASS-KOL-2024-0202',
    xExtent: { min: -4, max: 8, delta: 12 },
    yExtent: { min: -11, max: 1, delta: 12 },
    zExtent: { min: 7.5, max: 11.5, delta: 4.0 },
    relativePosition: { x: 2, y: 9.5, z: -5 },
    dimensions: { width: 12, depth: 12, height: 4.0 },
    color: '#38bdf8'
  },
  {
    propertyId: 'U203',
    unitNumber: '203',
    ulpin: 'IN-WB-KOL-00125-B01-F02-U203',
    parcelId: 'WB-KOL-00125',
    buildingId: 'B01',
    floor: '02',
    floorNumber: 2,
    floorName: 'Second Floor',
    propertyType: 'Residential',
    area: 76.5,
    verticalRange: '7.5–11.5 m',
    volume: 306.0,
    status: 'Verified',
    ownerName: 'Subhasish Dutta',
    assessmentNumber: 'ASS-KOL-2024-0203',
    xExtent: { min: 8, max: 16, delta: 8 },
    yExtent: { min: -11, max: 1, delta: 12 },
    zExtent: { min: 7.5, max: 11.5, delta: 4.0 },
    relativePosition: { x: 12, y: 9.5, z: -5 },
    dimensions: { width: 8, depth: 12, height: 4.0 },
    color: '#38bdf8'
  },

  // Building B01 - Floor 3 (Centerpiece highlighted property 301!)
  {
    propertyId: 'U301',
    unitNumber: '301',
    ulpin: 'IN-WB-KOL-00125-B01-F03-U301',
    parcelId: 'WB-KOL-00125',
    buildingId: 'B01',
    floor: '03',
    floorNumber: 3,
    floorName: 'Third Floor',
    propertyType: 'Residential',
    area: 82.4,
    verticalRange: '11.5–15.0 m',
    volume: 263.7,
    status: 'Verified',
    ownerName: 'Ritwik Banerjee & Shreya Ganguly',
    assessmentNumber: 'ASS-KOL-2024-0301',
    xExtent: { min: -15, max: -4, delta: 11 },
    yExtent: { min: -11, max: 1, delta: 12 },
    zExtent: { min: 11.5, max: 15.0, delta: 3.5 },
    relativePosition: { x: -9.5, y: 13.25, z: -5 },
    dimensions: { width: 11, depth: 12, height: 3.5 },
    color: '#06b6d4',
    validationIssue: {
      id: 'VAL-0301',
      propertyId: 'U301',
      ulpin: 'IN-WB-KOL-00125-B01-F03-U301',
      issueType: 'overlap',
      title: 'Volume overlap warning',
      description: 'Minor 0.04m³ bounding envelope intersection with adjacent party wall buffer.',
      status: 'Warning',
      affectedUnits: ['U301', 'U302'],
      spatialDelta: '0.04 m³'
    }
  },
  {
    propertyId: 'U302',
    unitNumber: '302',
    ulpin: 'IN-WB-KOL-00125-B01-F03-U302',
    parcelId: 'WB-KOL-00125',
    buildingId: 'B01',
    floor: '03',
    floorNumber: 3,
    floorName: 'Third Floor',
    propertyType: 'Residential',
    area: 89.2,
    verticalRange: '11.5–15.0 m',
    volume: 312.2,
    status: 'Flagged',
    ownerName: 'Kallol Chakraborty',
    assessmentNumber: 'ASS-KOL-2024-0302',
    xExtent: { min: -4, max: 8, delta: 12 },
    yExtent: { min: -11, max: 1, delta: 12 },
    zExtent: { min: 11.5, max: 15.0, delta: 3.5 },
    relativePosition: { x: 2, y: 13.25, z: -5 },
    dimensions: { width: 12, depth: 12, height: 3.5 },
    color: '#f59e0b',
    validationIssue: {
      id: 'VAL-0302',
      propertyId: 'U302',
      ulpin: 'IN-WB-KOL-00125-B01-F03-U302',
      issueType: 'boundary',
      title: 'Boundary exceedance error',
      description: 'Balcony cantilever extends 0.35m beyond cadastral vertical setback prism.',
      status: 'Error',
      spatialDelta: '+0.35 m'
    }
  },
  {
    propertyId: 'U303',
    unitNumber: '303',
    ulpin: 'IN-WB-KOL-00125-B01-F03-U303',
    parcelId: 'WB-KOL-00125',
    buildingId: 'B01',
    floor: '03',
    floorNumber: 3,
    floorName: 'Third Floor',
    propertyType: 'Residential',
    area: 76.5,
    verticalRange: '11.5–15.0 m',
    volume: 267.75,
    status: 'Verified',
    ownerName: 'Aparna Basu',
    assessmentNumber: 'ASS-KOL-2024-0303',
    xExtent: { min: 8, max: 16, delta: 8 },
    yExtent: { min: -11, max: 1, delta: 12 },
    zExtent: { min: 11.5, max: 15.0, delta: 3.5 },
    relativePosition: { x: 12, y: 13.25, z: -5 },
    dimensions: { width: 8, depth: 12, height: 3.5 },
    color: '#38bdf8'
  }
];

export const DEMO_UNDERGROUND_ASSETS: UndergroundAsset[] = [
  {
    infrastructureId: 'UG-WB-KOL-00125-W01',
    type: 'Water Pipeline',
    depth: 4.2,
    length: 126,
    diameter: '450 mm DI Class K9',
    capacity: '12,500 L/hr potable supply',
    status: 'Verified',
    path: [
      [-40, -4.2, 20],
      [-10, -4.2, 18],
      [20, -4.2, 15],
      [50, -4.2, 12]
    ],
    color: '#0284c7', // Cyan Blue
    material: 'Ductile Iron (DI)',
    installationYear: 2021
  },
  {
    infrastructureId: 'UG-WB-KOL-00125-S02',
    type: 'Sewer',
    depth: 5.8,
    length: 145,
    diameter: '600 mm Reinforced Concrete',
    capacity: 'Trunk Sewer Gravity Feed',
    status: 'Verified',
    path: [
      [-45, -5.8, -25],
      [-15, -5.8, -24],
      [15, -5.8, -22],
      [45, -5.8, -20]
    ],
    color: '#10b981', // Emerald Green
    material: 'Reinforced Cement Concrete (RCC)',
    installationYear: 2020
  },
  {
    infrastructureId: 'UG-WB-KOL-00125-E03',
    type: 'Electrical Conduit',
    depth: 2.8,
    length: 98,
    diameter: '4 x 150 mm HDPE Ducts',
    capacity: '11 kV Underground Feeder',
    status: 'Verified',
    path: [
      [-30, -2.8, 5],
      [0, -2.8, 6],
      [35, -2.8, 8]
    ],
    color: '#f59e0b', // Amber / Gold
    material: 'High-Density Polyethylene (HDPE)',
    installationYear: 2023
  },
  {
    infrastructureId: 'UG-WB-KOL-00125-P04',
    type: 'Underground Parking',
    depth: 7.5,
    length: 42,
    capacity: '120 Automated EV Charging Bays',
    status: 'Verified',
    path: [
      [-18, -7.5, -12],
      [18, -7.5, -12],
      [18, -7.5, 12],
      [-18, -7.5, 12]
    ],
    color: '#8b5cf6', // Violet
    material: 'Waterproofed Diaphragm Walls',
    installationYear: 2022
  },
  {
    infrastructureId: 'UG-WB-KOL-00125-U05',
    type: 'Utility Corridor',
    depth: 3.5,
    length: 110,
    diameter: 'Optical Fiber + Municipal Gas (CNG)',
    capacity: 'Multi-Utility Trunk Trench',
    status: 'Verified',
    path: [
      [-35, -3.5, -5],
      [10, -3.5, -3],
      [45, -3.5, 0]
    ],
    color: '#ec4899', // Pink
    material: 'Precast Utility Box Culvert',
    installationYear: 2023
  }
];

export const DEMO_VALIDATION_ISSUES: ValidationIssue[] = [
  {
    id: 'VAL-101',
    propertyId: 'U101',
    ulpin: 'IN-WB-KOL-00125-B01-F01-U101',
    issueType: 'none',
    title: 'Topologically Valid Volume',
    description: 'Zero volume intersection with adjacent vertical units. Perfectly bounded within floor prism.',
    status: 'Valid',
    spatialDelta: '0.00 m³'
  },
  {
    id: 'VAL-201',
    propertyId: 'U201',
    ulpin: 'IN-WB-KOL-00125-B01-F02-U201',
    issueType: 'none',
    title: 'Topologically Valid Volume',
    description: 'Boundary verification confirmed against LiDAR point cloud elevation profile.',
    status: 'Valid',
    spatialDelta: '0.00 m³'
  },
  {
    id: 'VAL-301',
    propertyId: 'U301',
    ulpin: 'IN-WB-KOL-00125-B01-F03-U301',
    issueType: 'overlap',
    title: 'Volume overlap detected',
    description: 'Spatial volume intersects by 0.04 m³ with adjacent Unit 302 party wall delineation.',
    status: 'Warning',
    affectedUnits: ['U301', 'U302'],
    spatialDelta: '0.04 m³'
  },
  {
    id: 'VAL-302',
    propertyId: 'U302',
    ulpin: 'IN-WB-KOL-00125-B01-F03-U302',
    issueType: 'boundary',
    title: 'Boundary error: Exceeds parcel boundary',
    description: 'Architectural cantilever projection extends +0.35m beyond parcel boundary envelope.',
    status: 'Error',
    affectedUnits: ['U302'],
    spatialDelta: '+0.35 m'
  }
];

export const DEMO_DATASETS: DatasetItem[] = [
  {
    id: 'DS-2024-001',
    name: 'Kolkata_SectorV_LiDAR_Classified.laz',
    category: 'POINT CLOUD',
    format: 'LAZ v1.4',
    size: '412.5 MB',
    status: 'Complete',
    uploadedAt: '2024-08-12 14:22',
    recordsExtracted: 3840
  },
  {
    id: 'DS-2024-002',
    name: 'Bidhannagar_Parcels_Cadastre.geojson',
    category: 'GIS DATA',
    format: 'GeoJSON',
    size: '18.4 MB',
    status: 'Complete',
    uploadedAt: '2024-08-14 09:10',
    recordsExtracted: 1248
  },
  {
    id: 'DS-2024-003',
    name: 'CyberVista_AsBuilt_BIM_Model.ifc',
    category: 'BUILDING DATA',
    format: 'IFC 4x3',
    size: '86.2 MB',
    status: 'Complete',
    uploadedAt: '2024-08-16 16:45',
    recordsExtracted: 48
  },
  {
    id: 'DS-2024-004',
    name: 'SaltLake_HighRes_Elevation_DEM.tif',
    category: 'ELEVATION',
    format: 'GeoTIFF 32-bit',
    size: '124.0 MB',
    status: 'Ready',
    uploadedAt: '2024-08-18 11:30',
    recordsExtracted: 950
  }
];

// Recharts analytical data structures
export const ANALYTICS_FLOOR_DISTRIBUTION = [
  { floor: 'Ground (Commercial)', units: 48, volume: 16800, area: 4800 },
  { floor: 'Floor 01 (Office/Res)', units: 124, volume: 43400, area: 12400 },
  { floor: 'Floor 02 (Residential)', units: 142, volume: 49700, area: 14200 },
  { floor: 'Floor 03 (Residential)', units: 138, volume: 48300, area: 13800 },
  { floor: 'Floor 04+ (Penthouse)', units: 64, volume: 25600, area: 7200 }
];

export const ANALYTICS_INFRASTRUCTURE_METRICS = [
  { type: 'Water Supply', lengthKm: 42.8, assetsCount: 680, depthAvgM: 4.2 },
  { type: 'Sewer & Drainage', lengthKm: 38.4, assetsCount: 540, depthAvgM: 5.6 },
  { type: 'Power (11kV)', lengthKm: 56.2, assetsCount: 820, depthAvgM: 2.8 },
  { type: 'Gas & Telecom', lengthKm: 29.1, assetsCount: 274, depthAvgM: 3.4 }
];

export const ANALYTICS_VALIDATION_BREAKDOWN = [
  { name: 'Topologically Valid', value: 119, color: '#10b981' },
  { name: 'Spatial Warnings', value: 3, color: '#f59e0b' },
  { name: 'Boundary Errors', value: 2, color: '#ef4444' }
];

export const ANALYTICS_PROPERTY_TYPES = [
  { name: 'Residential Condos', count: 3940, fill: '#06b6d4' },
  { name: 'Commercial Units', count: 1240, fill: '#3b82f6' },
  { name: 'Subsurface & Parking', count: 480, fill: '#8b5cf6' },
  { name: 'Public & Utility', count: 182, fill: '#10b981' }
];
