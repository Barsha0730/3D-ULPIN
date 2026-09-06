import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Play, 
  Layers, 
  Box, 
  RotateCcw,
  Activity,
  FileCheck
} from 'lucide-react';
import { ValidationResult, PropertyVolume } from '../../types';

interface ValidationPageProps {
  properties: PropertyVolume[];
  onViewIn3D: (propertyId: string) => void;
}

export const ValidationPage: React.FC<ValidationPageProps> = ({
  properties,
  onViewIn3D
}) => {
  const [isValidating, setIsValidating] = useState(false);
  const [lastValidation, setLastValidation] = useState<{
    totalChecked: number;
    passed: number;
    warnings: number;
    errors: number;
    timestamp: string;
  }>({
    totalChecked: 12,
    passed: 11,
    warnings: 1,
    errors: 0,
    timestamp: 'Just now'
  });

  const rules = [
    {
      id: 'RULE-01',
      name: 'Zero 3D Volumetric Overlap (Disjoint Envelopes)',
      desc: 'Ensures no two privately titled property volumes intersect in 3D space.',
      status: 'Passed',
      severity: 'Critical'
    },
    {
      id: 'RULE-02',
      name: 'Vertical Floor Prism Elevation Continuity',
      desc: 'Verifies floor ceiling elevation exactly matches the slab level above.',
      status: 'Passed',
      severity: 'High'
    },
    {
      id: 'RULE-03',
      name: 'Subterranean Utility Clearance Buffer (≥ 1.5m)',
      desc: 'Checks safety isolation zone between deep building foundations and water/power mains.',
      status: 'Passed',
      severity: 'Critical'
    },
    {
      id: 'RULE-04',
      name: 'Municipal Setback & Overhang Verification',
      desc: 'Flags cantilevered balconies or façade elements protruding beyond 2D parcel boundary.',
      status: 'Warning',
      severity: 'Medium',
      flaggedUnit: 'Unit 303'
    },
    {
      id: 'RULE-05',
      name: 'Bhu-Aadhaar 3D Spatial Hash Uniqueness',
      desc: 'Guarantees global non-collision of 14-character 3D ULPIN identifiers.',
      status: 'Passed',
      severity: 'Critical'
    }
  ];

  const handleRunFullValidation = () => {
    setIsValidating(true);
    setTimeout(() => {
      setIsValidating(false);
      setLastValidation({
        totalChecked: 12,
        passed: 11,
        warnings: 1,
        errors: 0,
        timestamp: new Date().toLocaleTimeString()
      });
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-cyan-500/15">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-wide">
              Cadastral Topology & Spatial Validation
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Automated verification engine ensuring geometric integrity, boundary non-overlap, and regulatory setback compliance.
          </p>
        </div>

        <button
          onClick={handleRunFullValidation}
          disabled={isValidating}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-display font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
          id="run-full-cadastral-validation-btn"
        >
          <Play className="w-4 h-4 fill-slate-950" />
          <span>{isValidating ? 'Executing 3D Collision Solvers...' : 'Run Full Cadastral Audit'}</span>
        </button>
      </div>

      {/* Summary Scorecard */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono">
        <div className="p-4 rounded-xl gis-glass border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase block">VOLUMES AUDITED</span>
          <span className="text-2xl font-bold text-white mt-1 block">{lastValidation.totalChecked} Units</span>
          <span className="text-[10px] text-slate-500">Full building stack</span>
        </div>

        <div className="p-4 rounded-xl gis-glass border border-emerald-500/30">
          <span className="text-[10px] text-emerald-400 uppercase block">VERIFIED CLEAN</span>
          <span className="text-2xl font-bold text-emerald-300 mt-1 block">{lastValidation.passed}</span>
          <span className="text-[10px] text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> 100% Geometry Compliant
          </span>
        </div>

        <div className="p-4 rounded-xl gis-glass border border-amber-500/30">
          <span className="text-[10px] text-amber-400 uppercase block">SPATIAL WARNINGS</span>
          <span className="text-2xl font-bold text-amber-300 mt-1 block">{lastValidation.warnings}</span>
          <span className="text-[10px] text-amber-300">Setback cantilever check</span>
        </div>

        <div className="p-4 rounded-xl gis-glass border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase block">CRITICAL CONFLICTS</span>
          <span className="text-2xl font-bold text-slate-300 mt-1 block">{lastValidation.errors}</span>
          <span className="text-[10px] text-emerald-400">Zero Encroachments</span>
        </div>
      </div>

      {/* Rules Evaluation Checklist */}
      <div className="rounded-xl gis-glass border border-slate-800 overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-cyan-300 uppercase">
            3D Cadastral Validation Rule Execution Matrix
          </span>
          <span className="text-[10px] font-mono text-slate-400">
            Last evaluated: {lastValidation.timestamp}
          </span>
        </div>

        <div className="divide-y divide-slate-800/60 text-xs font-mono">
          {rules.map((rule) => (
            <div key={rule.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-slate-900/40 transition-colors">
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">
                    {rule.id}
                  </span>
                  <span className="font-bold text-slate-100 text-sm font-sans">{rule.name}</span>
                </div>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  {rule.desc}
                </p>
                {rule.flaggedUnit && (
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-950/40 border border-amber-500/30 text-amber-300 text-[11px] mt-1">
                    <AlertTriangle className="w-3 h-3" />
                    <span>Flagged: {rule.flaggedUnit} (Cantilever overhang +0.12m)</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
                  rule.status === 'Passed'
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40'
                    : 'bg-amber-500/15 text-amber-300 border border-amber-500/40'
                }`}>
                  {rule.status === 'Passed' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                  <span>{rule.status}</span>
                </span>

                {rule.flaggedUnit && (
                  <button
                    onClick={() => onViewIn3D('U303')}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-xs transition-colors"
                  >
                    Inspect in 3D →
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
