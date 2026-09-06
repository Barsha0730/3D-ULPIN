import React, { useState } from 'react';
import { UndergroundAsset } from '../../types';
import { 
  ArrowDownCircle, 
  Droplet, 
  Zap, 
  ShieldCheck, 
  Search, 
  Download, 
  Layers, 
  CheckCircle2, 
  AlertTriangle,
  Clock
} from 'lucide-react';

interface InfrastructurePageProps {
  undergroundAssets: UndergroundAsset[];
  onViewIn3D: (assetId: string) => void;
}

export const InfrastructurePage: React.FC<InfrastructurePageProps> = ({
  undergroundAssets,
  onViewIn3D
}) => {
  const [filterType, setFilterType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = undergroundAssets.filter(u => {
    const matchesSearch = 
      u.infrastructureId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || u.type.toLowerCase().includes(filterType.toLowerCase());
    return matchesSearch && matchesType;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-cyan-500/15">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-wide">
              Subterranean Infrastructure Registry
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
              SUBSURFACE CADASTRAL
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Volumetric 3D registration of underground water pipelines, power conduits, sewers and parking facilities.
          </p>
        </div>

        <div className="p-2.5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-200 text-xs font-mono flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>Section 14 Subsurface Easements Active</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl gis-glass border border-slate-800 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Asset ID or Type..."
            className="w-full pl-9 pr-4 py-2 text-xs font-mono rounded-lg bg-slate-900 border border-slate-700 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto text-xs font-mono">
          <span className="text-slate-400">Filter Utility:</span>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 focus:border-cyan-400"
          >
            <option value="All">All Subterranean Assets</option>
            <option value="Water">Water Pipeline</option>
            <option value="Sewer">Sewer Trunk</option>
            <option value="Electricity">Power Conduit</option>
            <option value="Parking">Underground Parking</option>
          </select>
        </div>
      </div>

      {/* Assets Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((asset) => (
          <div 
            key={asset.infrastructureId}
            className="p-4 rounded-xl gis-glass-card border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs font-mono font-bold text-white">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: asset.color }} />
                  {asset.type}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                  {asset.status}
                </span>
              </div>
              <div className="text-xs font-mono text-cyan-400 mt-1 font-semibold">
                {asset.infrastructureId}
              </div>
            </div>

            {/* Depth and specs */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
              <div>
                <span className="text-[10px] text-slate-400 block">DEPTH</span>
                <span className="text-amber-300 font-bold text-sm">-{asset.depth} m</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">LENGTH / EXTENT</span>
                <span className="text-cyan-300 font-bold text-sm">{asset.length} m</span>
              </div>
            </div>

            <div className="space-y-1 text-xs font-mono text-slate-400">
              <div className="flex justify-between">
                <span>Material:</span>
                <span className="text-slate-200">{asset.material}</span>
              </div>
              <div className="flex justify-between">
                <span>Specification:</span>
                <span className="text-slate-200">{asset.diameter || asset.capacity}</span>
              </div>
              <div className="flex justify-between">
                <span>Installation:</span>
                <span className="text-slate-200">{asset.installationYear}</span>
              </div>
            </div>

            <button
              onClick={() => onViewIn3D(asset.infrastructureId)}
              className="w-full py-2 px-3 rounded-lg bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500/40 text-amber-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <ArrowDownCircle className="w-4 h-4" />
              <span>Inspect Subsurface in 3D</span>
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};
