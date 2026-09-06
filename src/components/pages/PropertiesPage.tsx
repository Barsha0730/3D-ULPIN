import React, { useState } from 'react';
import { PropertyVolume } from '../../types';
import { 
  Box, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertTriangle, 
  Copy, 
  Check, 
  Eye, 
  Download, 
  Layers, 
  Building2,
  ArrowUpDown
} from 'lucide-react';

interface PropertiesPageProps {
  properties: PropertyVolume[];
  onViewIn3D: (propertyId: string) => void;
  onValidateProperty: (property: PropertyVolume) => void;
}

export const PropertiesPage: React.FC<PropertiesPageProps> = ({
  properties,
  onViewIn3D,
  onValidateProperty
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [buildingFilter, setBuildingFilter] = useState('All');
  const [copiedUlpin, setCopiedUlpin] = useState<string | null>(null);

  const filtered = properties.filter(p => {
    const matchesSearch = 
      p.ulpin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.unitNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.ownerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'All' || p.propertyType === typeFilter;
    const matchesBuilding = buildingFilter === 'All' || p.buildingId === buildingFilter;
    return matchesSearch && matchesType && matchesBuilding;
  });

  const handleCopy = (ulpin: string) => {
    navigator.clipboard.writeText(ulpin);
    setCopiedUlpin(ulpin);
    setTimeout(() => setCopiedUlpin(null), 2000);
  };

  const handleExportCsv = () => {
    const headers = 'PropertyID,ULPIN,ParcelID,BuildingID,Floor,UnitNumber,Area_m2,Volume_m3,VerticalRange,Owner,Status\n';
    const rows = filtered.map(p => 
      `${p.propertyId},${p.ulpin},${p.parcelId},${p.buildingId},${p.floor},${p.unitNumber},${p.area},${p.volume},"${p.verticalRange}","${p.ownerName}",${p.status}`
    ).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '3D_ULPIN_Properties_Registry.csv';
    a.click();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-cyan-500/15">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-wide">
              3D Property Volumes Directory
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              STRATA REGISTRY
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Registered 3D apartment and commercial volumetric titles with vertical height boundaries.
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          className="flex items-center gap-2 px-4 py-2 rounded-xl gis-glass hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono transition-colors active:scale-95"
          id="export-properties-csv-btn"
        >
          <Download className="w-4 h-4 text-cyan-400" />
          <span>Export Cadastral CSV</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl gis-glass border border-slate-800 flex flex-col sm:flex-row gap-3 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter by ULPIN, Unit or Owner..."
            className="w-full pl-9 pr-4 py-2 text-xs font-mono rounded-lg bg-slate-900 border border-slate-700 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-400">Type:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 focus:border-cyan-400 text-xs font-mono"
            >
              <option value="All">All Types</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Utility">Utility</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-400">Building:</span>
            <select
              value={buildingFilter}
              onChange={(e) => setBuildingFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 focus:border-cyan-400 text-xs font-mono"
            >
              <option value="All">All Buildings</option>
              <option value="B01">Building B01</option>
              <option value="B02">Building B02</option>
              <option value="B03">Building B03</option>
            </select>
          </div>
        </div>
      </div>

      {/* Properties Table */}
      <div className="rounded-xl gis-glass border border-slate-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Unit & 3D ULPIN</th>
                <th className="py-3 px-4">Building / Floor</th>
                <th className="py-3 px-4">Vertical Range (Z)</th>
                <th className="py-3 px-4">Floor Area</th>
                <th className="py-3 px-4">3D Volume</th>
                <th className="py-3 px-4">Owner Name</th>
                <th className="py-3 px-4">Cadastral Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {filtered.map((prop) => (
                <tr key={prop.propertyId} className="hover:bg-cyan-500/5 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white flex items-center gap-2">
                      <Box className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Unit {prop.unitNumber}</span>
                    </div>
                    <div className="text-[11px] text-cyan-300 flex items-center gap-1.5 mt-0.5">
                      <span>{prop.ulpin}</span>
                      <button
                        onClick={() => handleCopy(prop.ulpin)}
                        className="p-0.5 text-slate-400 hover:text-white"
                        title="Copy ULPIN"
                      >
                        {copiedUlpin === prop.ulpin ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="text-slate-200 font-medium">Bldg {prop.buildingId}</div>
                    <div className="text-[10px] text-slate-400">{prop.floorName}</div>
                  </td>

                  <td className="py-3.5 px-4 text-amber-300 font-medium">
                    {prop.verticalRange}
                  </td>

                  <td className="py-3.5 px-4 text-slate-200">
                    {prop.area} m²
                  </td>

                  <td className="py-3.5 px-4 text-cyan-300 font-bold">
                    {prop.volume} m³
                  </td>

                  <td className="py-3.5 px-4 text-slate-300">
                    {prop.ownerName}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      prop.status === 'Verified'
                        ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                    }`}>
                      <CheckCircle2 className="w-3 h-3" />
                      {prop.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onViewIn3D(prop.propertyId)}
                        className="px-2.5 py-1 rounded bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-[11px] font-medium transition-colors"
                      >
                        View in 3D
                      </button>
                      <button
                        onClick={() => onValidateProperty(prop)}
                        className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-[11px] transition-colors"
                      >
                        Validate
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
