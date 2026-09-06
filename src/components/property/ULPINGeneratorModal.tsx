import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Copy, 
  Check, 
  Box, 
  AlertCircle, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { api } from '../../lib/api/apiService';
import { PropertyVolume } from '../../types';

interface ULPINGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewPropertyInMap: (propertyId: string) => void;
}

export const ULPINGeneratorModal: React.FC<ULPINGeneratorModalProps> = ({
  isOpen,
  onClose,
  onViewPropertyInMap
}) => {
  const [parcelId, setParcelId] = useState('WB-KOL-00125');
  const [buildingId, setBuildingId] = useState('B01');
  const [floor, setFloor] = useState('03');
  const [unit, setUnit] = useState('301');
  const [propertyType, setPropertyType] = useState('Residential');

  const [generatedUlpin, setGeneratedUlpin] = useState<string | null>(null);
  const [createdProperty, setCreatedProperty] = useState<PropertyVolume | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await api.generateUlpin({
        parcelId,
        buildingId,
        floor,
        unit,
        propertyType
      });
      setGeneratedUlpin(result.ulpin);
      setCreatedProperty(result.property);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (generatedUlpin) {
      navigator.clipboard.writeText(generatedUlpin);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleView = () => {
    if (createdProperty) {
      onViewPropertyInMap(createdProperty.propertyId);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div className="w-full max-w-lg gis-glass border border-cyan-500/40 rounded-2xl p-6 text-slate-100 shadow-2xl relative overflow-hidden" id="ulpin-generator-modal">
        
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">
                Generate 3D ULPIN
              </h3>
              <p className="text-xs font-mono text-cyan-400">
                Volumetric Spatial Identity Engine
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Generator Form */}
        <form onSubmit={handleGenerate} className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-mono text-slate-400 mb-1">Parcel ID</label>
              <input
                type="text"
                value={parcelId}
                onChange={(e) => setParcelId(e.target.value)}
                placeholder="WB-KOL-00125"
                required
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 font-mono focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-mono text-slate-400 mb-1">Building ID</label>
              <input
                type="text"
                value={buildingId}
                onChange={(e) => setBuildingId(e.target.value)}
                placeholder="B01"
                required
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 font-mono focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block font-mono text-slate-400 mb-1">Floor (00-99)</label>
              <input
                type="text"
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
                placeholder="03"
                required
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 font-mono focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-mono text-slate-400 mb-1">Property Unit</label>
              <input
                type="text"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="301"
                required
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 font-mono focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-mono text-slate-400 mb-1">Type</label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 font-mono focus:border-cyan-400 focus:outline-none"
              >
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Utility">Utility</option>
                <option value="Mixed Use">Mixed Use</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-900/40 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            id="modal-generate-ulpin-submit-btn"
          >
            <Sparkles className="w-4 h-4" />
            <span>{loading ? 'Calculating Spatial Hash...' : 'Generate 3D ULPIN'}</span>
          </button>
        </form>

        {/* Result Card */}
        {generatedUlpin && (
          <div className="mt-5 p-4 rounded-xl bg-slate-900/90 border border-cyan-500/50 space-y-3">
            <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400">
              <span className="font-bold uppercase tracking-wider">Generated 3D ULPIN</span>
              <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300">✓ Unique Spatial Hash</span>
            </div>

            <div className="font-mono text-sm sm:text-base font-extrabold text-white p-2.5 rounded-lg bg-black/50 border border-slate-800 break-all select-all">
              {generatedUlpin}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex-1 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy ULPIN'}</span>
              </button>

              <button
                onClick={handleView}
                className="flex-1 py-2 px-3 rounded-lg bg-cyan-600/30 hover:bg-cyan-600/50 border border-cyan-500/50 text-cyan-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Box className="w-3.5 h-3.5" />
                <span>View Property in 3D</span>
              </button>
            </div>
          </div>
        )}

        {/* Required Disclaimer Notice */}
        <div className="mt-4 p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-200/90 flex items-start gap-2 text-[11px] font-mono leading-relaxed">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="block text-amber-300">Proposed MVP 3D ULPIN Format</strong>
            This 14-character spatial sequence is a prototype demonstration schema extending the National Bhu-Aadhaar (ULPIN) for vertical and subterranean volumes. It is not an officially gazetted government standard.
          </div>
        </div>
      </div>
    </div>
  );
};
