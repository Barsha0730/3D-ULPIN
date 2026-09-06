import React, { useState } from 'react';
import { 
  Building, 
  Parcel, 
  PropertyVolume, 
  UndergroundAsset, 
  LayerVisibilityState, 
  CadastralStats 
} from '../../types';
import { Cadastral3DViewer } from '../map/Cadastral3DViewer';
import { 
  Box, 
  Building2, 
  Compass, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowUpRight, 
  TrendingUp, 
  Activity, 
  Layers, 
  Maximize2, 
  RotateCcw, 
  Eye, 
  EyeOff, 
  ArrowDownCircle, 
  Sparkles,
  MapPin,
  Clock,
  ShieldCheck
} from 'lucide-react';

interface DashboardPageProps {
  stats: CadastralStats;
  parcels: Parcel[];
  buildings: Building[];
  properties: PropertyVolume[];
  undergroundAssets: UndergroundAsset[];
  onNavigate: (route: string) => void;
  onSelectProperty: (propertyId: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  stats,
  parcels,
  buildings,
  properties,
  undergroundAssets,
  onNavigate,
  onSelectProperty
}) => {
  const [undergroundMode, setUndergroundMode] = useState(false);
  const [explodedFloors, setExplodedFloors] = useState(false);
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

  const toggleLayer = (key: keyof LayerVisibilityState) => {
    setLayerVisibility(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-cyan-500/15">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-wide">
              Urban Property Intelligence
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              OPERATIONAL GIS
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time overview of the 3D cadastral environment.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg gis-glass text-emerald-300 border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>GIS REPO ONLINE (WEST BENGAL PILOT)</span>
          </div>
        </div>
      </div>

      {/* 2. Top Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        
        {/* Total Parcels */}
        <div className="p-4 rounded-xl gis-glass-card border border-slate-800 hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-1 text-xs">
            <span className="font-mono uppercase text-[10px]">Total Parcels</span>
            <Compass className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-xl sm:text-2xl font-display font-extrabold text-white">
            {stats.totalParcels.toLocaleString()}
          </div>
          <div className="text-[11px] text-cyan-400 mt-1 flex items-center gap-1 font-mono">
            <span>+12 this month</span>
          </div>
        </div>

        {/* 3D Properties */}
        <div className="p-4 rounded-xl gis-glass-card border border-slate-800 hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-1 text-xs">
            <span className="font-mono uppercase text-[10px]">3D Properties</span>
            <Box className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-xl sm:text-2xl font-display font-extrabold text-cyan-300">
            {stats.threeDProperties.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 mt-1 font-mono">
            Volumetric units
          </div>
        </div>

        {/* Buildings */}
        <div className="p-4 rounded-xl gis-glass-card border border-slate-800 hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-1 text-xs">
            <span className="font-mono uppercase text-[10px]">Buildings</span>
            <Building2 className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-xl sm:text-2xl font-display font-extrabold text-white">
            {stats.buildings.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 mt-1 font-mono">
            Extruded 3D shells
          </div>
        </div>

        {/* Underground Assets */}
        <div className="p-4 rounded-xl gis-glass-card border border-slate-800 hover:border-amber-500/40 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-1 text-xs">
            <span className="font-mono uppercase text-[10px]">Underground Assets</span>
            <ArrowDownCircle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl sm:text-2xl font-display font-extrabold text-amber-300">
            {stats.undergroundAssets.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 mt-1 font-mono">
            Water, power, sewers
          </div>
        </div>

        {/* Validation Rate */}
        <div className="p-4 rounded-xl gis-glass-card border border-slate-800 hover:border-emerald-500/40 transition-all col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-slate-400 mb-1 text-xs">
            <span className="font-mono uppercase text-[10px]">Validation Rate</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl sm:text-2xl font-display font-extrabold text-emerald-300">
            {stats.validationRate}%
          </div>
          <div className="text-[11px] text-emerald-400 mt-1 font-mono flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Zero topology clash</span>
          </div>
        </div>

      </div>

      {/* 3. Operational Map Section */}
      <div className="rounded-2xl gis-glass border border-cyan-500/20 overflow-hidden shadow-2xl space-y-2">
        
        {/* Map Top Control Bar */}
        <div className="p-3 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-slate-300 font-bold">OPERATIONAL CADASTRE MAP</span>
            <span className="text-slate-500">//</span>
            <span className="text-cyan-400">SECTOR V KOLKATA PILOT</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Underground toggle */}
            <button
              onClick={() => setUndergroundMode(!undergroundMode)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors flex items-center gap-1.5 ${
                undergroundMode
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
              }`}
              id="dashboard-underground-mode-btn"
            >
              <ArrowDownCircle className="w-3.5 h-3.5" />
              <span>Underground Mode</span>
            </button>

            {/* Explode Floors */}
            <button
              onClick={() => setExplodedFloors(!explodedFloors)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors flex items-center gap-1.5 ${
                explodedFloors
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
              }`}
              id="dashboard-explode-floors-btn"
            >
              <Box className="w-3.5 h-3.5" />
              <span>Explode Floors</span>
            </button>

            {/* Fullscreen Jump to /map */}
            <button
              onClick={() => onNavigate('/map')}
              className="px-3 py-1.5 rounded-lg bg-cyan-600/30 hover:bg-cyan-600/50 text-cyan-200 border border-cyan-500/40 font-medium transition-colors flex items-center gap-1.5"
              id="dashboard-full-gis-btn"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Full GIS Workspace</span>
            </button>
          </div>
        </div>

        {/* Map Canvas */}
        <div className="w-full h-[500px] relative">
          <Cadastral3DViewer
            parcels={parcels}
            buildings={buildings}
            properties={properties}
            undergroundAssets={undergroundAssets}
            selectedParcelId="WB-KOL-00125"
            selectedBuildingId="B01"
            selectedFloorNumber={explodedFloors ? 3 : null}
            selectedPropertyId="U301"
            selectedInfrastructureId={undergroundMode ? 'UG-WB-KOL-00125-W01' : null}
            explodedFloors={explodedFloors}
            undergroundMode={undergroundMode}
            layerVisibility={layerVisibility}
            onSelectParcel={() => {}}
            onSelectBuilding={() => {}}
            onSelectFloor={() => {}}
            onSelectProperty={onSelectProperty}
            onSelectInfrastructure={() => {}}
            height="100%"
            showControls={true}
          />
        </div>
      </div>

      {/* 4. Secondary Grid: Recent Highlights & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Quick Property Jumps */}
        <div className="lg:col-span-7 rounded-xl gis-glass border border-slate-800 p-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono font-bold text-white uppercase">
                Featured 3D Property Volumes
              </span>
            </div>
            <button 
              onClick={() => onNavigate('/properties')}
              className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
            >
              View all 12 properties <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-800/60">
            {properties.slice(0, 4).map((prop) => (
              <div 
                key={prop.propertyId}
                onClick={() => {
                  onSelectProperty(prop.propertyId);
                  onNavigate('/map');
                }}
                className="py-2.5 flex items-center justify-between hover:bg-cyan-500/5 px-2 rounded-lg cursor-pointer transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs font-semibold text-slate-100">
                    <span>Unit {prop.unitNumber}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                      {prop.floorName}
                    </span>
                    <span className="text-[10px] text-cyan-400">
                      {prop.volume} m³
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                    {prop.ulpin}
                  </div>
                </div>

                <button className="px-2.5 py-1 text-[11px] font-mono rounded bg-slate-800 hover:bg-cyan-500/20 text-cyan-300 border border-slate-700">
                  Inspect in 3D →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Subsurface Infrastructure Summary */}
        <div className="lg:col-span-5 rounded-xl gis-glass border border-slate-800 p-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <ArrowDownCircle className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono font-bold text-white uppercase">
                Subterranean Utilities
              </span>
            </div>
            <button 
              onClick={() => onNavigate('/infrastructure')}
              className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
            >
              All Assets <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            {undergroundAssets.slice(0, 3).map((infra) => (
              <div 
                key={infra.infrastructureId}
                className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs font-mono"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: infra.color }} />
                  <div>
                    <div className="font-semibold text-slate-200">{infra.type}</div>
                    <div className="text-[10px] text-slate-400">{infra.infrastructureId}</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-amber-300 font-bold">-{infra.depth}m</span>
                  <span className="text-[10px] text-slate-500 block">{infra.length}m len</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
