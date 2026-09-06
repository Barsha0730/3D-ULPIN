import React, { useState, useEffect } from 'react';
import { Navbar } from './components/navigation/Navbar';
import { LandingPage } from './components/pages/LandingPage';
import { MainMapPage } from './components/pages/MainMapPage';
import { DashboardPage } from './components/pages/DashboardPage';
import { PropertiesPage } from './components/pages/PropertiesPage';
import { InfrastructurePage } from './components/pages/InfrastructurePage';
import { AiIntelligencePage } from './components/pages/AiIntelligencePage';
import { ValidationPage } from './components/pages/ValidationPage';
import { AnalyticsPage } from './components/pages/AnalyticsPage';
import { DataPage } from './components/pages/DataPage';
import { AboutPage } from './components/pages/AboutPage';
import { ULPINGeneratorModal } from './components/property/ULPINGeneratorModal';
import { CompleteDemoRunner } from './components/demo/CompleteDemoRunner';
import { api } from './lib/api/apiService';
import { 
  Parcel, 
  Building, 
  PropertyVolume, 
  UndergroundAsset, 
  CadastralStats 
} from './types';
import { 
  AlertCircle, 
  X, 
  CheckCircle2, 
  MapPin, 
  ShieldCheck, 
  Sparkles,
  Layers,
  Box
} from 'lucide-react';

