import React from 'react';
import { 
  Box, 
  Map, 
  Play, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  ShieldCheck, 
  CheckCircle2, 
  Cpu, 
  Building2, 
  Compass, 
  Database,
  Eye,
  Activity,
  ChevronRight,
  TrendingUp,
  FileCheck
} from 'lucide-react';
import { Cadastral3DViewer } from '../map/Cadastral3DViewer';
import { Parcel, Building, PropertyVolume, UndergroundAsset, LayerVisibilityState } from '../../types';

interface LandingPageProps {
  onNavigate: (route: string) => void;
  onRunDemo: () => void;
  parcels: Parcel[];
  buildings: Building[];
  properties: PropertyVolume[];
  undergroundAssets: UndergroundAsset[];
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onRunDemo,
  parcels,
  buildings,
  properties,
  undergroundAssets
}) => {
  const defaultLayers: LayerVisibilityState = {
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
  };

  const workflowSteps = [
    { title: '2D Land Parcel', desc: 'Flat cadastral boundary survey polygon' },
    { title: '3D Building', desc: 'LiDAR / BIM volumetric extrusion' },
    { title: 'Floor Segmentation', desc: 'Vertical architectural floor slicing' },
    { title: 'Vertical Property Delineation', desc: 'Unit strata spatial envelope bounds' },
    { title: '3D Property Volume', desc: 'Accurate cubic volume calculation' },
    { title: 'Unique 3D ULPIN', desc: 'Hierarchical Bhu-Aadhaar spatial ID' },
    { title: 'Topology Validation', desc: 'Encroachment & overlap zero-tolerance' },
    { title: '3D Cadastral Governance', desc: 'Multi-layer land administration' }
  ];

  return (
    <div className="w-full space-y-16 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-20 border-b border-cyan-500/10">
        
        {/* Subtle Ambient Glows */}
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Headings & Call to Action */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full gis-glass border border-cyan-400/30 text-xs font-mono text-cyan-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>NEXT-GEN CADASTRAL GIS // NATIONAL PROTOTYPE</span>
              </div>

              {/* Large Heading */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-tight">
                Mapping the Future of Urban Land Ownership <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">in 3D.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                An intelligent 3D cadastral platform for identifying, mapping and validating surface, vertical and underground property rights.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('/map')}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-display font-bold text-sm shadow-xl shadow-cyan-500/25 flex items-center gap-2 transition-all active:scale-95"
                  id="hero-explore-3d-map-btn"
                >
                  <Map className="w-4 h-4" />
                  <span>Explore 3D Map</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <button
                  onClick={onRunDemo}
                  className="px-5 py-3.5 rounded-xl gis-glass hover:bg-slate-800/80 border border-slate-700 hover:border-cyan-500/40 text-slate-200 font-medium text-sm flex items-center gap-2 transition-all active:scale-95"
                  id="hero-watch-demo-btn"
                >
                  <Play className="w-4 h-4 text-cyan-400" />
                  <span>Watch Demo (Automated)</span>
                </button>
              </div>

              {/* Tagline Box */}
              <div className="pt-4">
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-cyan-500/25 font-mono text-xs text-cyan-300 flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="font-semibold">
                    "Every Parcel Has a Place. Every Property Has a Volume."
                  </span>
                </div>
              </div>

              {/* Quick Spec Metrics */}
              <div className="grid grid-cols-3 gap-3 pt-2 font-mono text-xs">
                <div className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">TOTAL PARCELS</span>
                  <span className="text-slate-100 font-bold text-sm">1,248</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">3D PROPERTIES</span>
                  <span className="text-cyan-300 font-bold text-sm">5,842</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">VALIDATION RATE</span>
                  <span className="text-emerald-300 font-bold text-sm">98.4%</span>
                </div>
              </div>
            </div>

            {/* Right Column: Stylized Interactive 3D City / Cadastral Scene */}
            <div className="lg:col-span-6 relative">
              <div className="relative w-full h-[460px] sm:h-[540px] rounded-2xl overflow-hidden border border-cyan-500/30 shadow-2xl gis-glow-cyan">
                
                {/* 3D Map Embedded */}
                <Cadastral3DViewer
                  parcels={parcels}
                  buildings={buildings}
                  properties={properties}
                  undergroundAssets={undergroundAssets}
                  selectedParcelId="WB-KOL-00125"
                  selectedBuildingId="B01"
                  selectedFloorNumber={3}
                  selectedPropertyId="U301"
                  selectedInfrastructureId={null}
                  explodedFloors={true}
                  undergroundMode={false}
                  layerVisibility={defaultLayers}
                  onSelectParcel={() => {}}
                  onSelectBuilding={() => {}}
                  onSelectFloor={() => {}}
                  onSelectProperty={() => {}}
                  onSelectInfrastructure={() => {}}
                  height="100%"
                  showControls={false}
                />

                {/* Floating Stylized Overlay Cards */}
                <div className="absolute top-4 left-4 p-2.5 rounded-xl gis-glass border border-cyan-500/40 text-xs font-mono text-cyan-200 pointer-events-none flex items-center gap-2">
                  <Box className="w-4 h-4 text-cyan-400" />
                  <div>
                    <div className="text-[10px] text-slate-400">ACTIVE VOLUME HIGHLIGHT</div>
                    <div className="font-bold text-white">Unit 301 (263.7 m³)</div>
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl gis-glass border border-slate-700/60 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-slate-300">ULPIN: IN-WB-KOL-00125-B01-F03-U301</span>
                  </div>
                  <button
                    onClick={() => onNavigate('/map')}
                    className="px-2.5 py-1 rounded bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-semibold transition-colors"
                  >
                    Interact in 3D →
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. CORE WORKFLOW PIPELINE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-3 mb-10">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
            THE 3D CADASTRAL TRANSFORMATION PROCESS
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
            From Flat Polygons to Spatial Cadastral Intelligence
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
            Our multi-stage pipeline turns conventional 2D title registries into precise, vertically bounded 3D volumetric records.
          </p>
        </div>

        {/* 8-Step Grid Pipeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {workflowSteps.map((step, idx) => (
            <div
              key={step.title}
              className="p-4 rounded-xl gis-glass-card border border-slate-800 hover:border-cyan-500/40 transition-all group relative overflow-hidden"
            >
              <div className="text-[10px] font-mono text-cyan-400 font-bold mb-2 flex items-center justify-between">
                <span>0{idx + 1} // STEP</span>
                {idx < 7 && <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 transition-colors" />}
              </div>
              <h3 className="font-display font-bold text-sm text-slate-100 group-hover:text-cyan-300 transition-colors">
                {step.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. THREE CORE SPATIAL DOMAINS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Surface */}
          <div className="p-6 rounded-2xl gis-glass border border-slate-800 hover:border-cyan-500/40 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
              <Map className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-display font-bold text-white">Surface Parcels</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Standard 2D cadastral boundary polygons enriched with digital elevation models (DEM) and high-resolution orthoimagery.
            </p>
            <div className="text-xs font-mono text-cyan-400 pt-2 flex items-center gap-1">
              <span>Ground Cadastre Standard</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Vertical */}
          <div className="p-6 rounded-2xl gis-glass border border-slate-800 hover:border-cyan-500/40 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-300">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-display font-bold text-white">Vertical Strata Rights</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              High-rise apartment delineations, floor slabs, commercial retail spaces, and roof air-rights mapped with exact Z-elevation ranges.
            </p>
            <div className="text-xs font-mono text-cyan-400 pt-2 flex items-center gap-1">
              <span>Volumetric 3D ULPIN</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Subsurface */}
          <div className="p-6 rounded-2xl gis-glass border border-slate-800 hover:border-cyan-500/40 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <Box className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-display font-bold text-white">Subterranean Assets</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Water mains, high-voltage conduits, trunk sewers, and automated basement parking registered to prevent destructive construction strikes.
            </p>
            <div className="text-xs font-mono text-cyan-400 pt-2 flex items-center gap-1">
              <span>Subsurface Utility Registry</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>
      </section>

      {/* 4. CALL TO ACTION STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-display font-bold text-white">
              Ready to Explore India's 3D Cadastral Blueprint?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg">
              Launch the 3D GIS workspace to inspect parcels, explode building floors, highlight property volumes, and run validation.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('/map')}
              className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg transition-all"
            >
              Open 3D Map
            </button>
            <button
              onClick={() => onNavigate('/dashboard')}
              className="px-5 py-3 rounded-xl gis-glass hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium transition-all"
            >
              GIS Dashboard
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
