import React from 'react';
import { 
  Info, 
  ShieldCheck, 
  Layers, 
  Box, 
  Map, 
  Cpu, 
  CheckCircle2, 
  AlertCircle,
  Building2,
  Compass,
  ArrowRight
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (route: string) => void;
  onRunDemo: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigate,
  onRunDemo
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-xs font-mono text-cyan-300">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <span>NATIONAL SMART CITY & GIS INNOVATION PROTOTYPE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
          About 3D ULPIN
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Pioneering next-generation vertical and subterranean land administration for India's high-density urban future.
        </p>
      </div>

      {/* Required Disclaimer Notice Card */}
      <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-amber-200/90 space-y-2 text-xs font-mono">
        <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>PROTOTYPE DISCLAIMER & DEMO DATA NOTICE</span>
        </div>
        <p className="leading-relaxed">
          <strong>DEMO DATA:</strong> All parcel geometries, ownership records, building heights, apartment values, and underground pipelines presented in this application are synthetic demo datasets curated exclusively for technical evaluation in national-level hackathons.
        </p>
        <p className="leading-relaxed">
          <strong>PROPOSED MVP 3D ULPIN FORMAT:</strong> The hierarchical spatial identifier format (e.g., <code>IN-WB-KOL-00125-B01-F03-U301</code>) represents an innovative engineering proposal extending the standard 2D Bhu-Aadhaar (ULPIN). It is not an officially adopted statutory standard by the Department of Land Resources (DoLR) or Survey of India.
        </p>
      </div>

      {/* The Core Challenge & The Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl gis-glass border border-slate-800 space-y-3">
          <div className="text-xs font-mono text-red-400 uppercase tracking-wider font-semibold">
            THE URBAN CHALLENGE
          </div>
          <h3 className="text-lg font-display font-bold text-white">
            Conventional 2D Land Records Fail in Vertical Cities
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Traditional cadastre records land exclusively as 2D flat polygons on the Earth's surface. When a 40-storey residential complex with 300 apartments is constructed on a single parcel, existing title registries cannot spatially differentiate vertically stacked properties, leading to title ambiguity, unverified air-rights, and mortgage risks.
          </p>
        </div>

        <div className="p-6 rounded-2xl gis-glass border border-cyan-500/30 space-y-3">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
            THE 3D ULPIN SOLUTION
          </div>
          <h3 className="text-lg font-display font-bold text-white">
            True 3D Volumetric Property Envelopes
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            3D ULPIN establishes mathematically rigorous 3D spatial boundaries (X, Y, and Z elevation extents). Each apartment, basement utility, and air stratum receives an individualized 3D Bhu-Aadhaar spatial hash, ensuring absolute legal clarity, zero topology overlaps, and comprehensive municipal tax coverage.
          </p>
        </div>
      </div>

      {/* The 3D ULPIN Syntax Anatomy */}
      <div className="p-6 rounded-2xl gis-glass border border-slate-800 space-y-4">
        <h3 className="text-base font-display font-bold text-white">
          Proposed 3D ULPIN Identifier Anatomy
        </h3>
        <p className="text-xs text-slate-400">
          How our proposed volumetric sequence extends the national standard:
        </p>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base font-bold text-white">
            <span className="px-2 py-1 rounded bg-blue-900/60 text-blue-300 border border-blue-500/30">IN</span>
            <span>-</span>
            <span className="px-2 py-1 rounded bg-blue-900/60 text-blue-300 border border-blue-500/30">WB-KOL</span>
            <span>-</span>
            <span className="px-2 py-1 rounded bg-cyan-900/60 text-cyan-300 border border-cyan-500/30">00125</span>
            <span>-</span>
            <span className="px-2 py-1 rounded bg-amber-900/60 text-amber-300 border border-amber-500/30">B01</span>
            <span>-</span>
            <span className="px-2 py-1 rounded bg-purple-900/60 text-purple-300 border border-purple-500/30">F03</span>
            <span>-</span>
            <span className="px-2 py-1 rounded bg-emerald-900/60 text-emerald-300 border border-emerald-500/30">U301</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-slate-400 pt-2 border-t border-slate-800">
            <div><strong className="text-blue-300">IN:</strong> Country Code (India)</div>
            <div><strong className="text-blue-300">WB-KOL:</strong> State & District (West Bengal, Kolkata)</div>
            <div><strong className="text-cyan-300">00125:</strong> 2D Parent Parcel (Bhu-Aadhaar)</div>
            <div><strong className="text-amber-300">B01:</strong> 3D Building Extrusion ID</div>
            <div><strong className="text-purple-300">F03:</strong> Vertical Floor Strata (Elevation Prism)</div>
            <div><strong className="text-emerald-300">U301:</strong> Registered Volumetric Unit Envelope</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-4 pt-4">
        <button
          onClick={() => onNavigate('/map')}
          className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg transition-all"
        >
          Explore 3D Map Workspace
        </button>
        <button
          onClick={onRunDemo}
          className="px-6 py-3 rounded-xl gis-glass hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium transition-all"
        >
          Run Complete Demo
        </button>
      </div>

    </div>
  );
};
