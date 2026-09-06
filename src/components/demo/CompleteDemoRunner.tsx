import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Sparkles, 
  Box, 
  Layers, 
  MapPin, 
  Building2, 
  ShieldCheck, 
  ArrowRight, 
  X,
  Play,
  RotateCcw
} from 'lucide-react';

interface CompleteDemoRunnerProps {
  isOpen: boolean;
  onClose: () => void;
  onStepChange: (step: number) => void;
  onComplete: () => void;
  onViewIn3D: (propertyId: string) => void;
}

interface DemoStep {
  step: number;
  title: string;
  subtitle: string;
  detail: string;
  badge: string;
}

const DEMO_STEPS: DemoStep[] = [
  {
    step: 1,
    title: 'Parcel Identified',
    subtitle: 'WB-KOL-00125 (Sector V Cyber Corridor)',
    detail: 'Ground cadastre polygon resolved at EPSG:4326. Base elevation +4.8m.',
    badge: 'STEP 1 / 6'
  },
  {
    step: 2,
    title: 'Building Extracted',
    subtitle: 'Cyber Vista Complex Tower A',
    detail: 'Volumetric extrusion at 15.2m height from classified LiDAR point cloud.',
    badge: 'STEP 2 / 6'
  },
  {
    step: 3,
    title: 'Floors Segmented',
    subtitle: '4 Vertical Strata Slabs (Ground to Floor 03)',
    detail: 'Vertical strata separated into architectural prisms with floor-to-ceiling heights.',
    badge: 'STEP 3 / 6'
  },
  {
    step: 4,
    title: 'Property Volumes Generated',
    subtitle: '12 Individual 3D Cadastral Units Delineated',
    detail: 'Spatial boundary envelopes calculated: X/Y/Z extents with 263.7 m³ volume.',
    badge: 'STEP 4 / 6'
  },
  {
    step: 5,
    title: '3D ULPIN Generated',
    subtitle: 'IN-WB-KOL-00125-B01-F03-U301',
    detail: 'Unique hierarchical Bhu-Aadhaar spatial code assigned to Unit 301.',
    badge: 'STEP 5 / 6'
  },
  {
    step: 6,
    title: 'Topology Validated',
    subtitle: 'Zero Cadastral Encroachment Verified',
    detail: 'Mesh intersection algorithm verifies non-overlapping vertical boundary walls.',
    badge: 'STEP 6 / 6'
  }
];