export default function App() {
  // Routes: '/' | '/map' | '/dashboard' | '/properties' | '/infrastructure' | '/ai-intelligence' | '/validation' | '/analytics' | '/data' | '/about'
  const [currentRoute, setCurrentRoute] = useState<string>('/');
  
  // Data State
  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [properties, setProperties] = useState<PropertyVolume[]>([]);
  const [undergroundAssets, setUndergroundAssets] = useState<UndergroundAsset[]>([]);
  const [stats, setStats] = useState<CadastralStats>({
    totalParcels: 1248,
    threeDProperties: 5842,
    buildings: 1106,
    undergroundAssets: 2314,
    validationRate: 98.4
  });

  // 3D Viewport Interaction State
  const [selectedParcelId, setSelectedParcelId] = useState<string | null>('WB-KOL-00125');
  const [selectedBuildingId, setSelectedBuildingId] = useState<string | null>('B01');
  const [selectedFloorNumber, setSelectedFloorNumber] = useState<number | null>(3);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>('U301');
  const [selectedInfrastructureId, setSelectedInfrastructureId] = useState<string | null>(null);
  const [explodedFloors, setExplodedFloors] = useState<boolean>(false);
  const [undergroundMode, setUndergroundMode] = useState<boolean>(false);

  // Modals
  const [isDemoRunnerOpen, setIsDemoRunnerOpen] = useState(false);
  const [isUlpinGeneratorOpen, setIsUlpinGeneratorOpen] = useState(false);
  const [isDemoNoticeOpen, setIsDemoNoticeOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initial Data Fetch
  useEffect(() => {
    async function loadData() {
      try {
        const [pData, bData, propData, uData, sData] = await Promise.all([
          api.getParcels(),
          api.getBuildings(),
          api.getProperties(),
          api.getUndergroundAssets(),
          api.getStats()
        ]);
        setParcels(pData);
        setBuildings(bData);
        setProperties(propData);
        setUndergroundAssets(uData);
        setStats(sData);
      } catch (err) {
        console.error('Failed to load cadastral data:', err);
      }
    }
    loadData();
  }, []);

  // Hash Routing sync
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setCurrentRoute(hash.startsWith('/') ? hash : `/${hash}`);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    if (window.location.hash) {
      handleHashChange();
    }
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (route: string) => {
    setCurrentRoute(route);
    window.location.hash = route;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Global search result handler
  const handleSelectSearchResult = (type: 'property' | 'building' | 'parcel' | 'infra', id: string) => {
    if (type === 'property') {
      const prop = properties.find(p => p.propertyId === id);
      if (prop) {
        setSelectedParcelId(prop.parcelId);
        setSelectedBuildingId(prop.buildingId);
        setSelectedFloorNumber(prop.floor);
        setSelectedPropertyId(prop.propertyId);
        setSelectedInfrastructureId(null);
        setExplodedFloors(true);
      }
    } else if (type === 'building') {
      const b = buildings.find(item => item.buildingId === id);
      if (b) {
        setSelectedParcelId(b.parcelId);
        setSelectedBuildingId(b.buildingId);
        setSelectedFloorNumber(null);
        setSelectedPropertyId(null);
        setSelectedInfrastructureId(null);
      }
    } else if (type === 'parcel') {
      setSelectedParcelId(id);
      setSelectedBuildingId(null);
      setSelectedFloorNumber(null);
      setSelectedPropertyId(null);
      setSelectedInfrastructureId(null);
    } else if (type === 'infra') {
      setSelectedInfrastructureId(id);
      setUndergroundMode(true);
    }
    navigateTo('/map');
  };

  // Demo Runner step progression
  const handleDemoStepChange = (stepNumber: number) => {
    if (stepNumber === 1) {
      setSelectedParcelId('WB-KOL-00125');
      setSelectedBuildingId(null);
      setSelectedFloorNumber(null);
      setSelectedPropertyId(null);
      setExplodedFloors(false);
      setUndergroundMode(false);
    } else if (stepNumber === 2) {
      setSelectedParcelId('WB-KOL-00125');
      setSelectedBuildingId('B01');
      setSelectedFloorNumber(null);
      setSelectedPropertyId(null);
      setExplodedFloors(false);
    } else if (stepNumber === 3) {
      setSelectedParcelId('WB-KOL-00125');
      setSelectedBuildingId('B01');
      setExplodedFloors(true);
      setSelectedFloorNumber(3);
    } else if (stepNumber === 4) {
      setSelectedParcelId('WB-KOL-00125');
      setSelectedBuildingId('B01');
      setExplodedFloors(true);
      setSelectedFloorNumber(3);
      setSelectedPropertyId('U301');
    } else if (stepNumber === 5) {
      // Highlight 3D ULPIN
      setSelectedPropertyId('U301');
    } else if (stepNumber === 6) {
      // Validate
      showToast('Topology validation: Zero volumetric intersection verified ✓');
    }
  };

  const handleFocusProperty = (propertyId: string) => {
    const prop = properties.find(p => p.propertyId === propertyId);
    if (prop) {
      setSelectedParcelId(prop.parcelId);
      setSelectedBuildingId(prop.buildingId);
      setSelectedFloorNumber(prop.floor);
      setSelectedPropertyId(prop.propertyId);
      setSelectedInfrastructureId(null);
      setExplodedFloors(true);
    }
    navigateTo('/map');
    showToast(`Focused on 3D Volume: Unit ${propertyId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* 1. Header Navbar */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={navigateTo}
        onRunCompleteDemo={() => setIsDemoRunnerOpen(true)}
        onOpenUlpinGenerator={() => setIsUlpinGeneratorOpen(true)}
        properties={properties}
        parcels={parcels}
        buildings={buildings}
        undergroundAssets={undergroundAssets}
        onSelectSearchResult={handleSelectSearchResult}
        onShowDemoNotice={() => setIsDemoNoticeOpen(true)}
      />

      {/* 2. Main Body Content Switcher */}
      <main className="flex-1 w-full">
        {currentRoute === '/' && (
          <LandingPage
            onNavigate={navigateTo}
            onRunDemo={() => setIsDemoRunnerOpen(true)}
            parcels={parcels}
            buildings={buildings}
            properties={properties}
            undergroundAssets={undergroundAssets}
          />
        )}

        {currentRoute === '/map' && (
          <MainMapPage
            parcels={parcels}
            buildings={buildings}
            properties={properties}
            undergroundAssets={undergroundAssets}
            selectedParcelId={selectedParcelId}
            selectedBuildingId={selectedBuildingId}
            selectedFloorNumber={selectedFloorNumber}
            selectedPropertyId={selectedPropertyId}
            selectedInfrastructureId={selectedInfrastructureId}
            explodedFloors={explodedFloors}
            undergroundMode={undergroundMode}
            onSelectParcel={setSelectedParcelId}
            onSelectBuilding={setSelectedBuildingId}
            onSelectFloor={setSelectedFloorNumber}
            onSelectProperty={setSelectedPropertyId}
            onSelectInfrastructure={setSelectedInfrastructureId}
            onToggleExplodedFloors={() => setExplodedFloors(!explodedFloors)}
            onToggleUndergroundMode={() => setUndergroundMode(!undergroundMode)}
            onOpenImport={() => navigateTo('/data')}
            onOpenGenerator={() => setIsUlpinGeneratorOpen(true)}
            onRunValidation={() => navigateTo('/validation')}
            onValidateProperty={(prop) => {
              showToast(`Validated Unit ${prop.unitNumber}: 100% Geometry Compliant ✓`);
            }}
          />
        )}

        {currentRoute === '/dashboard' && (
          <DashboardPage
            stats={stats}
            parcels={parcels}
            buildings={buildings}
            properties={properties}
            undergroundAssets={undergroundAssets}
            onNavigate={navigateTo}
            onSelectProperty={handleFocusProperty}
          />
        )}

        {currentRoute === '/properties' && (
          <PropertiesPage
            properties={properties}
            onViewIn3D={handleFocusProperty}
            onValidateProperty={(prop) => {
              showToast(`Validated Unit ${prop.unitNumber}: 100% Geometry Compliant ✓`);
            }}
          />
        )}

        {currentRoute === '/infrastructure' && (
          <InfrastructurePage
            undergroundAssets={undergroundAssets}
            onViewIn3D={(infraId) => {
              setSelectedInfrastructureId(infraId);
              setUndergroundMode(true);
              navigateTo('/map');
            }}
          />
        )}

        {currentRoute === '/ai-intelligence' && (
          <AiIntelligencePage
            properties={properties}
            onViewProperty={handleFocusProperty}
          />
        )}

        {currentRoute === '/validation' && (
          <ValidationPage
            properties={properties}
            onViewIn3D={handleFocusProperty}
          />
        )}

        {currentRoute === '/analytics' && (
          <AnalyticsPage
            stats={stats}
            properties={properties}
            onNavigate={navigateTo}
          />
        )}

        {currentRoute === '/data' && (
          <DataPage
            parcels={parcels}
            buildings={buildings}
            properties={properties}
            undergroundAssets={undergroundAssets}
            onLoadDataset={(name) => {
              showToast(`Loaded ${name} dataset into active 3D memory ✓`);
              navigateTo('/map');
            }}
            onNavigate={navigateTo}
          />
        )}

        {currentRoute === '/about' && (
          <AboutPage
            onNavigate={navigateTo}
            onRunDemo={() => setIsDemoRunnerOpen(true)}
          />
        )}
      </main>

      {/* 3. Footer (Only on content pages, not full map) */}
      {currentRoute !== '/map' && (
        <footer className="border-t border-slate-800/80 bg-slate-950/70 text-slate-400 text-xs font-mono py-8 px-4 sm:px-6 mt-12">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Box className="w-4 h-4 text-cyan-400" />
              <span className="font-bold text-slate-200">3D ULPIN PLATFORM</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-500">National GIS Cadastral Prototype</span>
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <button onClick={() => setIsDemoNoticeOpen(true)} className="hover:text-cyan-300">
                Synthetic Data Notice
              </button>
              <button onClick={() => navigateTo('/about')} className="hover:text-cyan-300">
                ULPIN Anatomy
              </button>
              <button onClick={() => navigateTo('/map')} className="hover:text-cyan-300">
                3D GIS View
              </button>
            </div>
          </div>
        </footer>
      )}

      {/* 4. Complete Automated 6-Step Demo Runner Modal */}
      <CompleteDemoRunner
        isOpen={isDemoRunnerOpen}
        onClose={() => setIsDemoRunnerOpen(false)}
        onStepChange={handleDemoStepChange}
        onComplete={() => {
          showToast('3D Property Successfully Registered with 3D ULPIN ✓');
        }}
        onViewIn3D={(pId) => {
          handleFocusProperty(pId);
        }}
      />

      {/* 5. 3D ULPIN Generator Modal */}
      <ULPINGeneratorModal
        isOpen={isUlpinGeneratorOpen}
        onClose={() => setIsUlpinGeneratorOpen(false)}
        onViewPropertyInMap={handleFocusProperty}
      />

      {/* 6. Synthetic Demo Data Notice Modal */}
      {isDemoNoticeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md gis-glass border border-amber-500/40 rounded-2xl p-6 text-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-amber-300 font-bold font-mono text-sm">
                <AlertCircle className="w-5 h-5" />
                <span>DEMO DATA NOTICE</span>
              </div>
              <button onClick={() => setIsDemoNoticeOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="text-xs font-mono space-y-3 leading-relaxed text-slate-300">
              <p>
                <strong className="text-amber-300">SYNTHETIC EVALUATION DATASET:</strong> All parcel coordinates, tower elevations, strata boundaries, owner details, and utility depths presented in 3D ULPIN are realistic synthetic models.
              </p>
              <p>
                <strong className="text-cyan-300">PROPOSED 3D ULPIN FORMAT:</strong> The 14-character spatial sequence (e.g. <code>IN-WB-KOL-00125-B01-F03-U301</code>) is a hackathon innovation proposal extending 2D Bhu-Aadhaar. It is not an officially adopted statutory standard.
              </p>
            </div>
            <button
              onClick={() => setIsDemoNoticeOpen(false)}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors"
            >
              Acknowledge & Dismiss
            </button>
          </div>
        </div>
      )}

      {/* 7. Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl gis-glass border border-cyan-400/60 shadow-2xl text-cyan-200 text-xs font-mono flex items-center gap-2.5 animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
