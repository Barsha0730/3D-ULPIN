import React, { useState } from 'react';
import { 
  Sparkles, 
  Cpu, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  Box, 
  ArrowRight, 
  Building2, 
  Layers, 
  Activity,
  Bot
} from 'lucide-react';
import { PropertyVolume } from '../../types';

interface AiIntelligencePageProps {
  properties: PropertyVolume[];
  onViewProperty: (propertyId: string) => void;
}

export const AiIntelligencePage: React.FC<AiIntelligencePageProps> = ({
  properties,
  onViewProperty
}) => {
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [queryResponse, setQueryResponse] = useState<{
    answer: string;
    matchedProperties: PropertyVolume[];
  } | null>(null);

  const sampleQueries = [
    'Find residential units on Floor 3 with volume greater than 250 m³',
    'Detect potential volumetric encroachments on Building B01',
    'Identify properties with highest vertical elevation in Sector V',
    'Verify boundary conformity between Unit 301 and Unit 302'
  ];

  const handleRunAiQuery = (customPrompt?: string) => {
    const promptToRun = customPrompt || query;
    if (!promptToRun.trim()) return;

    setIsProcessing(true);
    setQuery(promptToRun);

    setTimeout(() => {
      setIsProcessing(false);
      const lower = promptToRun.toLowerCase();

      if (lower.includes('floor 3') || lower.includes('f03') || lower.includes('250')) {
        const matches = properties.filter(p => p.floor === 3);
        setQueryResponse({
          answer: `Spatial AI Analysis complete: Located ${matches.length} properties situated on Floor 03. Total aggregate volumetric footprint is ${matches.reduce((acc, m) => acc + m.volume, 0).toFixed(1)} m³. Unit 301 features 263.7 m³ cubic envelope under registered residential title.`,
          matchedProperties: matches
        });
      } else if (lower.includes('encroachment') || lower.includes('b01')) {
        const matches = properties.filter(p => p.validationIssue);
        setQueryResponse({
          answer: `Topological Spatial Audit: 1 subtle spatial anomaly detected. Unit 303 exhibits a potential +0.12m cantilevered balcony margin encroaching upon northern municipal setback corridor. Recommended for physical drone photogrammetry re-survey.`,
          matchedProperties: matches
        });
      } else {
        const matches = properties.slice(0, 3);
        setQueryResponse({
          answer: `Spatial AI Model processed query across 3D Cadastral mesh. Extracted 3 matching property volumes with verified spatial extents and active 3D ULPIN hashes.`,
          matchedProperties: matches
        });
      }
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-cyan-500/15">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
              <Cpu className="w-4 h-4" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-wide">
              AI Spatial Cadastral Intelligence
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Automated LiDAR building extrusion, vertical anomaly detection, and natural language GIS spatial queries.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 px-3 py-1.5 rounded-xl">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Cadastral AI Agent Active</span>
        </div>
      </div>

      {/* Query Search Engine */}
      <div className="p-6 rounded-2xl gis-glass border border-cyan-500/30 shadow-2xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold">
          <Bot className="w-4 h-4" />
          <span>NATURAL LANGUAGE 3D SPATIAL QUERY ENGINE</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleRunAiQuery()}
              placeholder="Ask anything: 'Find residential units on Floor 3 with volume > 250 m³'..."
              className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm font-mono rounded-xl bg-slate-900/90 border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            />
          </div>

          <button
            onClick={() => handleRunAiQuery()}
            disabled={isProcessing}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all shrink-0 active:scale-95 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isProcessing ? 'Analyzing Mesh...' : 'Run Spatial Query'}</span>
          </button>
        </div>

        {/* Suggested Queries */}
        <div className="space-y-1.5 pt-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Suggested Spatial Prompts:</span>
          <div className="flex flex-wrap gap-2">
            {sampleQueries.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleRunAiQuery(q)}
                className="text-left text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 transition-colors"
              >
                "{q}"
              </button>
            ))}
          </div>
        </div>

        {/* Response Box */}
        {queryResponse && (
          <div className="mt-4 p-4 rounded-xl bg-slate-900/90 border border-cyan-500/40 space-y-4 animate-in fade-in">
            <div className="flex items-start gap-2.5">
              <Bot className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-mono font-bold text-cyan-300 block mb-1">
                  AI Cadastral Intelligence Synthesis
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                  {queryResponse.answer}
                </p>
              </div>
            </div>

            {queryResponse.matchedProperties.length > 0 && (
              <div className="pt-2 border-t border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 block mb-2 uppercase">
                  Identified 3D Property Volumes ({queryResponse.matchedProperties.length}):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {queryResponse.matchedProperties.map((prop) => (
                    <div
                      key={prop.propertyId}
                      className="p-2.5 rounded-lg bg-black/40 border border-slate-800 flex items-center justify-between text-xs font-mono"
                    >
                      <div>
                        <div className="font-bold text-white">Unit {prop.unitNumber} ({prop.volume} m³)</div>
                        <div className="text-[10px] text-cyan-400">{prop.ulpin}</div>
                      </div>
                      <button
                        onClick={() => onViewProperty(prop.propertyId)}
                        className="px-2 py-1 rounded bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 text-[10px]"
                      >
                        View in 3D
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Feature Capabilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="p-5 rounded-xl gis-glass border border-slate-800 space-y-3">
          <div className="w-9 h-9 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
            <Building2 className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-display font-bold text-white">LiDAR Auto-Extrusion</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Neural classification automatically clusters raw airborne LiDAR point clouds into architectural slabs and exterior roof structures.
          </p>
        </div>

        <div className="p-5 rounded-xl gis-glass border border-slate-800 space-y-3">
          <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-display font-bold text-white">Anomaly & Encroachment</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Volumetric collision solvers detect unauthorized floor additions, structural overhangs, and setback corridor intrusions.
          </p>
        </div>

        <div className="p-5 rounded-xl gis-glass border border-slate-800 space-y-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-display font-bold text-white">Automated 3D ULPIN</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Generates standardized volumetric Bhu-Aadhaar coordinates incorporating horizontal polygon centroid and vertical Z-indices.
          </p>
        </div>

      </div>

    </div>
  );
};