export const CompleteDemoRunner: React.FC<CompleteDemoRunnerProps> = ({
  isOpen,
  onClose,
  onStepChange,
  onComplete,
  onViewIn3D
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Auto-advance steps
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen && isRunning && currentStepIndex < DEMO_STEPS.length) {
      timer = setTimeout(() => {
        const nextStep = currentStepIndex + 1;
        onStepChange(nextStep);
        if (nextStep >= DEMO_STEPS.length) {
          setIsRunning(false);
          setIsCompleted(true);
          onComplete();
          // Trigger celebration confetti
          confetti({
            particleCount: 120,
            spread: 70,
            origin: { y: 0.6 }
          });
        } else {
          setCurrentStepIndex(nextStep);
        }
      }, 1600);
    }
    return () => clearTimeout(timer);
  }, [isOpen, isRunning, currentStepIndex, onStepChange, onComplete]);

  if (!isOpen) return null;

  const startDemo = () => {
    setCurrentStepIndex(0);
    setIsCompleted(false);
    setIsRunning(true);
    onStepChange(1);
  };

  const handleViewIn3D = () => {
    onViewIn3D('U301');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg">
      <div className="w-full max-w-xl gis-glass border border-cyan-500/40 rounded-2xl p-6 text-slate-100 shadow-2xl relative overflow-hidden" id="complete-demo-runner-modal">
        
        {/* Glowing Background Radial */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/30 border border-amber-500/40 flex items-center justify-center text-amber-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">
                Complete 3D Cadastral Lifecycle Demo
              </h3>
              <p className="text-xs font-mono text-cyan-400">
                Automated 2D Parcel to 3D Property Volume Pipeline
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Not Started State */}
        {!isRunning && !isCompleted && (
          <div className="py-6 space-y-6 text-center">
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              Experience the complete automated transformation from a traditional 2D land record polygon into validated 3D property volumes with registered 3D ULPIN.
            </p>

            <div className="grid grid-cols-3 gap-2 text-left text-xs font-mono">
              <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800">
                <span className="text-cyan-400 font-bold block">2D BOUNDARY</span>
                <span className="text-slate-400 text-[11px]">Parcel Polygon</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800">
                <span className="text-amber-400 font-bold block">3D EXTRUSION</span>
                <span className="text-slate-400 text-[11px]">Strata Slabs</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800">
                <span className="text-emerald-400 font-bold block">3D ULPIN</span>
                <span className="text-slate-400 text-[11px]">Verified Rights</span>
              </div>
            </div>

            <button
              onClick={startDemo}
              className="py-3 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 mx-auto transition-all active:scale-95"
              id="start-demo-action-btn"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>START COMPLETE 6-STEP DEMO</span>
            </button>
          </div>
        )}

        {/* Running Steps Progression */}
        {isRunning && (
          <div className="py-5 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-cyan-400 pb-1">
              <span>EXECUTING STEP {currentStepIndex + 1} OF 6</span>
              <span className="animate-pulse font-bold">PROCESSING PIPELINE...</span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-700"
                style={{ width: `${((currentStepIndex + 1) / 6) * 100}%` }}
              />
            </div>

            {/* Step list cards */}
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {DEMO_STEPS.map((st, idx) => {
                const isPassed = idx < currentStepIndex;
                const isCurrent = idx === currentStepIndex;
                return (
                  <div
                    key={st.step}
                    className={`p-3 rounded-xl border transition-all ${
                      isCurrent
                        ? 'bg-cyan-500/15 border-cyan-400 shadow-lg shadow-cyan-950 text-white'
                        : isPassed
                          ? 'bg-slate-900/60 border-emerald-500/40 text-slate-300 opacity-80'
                          : 'bg-slate-900/30 border-slate-800 text-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {isPassed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : isCurrent ? (
                          <span className="w-4 h-4 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin shrink-0" />
                        ) : (
                          <span className="w-4 h-4 rounded-full border border-slate-700 text-[10px] font-mono flex items-center justify-center shrink-0">
                            {st.step}
                          </span>
                        )}
                        <span className="font-semibold text-xs font-mono">{st.title}</span>
                      </div>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                        {isPassed ? '✓ Done' : isCurrent ? 'Active' : 'Queued'}
                      </span>
                    </div>
                    {(isCurrent || isPassed) && (
                      <p className="text-[11px] text-slate-300 mt-1 pl-6">
                        {st.subtitle} — <span className="text-slate-400">{st.detail}</span>
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Completed Celebration Screen */}
        {isCompleted && (
          <div className="py-4 space-y-5 text-center" id="demo-completed-registered-screen">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center mx-auto shadow-xl shadow-emerald-950/60">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <div className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                3D CADASTRAL REGISTRATION COMPLETE
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white mt-1">
                3D PROPERTY SUCCESSFULLY REGISTERED
              </h2>
            </div>

            {/* Generated ULPIN Display Box */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-400/50 text-left space-y-2">
              <span className="text-[10px] font-mono text-cyan-400 block font-semibold">
                ASSIGNED 3D ULPIN
              </span>
              <div className="font-mono text-sm sm:text-base font-extrabold text-white bg-black/60 p-2.5 rounded-lg border border-slate-800 break-all select-all">
                IN-WB-KOL-00125-B01-F03-U301
              </div>
              <div className="grid grid-cols-3 gap-2 text-[11px] font-mono text-slate-400 pt-1">
                <div>Parcel: <span className="text-slate-200">WB-KOL-00125</span></div>
                <div>Building: <span className="text-slate-200">B01</span></div>
                <div>Volume: <span className="text-cyan-300">263.7 m³</span></div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={startDemo}
                className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Rerun Demo</span>
              </button>

              <button
                onClick={handleViewIn3D}
                className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all active:scale-95"
                id="demo-view-in-3d-btn"
              >
                <Box className="w-4 h-4" />
                <span>View in 3D (Focus Unit 301)</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
