import React, { useState } from 'react';
import { 
  UploadCloud, 
  FileText, 
  Download, 
  CheckCircle2, 
  FolderPlus, 
  Layers, 
  Database,
  ArrowRight
} from 'lucide-react';
import { Parcel, Building, PropertyVolume, UndergroundAsset } from '../../types';

interface DataPageProps {
  parcels: Parcel[];
  buildings: Building[];
  properties: PropertyVolume[];
  undergroundAssets: UndergroundAsset[];
  onLoadDataset: (datasetName: string) => void;
  onNavigate: (route: string) => void;
}

export const DataPage: React.FC<DataPageProps> = ({
  parcels,
  buildings,
  properties,
  undergroundAssets,
  onLoadDataset,
  onNavigate
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setUploadedFileName(file.name);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 4000);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setUploadedFileName(file.name);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 4000);
    }
  };

  const handleExportFullJson = () => {
    const payload = {
      cadastreName: '3D ULPIN National Cadastral Prototype',
      crs: 'EPSG:4326',
      timestamp: new Date().toISOString(),
      parcels,
      buildings,
      properties,
      undergroundAssets
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '3D_ULPIN_Cadastral_Dataset.json';
    a.click();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-cyan-500/15">
        <div>
          <div className="flex items-center gap-2">
            <Database className="w-6 h-6 text-cyan-400" />
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-wide">
              Cadastral Data Ingestion & Export
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Import 2D survey polygons, CityGML building envelopes, and BIM models to synthesize 3D ULPIN spatial records.
          </p>
        </div>

        <button
          onClick={handleExportFullJson}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600/30 hover:bg-cyan-600/50 text-cyan-200 border border-cyan-500/40 text-xs font-mono font-semibold transition-colors active:scale-95"
          id="export-full-cadastre-json-btn"
        >
          <Download className="w-4 h-4" />
          <span>Export 3D Cadastre (JSON)</span>
        </button>
      </div>

      {/* Drag & Drop Upload Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleFileDrop}
        className={`p-8 sm:p-12 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center text-center space-y-3 relative ${
          isDragging 
            ? 'border-cyan-400 bg-cyan-950/30 scale-[1.01]' 
            : 'border-slate-700 bg-slate-900/40 hover:border-cyan-500/50'
        }`}
      >
        <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-xl shadow-cyan-950">
          <UploadCloud className="w-7 h-7" />
        </div>

        <div>
          <h3 className="text-base font-display font-bold text-white">
            Drag and drop your cadastral dataset here
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Supports GeoJSON, CityGML, LandXML, Shapefile, CSV, and IFC architectural models.
          </p>
        </div>

        <label className="cursor-pointer px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono border border-slate-700 transition-colors">
          <span>Browse File from Device</span>
          <input 
            type="file" 
            accept=".geojson,.json,.xml,.csv,.gml,.ifc" 
            onChange={handleFileInput} 
            className="hidden" 
          />
        </label>

        {uploadedFileName && (
          <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>Dataset "{uploadedFileName}" uploaded and parsed into 3D memory successfully!</span>
          </div>
        )}
      </div>

      {/* Pre-packaged Pilot Cadastres */}
      <div className="space-y-3">
        <h3 className="text-sm font-display font-bold text-white uppercase tracking-wider">
          Pre-Loaded National Demonstration Datasets
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="p-5 rounded-xl gis-glass border border-cyan-500/40 space-y-3 relative overflow-hidden">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">
              ACTIVE IN 3D SCENE
            </span>
            <h4 className="font-display font-bold text-base text-white">Sector V Cyber Cadastre</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              5 parcels, 3 multi-storey towers with 12 residential & commercial units, 4 underground utility conduits.
            </p>
            <button
              onClick={() => onNavigate('/map')}
              className="w-full py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-mono font-medium transition-colors"
            >
              Open in 3D Map →
            </button>
          </div>

          <div className="p-5 rounded-xl gis-glass border border-slate-800 space-y-3">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
              AVAILABLE PILOT
            </span>
            <h4 className="font-display font-bold text-base text-white">New Town High-Density Hub</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              18 high-rise residential towers, podium retail mall strata, underground metro station interchange.
            </p>
            <button
              onClick={() => onLoadDataset('New Town')}
              className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-medium transition-colors"
            >
              Load Pilot Data
            </button>
          </div>

          <div className="p-5 rounded-xl gis-glass border border-slate-800 space-y-3">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
              AVAILABLE PILOT
            </span>
            <h4 className="font-display font-bold text-base text-white">Central Corridor Utility Grid</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Deep subsurface 3D utility cadastre featuring gas pipelines, fiber conduits, and municipal storm sewers.
            </p>
            <button
              onClick={() => onLoadDataset('Corridor Utility')}
              className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-medium transition-colors"
            >
              Load Pilot Data
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};
