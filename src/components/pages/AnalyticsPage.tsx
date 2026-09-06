import React from 'react';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Box, 
  Building2, 
  Layers, 
  Compass, 
  ShieldCheck,
  ArrowUpRight
} from 'lucide-react';
import { PropertyVolume, CadastralStats } from '../../types';

interface AnalyticsPageProps {
  stats: CadastralStats;
  properties: PropertyVolume[];
  onNavigate: (route: string) => void;
}

export const AnalyticsPage: React.FC<AnalyticsPageProps> = ({
  stats,
  properties,
  onNavigate
}) => {
  const residentialCount = properties.filter(p => p.propertyType === 'Residential').length;
  const commercialCount = properties.filter(p => p.propertyType === 'Commercial').length;
  const utilityCount = properties.filter(p => p.propertyType === 'Utility').length;

  const totalVolume = properties.reduce((acc, p) => acc + p.volume, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-cyan-500/15">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-cyan-400" />
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-wide">
              Cadastral Volumetric Analytics
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Statistical breakdown of 3D spatial envelopes, vertical density, and volumetric land value models.
          </p>
        </div>

        <button
          onClick={() => onNavigate('/map')}
          className="px-4 py-2 rounded-xl bg-cyan-600/30 hover:bg-cyan-600/40 text-cyan-200 border border-cyan-500/40 text-xs font-mono font-semibold transition-colors"
        >
          View Spatial Distribution in 3D →
        </button>
      </div>

      {/* Top Aggregations */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
        <div className="p-4 rounded-xl gis-glass border border-slate-800">
          <span className="text-slate-400 text-[10px] uppercase block">TOTAL 3D VOLUME</span>
          <span className="text-2xl font-bold text-cyan-300 block mt-1">{totalVolume.toFixed(1)} m³</span>
          <span className="text-slate-500 text-[10px]">Calculated envelope bounds</span>
        </div>

        <div className="p-4 rounded-xl gis-glass border border-slate-800">
          <span className="text-slate-400 text-[10px] uppercase block">AVERAGE UNIT VOLUME</span>
          <span className="text-2xl font-bold text-white block mt-1">
            {(totalVolume / (properties.length || 1)).toFixed(1)} m³
          </span>
          <span className="text-slate-500 text-[10px]">Per residential/commercial unit</span>
        </div>

        <div className="p-4 rounded-xl gis-glass border border-slate-800">
          <span className="text-slate-400 text-[10px] uppercase block">VERTICAL STRATA</span>
          <span className="text-2xl font-bold text-amber-300 block mt-1">4 Levels</span>
          <span className="text-slate-500 text-[10px]">Ground to +15.2m Z-index</span>
        </div>

        <div className="p-4 rounded-xl gis-glass border border-emerald-500/30">
          <span className="text-emerald-400 text-[10px] uppercase block">TOPOLOGY FIDELITY</span>
          <span className="text-2xl font-bold text-emerald-300 block mt-1">98.4%</span>
          <span className="text-emerald-400 text-[10px]">Mesh verification index</span>
        </div>
      </div>

      {/* Volume Distribution Bars */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Type Distribution */}
        <div className="p-5 rounded-2xl gis-glass border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-display font-bold text-white uppercase tracking-wider">
              Volumetric Distribution by Property Type
            </h3>
            <span className="text-[10px] font-mono text-cyan-400">Total {properties.length} Units</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Residential (Apartments)</span>
                <span className="text-cyan-300 font-bold">{residentialCount} units (75%)</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-cyan-400 rounded-full" style={{ width: '75%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Commercial (Offices / Retail)</span>
                <span className="text-blue-400 font-bold">{commercialCount} units (17%)</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '17%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Utility & Common Strata</span>
                <span className="text-amber-400 font-bold">{utilityCount} units (8%)</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: '8%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Height and Elevation Analysis */}
        <div className="p-5 rounded-2xl gis-glass border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-display font-bold text-white uppercase tracking-wider">
              Vertical Elevation Profile
            </h3>
            <span className="text-[10px] font-mono text-amber-400">Z-Range</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-slate-400 text-[10px] block">FLOOR 03 (TOP STRATA)</span>
                <span className="text-white font-bold">11.5m to 15.0m elevation</span>
              </div>
              <span className="text-cyan-300 font-bold">791.1 m³ Volume</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-slate-400 text-[10px] block">FLOOR 02 (MID STRATA)</span>
                <span className="text-white font-bold">7.7m to 11.2m elevation</span>
              </div>
              <span className="text-cyan-300 font-bold">775.2 m³ Volume</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-slate-400 text-[10px] block">FLOOR 01 (LOW STRATA)</span>
                <span className="text-white font-bold">3.9m to 7.4m elevation</span>
              </div>
              <span className="text-cyan-300 font-bold">780.0 m³ Volume</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-slate-400 text-[10px] block">GROUND FLOOR (SURFACE)</span>
                <span className="text-white font-bold">0.0m to 3.6m elevation</span>
              </div>
              <span className="text-cyan-300 font-bold">810.0 m³ Volume</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
