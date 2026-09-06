import React, { useState } from 'react';
import { 
  Box, 
  Search, 
  Map, 
  Play, 
  Building2, 
  ShieldCheck, 
  BarChart3, 
  Cpu, 
  Layers, 
  Upload, 
  Info, 
  CheckCircle2, 
  X,
  Menu,
  Sparkles,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { PropertyVolume, Parcel, Building, UndergroundAsset } from '../../types';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onRunCompleteDemo: () => void;
  onOpenUlpinGenerator: () => void;
  properties: PropertyVolume[];
  parcels: Parcel[];
  buildings: Building[];
  undergroundAssets: UndergroundAsset[];
  onSelectSearchResult: (type: 'property' | 'building' | 'parcel' | 'infra', id: string) => void;
  onShowDemoNotice: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  onRunCompleteDemo,
  onOpenUlpinGenerator,
  properties,
  parcels,
  buildings,
  undergroundAssets,
  onSelectSearchResult,
  onShowDemoNotice
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFeedback, setSearchFeedback] = useState<string | null>(null);

  // Search filter across ULPINs, parcels, buildings, and properties
  const filteredResults = searchQuery.trim().length > 1 ? [
    ...properties
      .filter(p => 
        p.ulpin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.unitNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.ownerName.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map(p => ({
        type: 'property' as const,
        id: p.propertyId,
        title: `Unit ${p.unitNumber} (${p.ulpin})`,
        subtitle: `${p.floorName} • ${p.buildingId} • ${p.propertyType}`
      })),
    ...buildings
      .filter(b => 
        b.buildingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map(b => ({
        type: 'building' as const,
        id: b.buildingId,
        title: `Building ${b.buildingId}: ${b.name}`,
        subtitle: `${b.floorCount} Floors • ${b.propertyCount} Properties • Parcel ${b.parcelId}`
      })),
    ...parcels
      .filter(p => 
        p.parcelId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map(p => ({
        type: 'parcel' as const,
        id: p.parcelId,
        title: `Parcel ${p.parcelId}`,
        subtitle: `${p.name} • ${p.administrativeArea}`
      })),
    ...undergroundAssets
      .filter(u => 
        u.infrastructureId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map(u => ({
        type: 'infra' as const,
        id: u.infrastructureId,
        title: `${u.type} (${u.infrastructureId})`,
        subtitle: `Depth: ${u.depth}m • Length: ${u.length}m`
      }))
  ].slice(0, 6) : [];

  const handleResultClick = (type: 'property' | 'building' | 'parcel' | 'infra', id: string, title: string) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    onSelectSearchResult(type, id);
    setSearchFeedback(`Property Found ✓ — Focused on ${title}`);
    setTimeout(() => setSearchFeedback(null), 4000);
  };

  const navLinks = [
    { label: 'Home', route: '/' },
    { label: '3D Map', route: '/map' },
    { label: 'Dashboard', route: '/dashboard' },
    { label: 'Properties', route: '/properties' },
    { label: 'Infrastructure', route: '/infrastructure' },
    { label: 'AI Intelligence', route: '/ai-intelligence' },
    { label: 'Validation', route: '/validation' },
    { label: 'Analytics', route: '/analytics' },
    { label: 'Data', route: '/data' },
    { label: 'About', route: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0f172a]/80 backdrop-blur-md border-b border-cyan-500/30 select-none" id="main-header-navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 gap-4">
        
        {/* Brand & Logo */}
        <div 
          onClick={() => onNavigate('/')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
          id="navbar-brand-logo"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)] group-hover:scale-105 transition-transform">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
              <path d="M7 18.27L12 21l5-2.73" />
              <path d="M12 12V3.05" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-white leading-none">
                3D ULPIN
              </h1>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/40 font-bold uppercase">
                MVP
              </span>
            </div>
            <p className="text-[10px] text-cyan-400 font-mono uppercase tracking-[0.2em] mt-0.5 hidden sm:block">
              Urban Property Intelligence
            </p>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="relative flex-1 max-w-md hidden md:block mx-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              placeholder="Search ULPIN, Parcel ID, Building or Property..."
              className="w-full bg-slate-900/50 border border-slate-700 rounded-full py-1.5 pl-9 pr-4 text-xs font-mono text-slate-200 focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none placeholder-slate-500 transition-all"
              id="global-ulpin-search-input"
            />
            {searchQuery && (
              <button 
                onClick={() => { setSearchQuery(''); setIsSearchOpen(false); }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Search Dropdown */}
          {isSearchOpen && filteredResults.length > 0 && (
            <div className="absolute top-full mt-1.5 left-0 w-full rounded-xl bg-[#0f172a] border border-cyan-500/30 shadow-2xl overflow-hidden z-50">
              <div className="p-2 border-b border-slate-800 text-[10px] font-mono text-cyan-400 flex justify-between items-center">
                <span>CADASTRAL MATCHES ({filteredResults.length})</span>
                <span>ESC to dismiss</span>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-slate-800/60">
                {filteredResults.map((item, idx) => (
                  <div
                    key={`${item.type}-${item.id}-${idx}`}
                    onClick={() => handleResultClick(item.type, item.id, item.title)}
                    className="p-2.5 hover:bg-cyan-500/10 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-medium text-slate-200">{item.title}</span>
                      <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                        {item.type}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">{item.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-3 text-xs font-medium">
          {navLinks.map((link) => {
            const isActive = currentRoute === link.route;
            return (
              <button
                key={link.route}
                onClick={() => onNavigate(link.route)}
                className={`py-1 transition-colors ${
                  isActive
                    ? 'text-cyan-400 border-b border-cyan-400 px-1 font-semibold'
                    : 'text-slate-300 hover:text-cyan-400'
                }`}
                id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons & Admin Badge */}
        <div className="flex items-center gap-3">
          {/* Run Demo Button */}
          <button
            onClick={onRunCompleteDemo}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/50 text-cyan-300 text-[11px] font-bold uppercase tracking-wider transition-all active:scale-95"
            id="navbar-run-demo-btn"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="whitespace-nowrap hidden sm:inline">Run Demo</span>
          </button>

          {/* Open 3D Map */}
          <button
            onClick={() => onNavigate('/map')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-[11px] font-bold uppercase tracking-wider shadow-lg shadow-cyan-900/30 transition-all active:scale-95 whitespace-nowrap"
            id="navbar-open-3d-map-btn"
          >
            <Map className="w-3.5 h-3.5" />
            <span>3D Map</span>
          </button>

          {/* High Density Admin Profile Badge */}
          <div className="hidden sm:flex items-center gap-2 border-l border-slate-700 pl-3">
            <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-200">
              AD
            </div>
            <span className="text-xs font-semibold text-slate-300 hidden xl:inline">Admin</span>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 lg:hidden hover:text-white"
            id="mobile-menu-toggle-btn"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Search Feedback Floating Toast */}
      {searchFeedback && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-4 py-2 rounded-xl bg-cyan-950/90 border border-cyan-400 text-cyan-200 text-xs font-mono shadow-2xl flex items-center gap-2 z-50 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          <span>{searchFeedback}</span>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-xl px-4 py-4 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.route}
                onClick={() => {
                  onNavigate(link.route);
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-lg text-left text-xs font-medium ${
                  currentRoute === link.route 
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' 
                    : 'bg-slate-900/60 text-slate-300'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 flex gap-2">
            <button
              onClick={() => { onOpenUlpinGenerator(); setMobileMenuOpen(false); }}
              className="flex-1 py-2 rounded-lg bg-slate-800 text-slate-200 text-xs font-medium text-center border border-slate-700"
            >
              Generate ULPIN
            </button>
            <button
              onClick={() => { onShowDemoNotice(); setMobileMenuOpen(false); }}
              className="px-3 py-2 rounded-lg bg-amber-950/40 text-amber-300 text-xs font-medium border border-amber-500/40"
            >
              Notice
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
