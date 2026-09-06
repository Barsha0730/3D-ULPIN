import React from 'react';
import { 
  LayerVisibilityState 
} from '../../types';
import { 
  Layers, 
  MapPin, 
  Building2, 
  Car, 
  Box, 
  Eye, 
  EyeOff, 
  Droplet, 
  Zap, 
  UploadCloud, 
  Sparkles, 
  CheckCircle2, 
  Mountain, 
  ShieldAlert,
  ArrowDownCircle,
  FolderPlus
} from 'lucide-react';

interface LayerControlProps {
  layerVisibility: LayerVisibilityState;
  onToggleLayer: (layer: keyof LayerVisibilityState) => void;
  undergroundMode: boolean;
  onToggleUndergroundMode: () => void;
  explodedFloors: boolean;
  onToggleExplodedFloors: () => void;
  onOpenImport: () => void;
  onOpenGenerator: () => void;
  onRunValidation: () => void;
}

export const LayerControl: React.FC<LayerControlProps> = ({
  layerVisibility,
  onToggleLayer,
  undergroundMode,
  onToggleUndergroundMode,
  explodedFloors,
  onToggleExplodedFloors,
  onOpenImport,
  onOpenGenerator,
  onRunValidation
}) => {
  return (
    <div className="w-full sm:w-64 bg-[#0f172a]/70 border-r border-slate-800 flex flex-col p-4 gap-5 z-40 backdrop-blur-sm overflow-y-auto max-h-[calc(100vh-140px)] select-none" id="map-layer-control-sidebar">
      
      {/* Header */}
      <div>
        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
          Layer Control
        </h3>
        
        {/* Quick Action Mode Toggles */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button
            onClick={onToggleUndergroundMode}
            className={`p-2 rounded text-xs font-mono font-medium flex flex-col items-center gap-1 border transition-all ${
              undergroundMode
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md shadow-amber-950/40'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
            }`}
            id="toggle-underground-mode-btn"
          >
            <ArrowDownCircle className="w-3.5 h-3.5" />
            <span className="text-[10px] uppercase font-bold">Underground</span>
          </button>

          <button
            onClick={onToggleExplodedFloors}
            className={`p-2 rounded text-xs font-mono font-medium flex flex-col items-center gap-1 border transition-all ${
              explodedFloors
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-md shadow-cyan-950/40'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
            }`}
            id="toggle-explode-floors-btn"
          >
            <Box className="w-3.5 h-3.5" />
            <span className="text-[10px] uppercase font-bold">Explode</span>
          </button>
        </div>

        <div className="space-y-4">
          {/* Section 1: LAND */}
          <section>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-cyan-400/80">LAND</span>
              <span className="text-[9px] text-slate-500 uppercase font-mono">03 Active</span>
            </div>
            <div className="space-y-1.5 bg-slate-900/40 rounded-lg p-2 border border-slate-800/80">
              <label 
                onClick={() => onToggleLayer('parcels')}
                className="flex items-center justify-between text-[11px] cursor-pointer py-0.5 group hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-3.5 h-3.5 border rounded flex items-center justify-center transition-colors ${
                    layerVisibility.parcels ? 'border-cyan-500 bg-cyan-500/20' : 'border-slate-700 bg-slate-900/40'
                  }`}>
                    {layerVisibility.parcels && <CheckCircle2 className="w-2.5 h-2.5 text-cyan-400" />}
                  </div>
                  <span className={layerVisibility.parcels ? 'text-slate-200 group-hover:text-white' : 'text-slate-500'}>
                    Parcels (2D Cadastre)
                  </span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400">5</span>
              </label>

              <label 
                onClick={() => onToggleLayer('buildings')}
                className="flex items-center justify-between text-[11px] cursor-pointer py-0.5 group hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-3.5 h-3.5 border rounded flex items-center justify-center transition-colors ${
                    layerVisibility.buildings ? 'border-cyan-500 bg-cyan-500/20' : 'border-slate-700 bg-slate-900/40'
                  }`}>
                    {layerVisibility.buildings && <CheckCircle2 className="w-2.5 h-2.5 text-cyan-400" />}
                  </div>
                  <span className={layerVisibility.buildings ? 'text-slate-200 group-hover:text-white' : 'text-slate-500'}>
                    Buildings (3D Shells)
                  </span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400">3</span>
              </label>

              <label 
                onClick={() => onToggleLayer('roads')}
                className="flex items-center justify-between text-[11px] cursor-pointer py-0.5 group hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-3.5 h-3.5 border rounded flex items-center justify-center transition-colors ${
                    layerVisibility.roads ? 'border-cyan-500 bg-cyan-500/20' : 'border-slate-700 bg-slate-900/40'
                  }`}>
                    {layerVisibility.roads && <CheckCircle2 className="w-2.5 h-2.5 text-cyan-400" />}
                  </div>
                  <span className={layerVisibility.roads ? 'text-slate-200 group-hover:text-white' : 'text-slate-500'}>
                    Roads & Corridors
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">2</span>
              </label>
            </div>
          </section>

          {/* Section 2: PROPERTY */}
          <section>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-blue-400/80">PROPERTY</span>
              <span className="text-[9px] text-slate-500 uppercase font-mono">03 Active</span>
            </div>
            <div className="space-y-1.5 bg-slate-900/40 rounded-lg p-2 border border-slate-800/80">
              <label 
                onClick={() => onToggleLayer('floors')}
                className="flex items-center justify-between text-[11px] cursor-pointer py-0.5 group hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-3.5 h-3.5 border rounded flex items-center justify-center transition-colors ${
                    layerVisibility.floors ? 'border-blue-500 bg-blue-500/20' : 'border-slate-700 bg-slate-900/40'
                  }`}>
                    {layerVisibility.floors && <CheckCircle2 className="w-2.5 h-2.5 text-blue-400" />}
                  </div>
                  <span className={layerVisibility.floors ? 'text-slate-200 group-hover:text-white' : 'text-slate-500'}>
                    Floors (Vertical Strata)
                  </span>
                </div>
                <span className="text-[10px] font-mono text-blue-400">12</span>
              </label>

              <label 
                onClick={() => onToggleLayer('propertyUnits')}
                className="flex items-center justify-between text-[11px] cursor-pointer py-0.5 group hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-3.5 h-3.5 border rounded flex items-center justify-center transition-colors ${
                    layerVisibility.propertyUnits ? 'border-blue-500 bg-blue-500/20' : 'border-slate-700 bg-slate-900/40'
                  }`}>
                    {layerVisibility.propertyUnits && <CheckCircle2 className="w-2.5 h-2.5 text-blue-400" />}
                  </div>
                  <span className={layerVisibility.propertyUnits ? 'text-slate-200 group-hover:text-white' : 'text-slate-500'}>
                    Property Units
                  </span>
                </div>
                <span className="text-[10px] font-mono text-blue-400">36</span>
              </label>

              <label 
                onClick={() => onToggleLayer('threeDVolumes')}
                className="flex items-center justify-between text-[11px] cursor-pointer py-0.5 group hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-3.5 h-3.5 border rounded flex items-center justify-center transition-colors ${
                    layerVisibility.threeDVolumes ? 'border-cyan-500 bg-cyan-500/20' : 'border-slate-700 bg-slate-900/40'
                  }`}>
                    {layerVisibility.threeDVolumes && <CheckCircle2 className="w-2.5 h-2.5 text-cyan-400" />}
                  </div>
                  <span className={layerVisibility.threeDVolumes ? 'text-slate-200 group-hover:text-white' : 'text-slate-500'}>
                    3D Property Volumes
                  </span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400">3D</span>
              </label>
            </div>
          </section>

          {/* Section 3: INFRASTRUCTURE */}
          <section>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-orange-400/80">INFRASTRUCTURE</span>
              <span className="text-[9px] text-slate-500 uppercase font-mono">04 Subsurface</span>
            </div>
            <div className="space-y-1.5 bg-slate-900/40 rounded-lg p-2 border border-slate-800/80">
              <label 
                onClick={() => onToggleLayer('water')}
                className="flex items-center justify-between text-[11px] cursor-pointer py-0.5 group hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-3.5 h-3.5 border rounded flex items-center justify-center transition-colors ${
                    layerVisibility.water ? 'border-cyan-500 bg-cyan-500/20' : 'border-slate-700 bg-slate-900/40'
                  }`}>
                    {layerVisibility.water && <CheckCircle2 className="w-2.5 h-2.5 text-cyan-400" />}
                  </div>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span className={layerVisibility.water ? 'text-slate-200 group-hover:text-white' : 'text-slate-500'}>Water Pipelines</span>
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">4.2m</span>
              </label>

              <label 
                onClick={() => onToggleLayer('sewer')}
                className="flex items-center justify-between text-[11px] cursor-pointer py-0.5 group hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-3.5 h-3.5 border rounded flex items-center justify-center transition-colors ${
                    layerVisibility.sewer ? 'border-emerald-500 bg-emerald-500/20' : 'border-slate-700 bg-slate-900/40'
                  }`}>
                    {layerVisibility.sewer && <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />}
                  </div>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className={layerVisibility.sewer ? 'text-slate-200 group-hover:text-white' : 'text-slate-500'}>Sewer Trunk</span>
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">5.8m</span>
              </label>

              <label 
                onClick={() => onToggleLayer('electricity')}
                className="flex items-center justify-between text-[11px] cursor-pointer py-0.5 group hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-3.5 h-3.5 border rounded flex items-center justify-center transition-colors ${
                    layerVisibility.electricity ? 'border-amber-500 bg-amber-500/20' : 'border-slate-700 bg-slate-900/40'
                  }`}>
                    {layerVisibility.electricity && <CheckCircle2 className="w-2.5 h-2.5 text-amber-400" />}
                  </div>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span className={layerVisibility.electricity ? 'text-slate-200 group-hover:text-white' : 'text-slate-500'}>11kV Conduits</span>
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">2.8m</span>
              </label>

              <label 
                onClick={() => onToggleLayer('undergroundParking')}
                className="flex items-center justify-between text-[11px] cursor-pointer py-0.5 group hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-3.5 h-3.5 border rounded flex items-center justify-center transition-colors ${
                    layerVisibility.undergroundParking ? 'border-violet-500 bg-violet-500/20' : 'border-slate-700 bg-slate-900/40'
                  }`}>
                    {layerVisibility.undergroundParking && <CheckCircle2 className="w-2.5 h-2.5 text-violet-400" />}
                  </div>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                    <span className={layerVisibility.undergroundParking ? 'text-slate-200 group-hover:text-white' : 'text-slate-500'}>Parking Basement</span>
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">7.5m</span>
              </label>
            </div>
          </section>

          {/* Section 4: ENVIRONMENT */}
          <section>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-400/80">ENVIRONMENT</span>
              <span className="text-[9px] text-slate-500 uppercase font-mono">Active</span>
            </div>
            <div className="space-y-1.5 bg-slate-900/40 rounded-lg p-2 border border-slate-800/80">
              <label 
                onClick={() => onToggleLayer('terrain')}
                className="flex items-center justify-between text-[11px] cursor-pointer py-0.5 group hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-3.5 h-3.5 border rounded flex items-center justify-center transition-colors ${
                    layerVisibility.terrain ? 'border-emerald-500 bg-emerald-500/20' : 'border-slate-700 bg-slate-900/40'
                  }`}>
                    {layerVisibility.terrain && <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />}
                  </div>
                  <span className={layerVisibility.terrain ? 'text-slate-200 group-hover:text-white' : 'text-slate-500'}>
                    Topographic Terrain
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">Mesh</span>
              </label>

              <label 
                onClick={() => onToggleLayer('dem')}
                className="flex items-center justify-between text-[11px] cursor-pointer py-0.5 group hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-3.5 h-3.5 border rounded flex items-center justify-center transition-colors ${
                    layerVisibility.dem ? 'border-emerald-500 bg-emerald-500/20' : 'border-slate-700 bg-slate-900/40'
                  }`}>
                    {layerVisibility.dem && <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />}
                  </div>
                  <span className={layerVisibility.dem ? 'text-slate-200 group-hover:text-white' : 'text-slate-500'}>
                    DEM Elevation Model
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">1m res</span>
              </label>
            </div>
          </section>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-auto pt-2 border-t border-slate-800 space-y-2">
        <button
          onClick={onOpenGenerator}
          className="w-full py-2 bg-cyan-600/20 border border-cyan-500/50 hover:bg-cyan-600/30 text-cyan-400 text-[11px] font-bold rounded uppercase tracking-wider transition-all"
          id="sidebar-generate-ulpin-btn"
        >
          Generate 3D ULPIN
        </button>

        <button
          onClick={onRunValidation}
          className="w-full py-2 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 text-[11px] font-bold rounded uppercase tracking-wider transition-all"
          id="sidebar-run-validation-btn"
        >
          Run Topology Check
        </button>
      </div>
    </div>
  );
};
