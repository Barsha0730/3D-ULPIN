import React, { useState } from 'react';
import { 
  Building, 
  FloorData, 
  Parcel, 
  PropertyVolume, 
  UndergroundAsset 
} from '../../types';
import { 
  Box, 
  Building2, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ArrowRight, 
  Layers, 
  Maximize2, 
  FileText, 
  Copy, 
  Check, 
  Compass, 
  ChevronRight, 
  X, 
  Eye, 
  Activity, 
  ShieldCheck,
  Zap,
  Tag
} from 'lucide-react';

interface PropertyPanelProps {
  selectedParcel: Parcel | null;
  selectedBuilding: Building | null;
  selectedFloor: FloorData | null;
  selectedProperty: PropertyVolume | null;
  selectedInfrastructure: UndergroundAsset | null;
  explodedFloors: boolean;
  onToggleExplodeFloors: () => void;
  onSelectFloor: (floorNumber: number) => void;
  onSelectProperty: (propertyId: string) => void;
  onValidateProperty: (property: PropertyVolume) => void;
  onOpenRecord: (property: PropertyVolume) => void;
  onClose: () => void;
}

export const PropertyPanel: React.FC<PropertyPanelProps> = ({
  selectedParcel,
  selectedBuilding,
  selectedFloor,
  selectedProperty,
  selectedInfrastructure,
  explodedFloors,
  onToggleExplodeFloors,
  onSelectFloor,
  onSelectProperty,
  onValidateProperty,
  onOpenRecord,
  onClose
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'spatial' | 'rights'>('overview');

  const handleCopyUlpin = (ulpin: string) => {
    navigator.clipboard.writeText(ulpin);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Case 1: Underground Asset Selected
  if (selectedInfrastructure) {
    return (
      <div className="w-full sm:w-80 bg-[#0f172a]/70 border-l border-slate-800 flex flex-col z-40 backdrop-blur-sm overflow-y-auto max-h-[calc(100vh-140px)] select-none text-slate-200 shadow-2xl" id="selected-infrastructure-panel">
        <div className="p-4 border-b border-slate-800 bg-slate-900/40">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded-full font-bold uppercase">
              Subsurface Asset
            </span>
            <button onClick={onClose} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
          <h2 className="text-lg font-bold text-white mb-1">{selectedInfrastructure.type}</h2>
          <p className="text-[10px] font-mono text-cyan-400 bg-cyan-950/30 px-2 py-1 rounded inline-block border border-cyan-500/30">
            {selectedInfrastructure.infrastructureId}
          </p>
        </div>

        <div className="flex-1 p-4 space-y-5">
          <section>
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
              Spatial Geometry
            </h3>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 bg-slate-800/40 rounded-lg border border-slate-700/50">
                <p className="text-[9px] text-slate-500 uppercase">Subsurface Depth</p>
                <p className="text-sm font-bold text-amber-400">-{selectedInfrastructure.depth} m</p>
              </div>
              <div className="p-3 bg-slate-800/40 rounded-lg border border-slate-700/50">
                <p className="text-[9px] text-slate-500 uppercase">Total Length</p>
                <p className="text-sm font-bold text-white">{selectedInfrastructure.length} m</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
              Technical Specifications
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400">Diameter / Spec</span>
                <span className="text-white font-mono">{selectedInfrastructure.diameter || selectedInfrastructure.capacity}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400">Material</span>
                <span className="text-white">{selectedInfrastructure.material}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400">Installation Year</span>
                <span className="text-white font-mono">{selectedInfrastructure.installationYear}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400">Registration Rights</span>
                <span className="text-emerald-400 font-mono text-[11px]">Section 14 Stratum</span>
              </div>
            </div>
          </section>

          <div className="p-3.5 bg-cyan-950/20 border border-cyan-500/20 rounded-xl">
            <h4 className="text-[11px] font-bold text-cyan-400 mb-1 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5" /> Subsurface Stratum Certificate
            </h4>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Subsurface utility stratum registered in municipal 3D GIS registry with vertical buffer envelope.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Case 2: Specific Property Volume Selected
  if (selectedProperty) {
    return (
      <div className="w-full sm:w-80 bg-[#0f172a]/70 border-l border-slate-800 flex flex-col z-40 backdrop-blur-sm overflow-y-auto max-h-[calc(100vh-140px)] select-none text-slate-200 shadow-2xl" id="selected-property-panel">
        
        {/* High Density Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/40">
          <div className="flex items-center justify-between mb-1">
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
              selectedProperty.status === 'Disputed' 
                ? 'bg-amber-500/20 text-amber-400' 
                : 'bg-green-500/20 text-green-400'
            }`}>
              {selectedProperty.status}
            </span>
            <button onClick={onClose} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
          <h2 className="text-lg font-bold text-white mb-1">PROPERTY UNIT {selectedProperty.unitNumber}</h2>
          <div className="flex items-center justify-between gap-2 bg-cyan-950/30 px-2 py-1 rounded border border-cyan-500/30">
            <span className="text-[10px] font-mono text-cyan-400 break-all">{selectedProperty.ulpin}</span>
            <button
              onClick={() => handleCopyUlpin(selectedProperty.ulpin)}
              className="text-slate-400 hover:text-cyan-300 transition-colors shrink-0"
              title="Copy 3D ULPIN"
              id="copy-ulpin-btn"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 p-4 space-y-5">
          {/* Spatial Geometry */}
          <section>
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
              Spatial Geometry
            </h3>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 bg-slate-800/40 rounded-lg border border-slate-700/50">
                <p className="text-[9px] text-slate-500 uppercase">Total Area</p>
                <p className="text-sm font-bold text-white">{selectedProperty.area} m²</p>
              </div>
              <div className="p-3 bg-slate-800/40 rounded-lg border border-slate-700/50">
                <p className="text-[9px] text-slate-500 uppercase">Volumetric Size</p>
                <p className="text-sm font-bold text-white">{selectedProperty.volume} m³</p>
              </div>
              <div className="p-3 bg-slate-800/40 rounded-lg border border-slate-700/50">
                <p className="text-[9px] text-slate-500 uppercase">Height Prism</p>
                <p className="text-sm font-bold text-amber-400">{selectedProperty.dimensions.height} m</p>
              </div>
              <div className="p-3 bg-slate-800/40 rounded-lg border border-slate-700/50">
                <p className="text-[9px] text-slate-500 uppercase">Elevation Span</p>
                <p className="text-xs font-bold text-cyan-400 font-mono mt-0.5">{selectedProperty.verticalRange}</p>
              </div>
            </div>
          </section>

          {/* Cadastral Relationships */}
          <section>
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
              Cadastral Relationships
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400">Parcel ID</span>
                <span className="text-white font-mono">{selectedProperty.parcelId}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400">Building Unit</span>
                <span className="text-white font-mono">{selectedProperty.buildingId}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400">Floor Level</span>
                <span className="text-white">{selectedProperty.floor} ({selectedProperty.floorName})</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400">Owner</span>
                <span className="text-white font-medium">{selectedProperty.ownerName}</span>
              </div>
            </div>
          </section>

          {/* AI Delineation Report */}
          <div className="p-3.5 bg-cyan-950/20 border border-cyan-500/20 rounded-xl">
            <h4 className="text-[11px] font-bold text-cyan-400 mb-1 flex items-center gap-2">
              <Activity className="w-3.5 h-3.5" /> AI Delineation Report
            </h4>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              3D geometry successfully generated from Point Cloud & strata plan data. 
              {selectedProperty.validationIssue ? (
                <span className="text-amber-300 font-semibold block mt-1">
                  Alert: {selectedProperty.validationIssue.title} ({selectedProperty.validationIssue.spatialDelta})
                </span>
              ) : (
                ' Validated without volumetric overlap against adjacent cadastral parcels.'
              )}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 mt-auto pt-2 border-t border-slate-800">
            <button
              onClick={() => onToggleExplodeFloors()}
              className="py-2 bg-slate-800 rounded border border-slate-700 text-[10px] font-bold uppercase hover:bg-slate-700 text-slate-300 transition-colors"
              id="panel-view-volume-btn"
            >
              {explodedFloors ? 'Collapse' : 'Explode 3D'}
            </button>
            <button
              onClick={() => onValidateProperty(selectedProperty)}
              className="py-2 bg-slate-800 rounded border border-slate-700 text-[10px] font-bold uppercase hover:bg-slate-700 text-slate-300 transition-colors"
              id="panel-validate-btn"
            >
              Validate
            </button>
            <button
              onClick={() => onOpenRecord(selectedProperty)}
              className="col-span-2 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded text-[10px] font-bold uppercase text-white shadow-lg shadow-cyan-900/20 hover:from-cyan-500 hover:to-blue-500 transition-all active:scale-95"
              id="panel-property-record-btn"
            >
              Export Digital Record
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Case 3: Floor Selected
  if (selectedFloor && selectedBuilding) {
    return (
      <div className="w-full sm:w-80 bg-[#0f172a]/70 border-l border-slate-800 flex flex-col z-40 backdrop-blur-sm overflow-y-auto max-h-[calc(100vh-140px)] select-none text-slate-200 shadow-2xl" id="selected-floor-panel">
        <div className="p-4 border-b border-slate-800 bg-slate-900/40">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded-full font-bold uppercase">
              Floor Stratum
            </span>
            <button onClick={onClose} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
          <h2 className="text-lg font-bold text-white mb-1">FLOOR {selectedFloor.floorCode}</h2>
          <p className="text-[10px] font-mono text-cyan-400 bg-cyan-950/30 px-2 py-1 rounded inline-block border border-cyan-500/30">
            {selectedBuilding.buildingId} • {selectedFloor.heightRange}
          </p>
        </div>

        <div className="flex-1 p-4 space-y-5">
          <section>
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
              Spatial Geometry
            </h3>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 bg-slate-800/40 rounded-lg border border-slate-700/50">
                <p className="text-[9px] text-slate-500 uppercase">Strata Area</p>
                <p className="text-sm font-bold text-white">{selectedFloor.area} m²</p>
              </div>
              <div className="p-3 bg-slate-800/40 rounded-lg border border-slate-700/50">
                <p className="text-[9px] text-slate-500 uppercase">Units Count</p>
                <p className="text-sm font-bold text-cyan-400">{selectedFloor.propertyCount} Units</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
              Floor Units
            </h3>
            <div className="space-y-1.5">
              {selectedFloor.unitIds.map((uId) => {
                const unitNum = uId.replace(/^.*U/, '');
                return (
                  <div
                    key={uId}
                    onClick={() => onSelectProperty(uId)}
                    className="p-2.5 rounded bg-slate-800/40 border border-slate-700/50 hover:border-cyan-500/50 hover:bg-cyan-950/30 cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Box className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="text-xs font-mono font-medium text-slate-200">Unit {unitNum}</span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400 flex items-center gap-1 uppercase font-semibold">
                      Inspect <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          <button
            onClick={onToggleExplodeFloors}
            className="w-full py-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded text-[10px] font-bold uppercase text-white shadow-lg shadow-cyan-900/20 transition-all active:scale-95"
          >
            {explodedFloors ? 'Collapse Slabs' : 'Explode All Floors Vertically'}
          </button>
        </div>
      </div>
    );
  }

  // Case 4: Building Selected
  if (selectedBuilding) {
    return (
      <div className="w-full sm:w-80 bg-[#0f172a]/70 border-l border-slate-800 flex flex-col z-40 backdrop-blur-sm overflow-y-auto max-h-[calc(100vh-140px)] select-none text-slate-200 shadow-2xl" id="selected-building-panel">
        <div className="p-4 border-b border-slate-800 bg-slate-900/40">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] px-2 py-0.5 bg-cyan-500/20 text-cyan-400 rounded-full font-bold uppercase">
              Building Volume
            </span>
            <button onClick={onClose} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
          <h2 className="text-lg font-bold text-white mb-1">{selectedBuilding.name}</h2>
          <p className="text-[10px] font-mono text-cyan-400 bg-cyan-950/30 px-2 py-1 rounded inline-block border border-cyan-500/30">
            {selectedBuilding.buildingId} • Parcel {selectedBuilding.parcelId}
          </p>
        </div>

        <div className="flex-1 p-4 space-y-5">
          <section>
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
              Spatial Geometry
            </h3>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 bg-slate-800/40 rounded-lg border border-slate-700/50">
                <p className="text-[9px] text-slate-500 uppercase">Total Height</p>
                <p className="text-sm font-bold text-amber-400">{selectedBuilding.height} m</p>
              </div>
              <div className="p-3 bg-slate-800/40 rounded-lg border border-slate-700/50">
                <p className="text-[9px] text-slate-500 uppercase">Built-Up Area</p>
                <p className="text-sm font-bold text-white">{selectedBuilding.builtUpArea} m²</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
              Cadastral Details
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400">Total Floors</span>
                <span className="text-white font-mono font-bold">{selectedBuilding.floorCount}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400">Properties Delineated</span>
                <span className="text-white font-mono font-bold">{selectedBuilding.propertyCount} Units</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400">Occupancy Type</span>
                <span className="text-white">{selectedBuilding.occupancyType}</span>
              </div>
            </div>
          </section>

          {/* Floor selection grid */}
          <section>
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
              Vertical Strata Prisms
            </h3>
            <div className="grid grid-cols-2 gap-1.5">
              {selectedBuilding.floors.map((fl) => (
                <button
                  key={fl.floorId}
                  onClick={() => onSelectFloor(fl.floorNumber)}
                  className="p-2 rounded bg-slate-800/40 border border-slate-700/50 hover:border-cyan-500/60 text-left transition-colors text-xs font-mono group"
                >
                  <div className="text-cyan-400 font-semibold group-hover:text-cyan-300">{fl.name}</div>
                  <div className="text-[10px] text-slate-500">{fl.heightRange}</div>
                </button>
              ))}
            </div>
          </section>

          <button
            onClick={onToggleExplodeFloors}
            className="w-full py-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded text-[10px] font-bold uppercase text-white shadow-lg shadow-cyan-900/20 transition-all active:scale-95 flex items-center justify-center gap-2"
            id="explore-floors-btn"
          >
            <Box className="w-3.5 h-3.5" />
            <span>{explodedFloors ? 'Collapse Building' : 'Explode Floors (3D View)'}</span>
          </button>
        </div>
      </div>
    );
  }

  // Case 5: Parcel Selected
  if (selectedParcel) {
    return (
      <div className="w-full sm:w-80 bg-[#0f172a]/70 border-l border-slate-800 flex flex-col z-40 backdrop-blur-sm overflow-y-auto max-h-[calc(100vh-140px)] select-none text-slate-200 shadow-2xl" id="selected-parcel-panel">
        <div className="p-4 border-b border-slate-800 bg-slate-900/40">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] px-2 py-0.5 bg-cyan-500/20 text-cyan-400 rounded-full font-bold uppercase">
              Cadastral Parcel
            </span>
            <button onClick={onClose} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
          <h2 className="text-lg font-bold text-white mb-1">{selectedParcel.name}</h2>
          <p className="text-[10px] font-mono text-cyan-400 bg-cyan-950/30 px-2 py-1 rounded inline-block border border-cyan-500/30">
            {selectedParcel.parcelId} • {selectedParcel.administrativeArea}
          </p>
        </div>

        <div className="flex-1 p-4 space-y-5">
          <section>
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
              Spatial Geometry
            </h3>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 bg-slate-800/40 rounded-lg border border-slate-700/50">
                <p className="text-[9px] text-slate-500 uppercase">Land Area</p>
                <p className="text-sm font-bold text-white">{selectedParcel.area} m²</p>
              </div>
              <div className="p-3 bg-slate-800/40 rounded-lg border border-slate-700/50">
                <p className="text-[9px] text-slate-500 uppercase">Surface Datum</p>
                <p className="text-sm font-bold text-amber-400">+{selectedParcel.zElevation} m</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
              Cadastral Attributes
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400">Ward</span>
                <span className="text-white font-mono">{selectedParcel.ward}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400">PIN Code</span>
                <span className="text-white font-mono">{selectedParcel.pinCode}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400">Registered Buildings</span>
                <span className="text-cyan-400 font-mono font-bold">{selectedParcel.buildingIds.length}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400">Status</span>
                <span className="text-emerald-400 font-mono font-medium">{selectedParcel.status}</span>
              </div>
            </div>
          </section>

          <div className="p-3.5 bg-cyan-950/20 border border-cyan-500/20 rounded-xl">
            <h4 className="text-[11px] font-bold text-cyan-400 mb-1 flex items-center gap-2">
              <Compass className="w-3.5 h-3.5" /> 2D Cadastral Polygon
            </h4>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Base 2D spatial cadastral footprint registered in WGS84 and ready for volumetric stratification.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Default: Nothing Selected
  return (
    <div className="w-full sm:w-80 bg-[#0f172a]/70 border-l border-slate-800 flex flex-col z-40 backdrop-blur-sm p-4 text-slate-300 shadow-xl select-none" id="empty-selection-panel">
      <div className="p-4 border-b border-slate-800 bg-slate-900/40 rounded-lg mb-4">
        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold mb-1">
          <Compass className="w-4 h-4" />
          <span>3D CADASTRAL INSPECTOR</span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          Select a parcel, building, or property volume on the 3D map to inspect cadastral relationships.
        </p>
      </div>

      <div className="space-y-3 text-[11px] text-slate-400">
        <div className="p-3 bg-slate-800/40 rounded-lg border border-slate-700/50 flex items-start gap-2.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 mt-1 shrink-0" />
          <span>Click any 3D building to reveal vertical floor strata and unit boundaries.</span>
        </div>
        <div className="p-3 bg-slate-800/40 rounded-lg border border-slate-700/50 flex items-start gap-2.5">
          <span className="w-2 h-2 rounded-full bg-amber-400 mt-1 shrink-0" />
          <span>Toggle Underground Mode to inspect subsurface utilities & pipes.</span>
        </div>
        <div className="p-3 bg-slate-800/40 rounded-lg border border-slate-700/50 flex items-start gap-2.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1 shrink-0" />
          <span>Use Global Search in the header to fly directly to any ULPIN identifier.</span>
        </div>
      </div>
    </div>
  );
};
