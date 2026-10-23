"use client";

import React, { useEffect, useState } from 'react';
import Map, { Marker } from 'react-map-gl/maplibre';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import Link from 'next/link';
import { createShipment } from '@/actions/shipment';

const fleetLocations = [
  { id: 'TRK-101', lat: 31.6300, lng: -7.9800, status: 'on-time', color: '#10b981' },
  { id: 'TRK-102', lat: 31.6150, lng: -8.0100, status: 'delayed', color: '#f59e0b' },
  { id: 'TRK-103', lat: 31.6450, lng: -7.9500, status: 'critical', color: '#ef4444' },
  { id: 'TRK-104', lat: 31.6550, lng: -8.0000, status: 'on-time', color: '#10b981' },
];

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      maplibregl.setWorkerUrl('https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl-csp-worker.js');
    }
  }, []);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    const result = await createShipment(formData);
    setIsSubmitting(false);
    
    if (result.success) {
      alert("L'expédition t-zadat f Database bnaja7!");
      setIsModalOpen(false);
    } else {
      alert("Erreur f l'ajout dyal l'expédition.");
    }
  };

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-gray-200 font-sans relative overflow-hidden">
      
      {/* Overlay Mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40 
        transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 
        transition-transform duration-300 ease-in-out 
        w-64 border-r border-gray-800 bg-[#121212] flex flex-col justify-between
      `}>
        <div>
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-amber-500 flex items-center justify-center text-black font-bold text-xl">H</div>
              <span className="text-xl font-bold tracking-wide text-white">HAULTRACK</span>
            </div>
            <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          
          <nav className="px-4 space-y-1 mt-4">
            <Link href="/" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 bg-gray-800/80 border-l-2 border-amber-500 text-white rounded-r-md font-medium transition-colors">
              <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
              Aperçu de la flotte
            </Link>
            <Link href="#" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-md transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
              Carte et Suivi
            </Link>
            <Link href="/expeditions" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-md transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              Expéditions
            </Link>
          </nav>
        </div>
        
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800/50 rounded-md cursor-pointer transition-colors">
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold text-white">A</div>
            <div className="text-sm">
              <p className="font-medium text-white">Utilisateur Admin</p>
              <p className="text-gray-500 text-xs">Console Dispatch</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 relative z-0 w-full">
        <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 md:mb-8">
          <div className="flex items-center gap-3">
            <button className="md:hidden text-white hover:text-amber-500 p-1" onClick={() => setIsSidebarOpen(true)}>
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white">Aperçu de la flotte</h1>
              <p className="text-xs md:text-sm text-gray-400 mt-1">Hub de Marrakech • 7 derniers jours</p>
            </div>
          </div>
          
          <div className="flex gap-2 md:gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-3 md:px-4 py-2 border border-gray-700 text-gray-300 rounded-md hover:bg-gray-800 text-xs md:text-sm font-medium transition-colors">
              Exporter
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex-1 md:flex-none px-3 md:px-4 py-2 bg-amber-500 text-black rounded-md hover:bg-amber-400 text-xs md:text-sm font-bold transition-colors shadow-lg shadow-amber-500/20"
            >
              + Nouvelle expédition
            </button>
          </div>
        </header>

        {/* Top KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6">
          {[
            { label: 'Trajets actifs', value: '124', trend: '+12.5%', up: true },
            { label: 'Ponctualité', value: '96.5%', trend: '+1.2%', up: true },
            { label: 'Détention', value: '18h', trend: '-2.4%', up: true },
            { label: 'Revenus', value: '1.2M', trend: '+8.4%', up: true },
          ].map((kpi, i) => (
            <div key={i} className="bg-[#121212] p-4 md:p-6 rounded-xl border border-gray-800 shadow-sm hover:border-gray-700 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-gray-400 text-xs md:text-sm font-medium">{kpi.label}</h3>
              </div>
              <div className="text-lg md:text-2xl font-bold text-white mb-1 md:mb-2">{kpi.value}</div>
              <div className={`text-[10px] md:text-xs font-medium flex items-center gap-1 ${kpi.up ? 'text-green-500' : 'text-red-500'}`}>
                {kpi.up ? '↑' : '↓'} {kpi.trend} <span className="hidden md:inline text-gray-500 ml-1 font-normal">vs sem. der.</span>
              </div>
            </div>
          ))}
        </div>

        {/* Live Map Area */}
        <div className="bg-[#121212] p-4 md:p-6 rounded-xl border border-gray-800 shadow-sm mb-6 flex flex-col relative z-0">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white text-sm md:text-base font-medium">Télémétrie en direct</h3>
          </div>
          <div className="h-[300px] md:h-[400px] w-full rounded-lg overflow-hidden">
            <Map
              initialViewState={{
                longitude: -7.9811,
                latitude: 31.6295,
                zoom: 11
              }}
              mapStyle={{
                version: 8,
                sources: {
                  osm: {
                    type: 'raster',
                    tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
                    tileSize: 256,
                    attribution: '© OSM',
                  }
                },
                layers: [
                  { id: 'osm-tiles', type: 'raster', source: 'osm' }
                ]
              }}
              style={{ width: '100%', height: '100%' }}
            >
              {fleetLocations.map((truck) => (
                <Marker key={truck.id} longitude={truck.lng} latitude={truck.lat} anchor="center">
                  <div className="relative flex items-center justify-center w-8 h-8 group cursor-pointer">
                    <div className="absolute w-full h-full rounded-full opacity-40 animate-ping" style={{ backgroundColor: truck.color }}></div>
                    <div className="relative w-4 h-4 rounded-full border-2 border-gray-900 shadow-lg" style={{ backgroundColor: truck.color }}></div>
                  </div>
                </Marker>
              ))}
            </Map>
          </div>
        </div>

        {/* Bottom Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-[#121212] p-4 md:p-6 rounded-xl border border-gray-800 shadow-sm h-auto lg:h-72 flex flex-col">
            <h3 className="text-white font-medium mb-4">Capacité de la flotte</h3>
            <div className="flex items-center justify-center flex-1 py-4">
              <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-full border-8 border-gray-800 border-t-amber-500 border-r-amber-500 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                <div className="text-center">
                  <span className="block text-2xl md:text-3xl font-bold text-white">74%</span>
                  <span className="text-xs text-gray-500">Utilisée</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center md:justify-between mt-auto gap-4 text-xs md:text-sm px-2">
              <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-amber-500"></div> Utilisé</span>
              <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-gray-800"></div> Disponible</span>
            </div>
          </div>

          <div className="bg-[#121212] p-4 md:p-6 rounded-xl border border-gray-800 shadow-sm h-auto lg:h-72 overflow-y-auto">
            <h3 className="text-white font-medium mb-4">Exceptions Actives</h3>
            <ul className="space-y-3 md:space-y-4">
              {[
                { name: 'Arrivées tardives', count: 12, color: 'bg-red-500' },
                { name: "Attente prolongée", count: 8, color: 'bg-amber-500' },
                { name: "Déviation itinéraire", count: 3, color: 'bg-blue-500' },
                { name: 'Perte de signal', count: 1, color: 'bg-gray-500' }
              ].map((exc, i) => (
                <li key={i} className="flex justify-between items-center p-2.5 md:p-3 rounded-lg border border-gray-800/50 bg-gray-900/30">
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${exc.color} shadow-[0_0_8px_currentColor]`}></span>
                    <span className="text-xs md:text-sm text-gray-300">{exc.name}</span>
                  </div>
                  <span className="text-sm font-medium text-white">{exc.count}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#121212] p-4 md:p-6 rounded-xl border border-gray-800 shadow-sm h-auto lg:h-72">
             <h3 className="text-white font-medium mb-4 md:mb-6">Statut des chauffeurs</h3>
             <div className="space-y-5 md:space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs md:text-sm text-gray-400">En conduite</span>
                    <span className="text-sm text-white font-bold">45</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]" style={{width: '60%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs md:text-sm text-gray-400">En repos</span>
                    <span className="text-sm text-white font-bold">18</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '25%'}}></div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </main>

      {/* Modal dyal Database */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-[#121212] border border-gray-800 rounded-xl w-full max-w-2xl shadow-2xl animate-in fade-in zoom-in duration-200 my-8">
            <div className="flex justify-between items-center p-4 md:p-6 border-b border-gray-800">
              <h2 className="text-lg md:text-xl font-bold text-white">Nouvelle Expédition</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white p-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <form action={handleSubmit}>
              <div className="p-4 md:p-6 space-y-4 md:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-400 mb-1">Point de départ</label>
                    <input type="text" name="origin" required className="w-full bg-[#0a0a0a] border border-gray-700 rounded-md p-2.5 text-white focus:border-amber-500 focus:outline-none text-sm" placeholder="Ex: Casablanca" />
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-400 mb-1">Destination finale</label>
                    <input type="text" name="destination" required className="w-full bg-[#0a0a0a] border border-gray-700 rounded-md p-2.5 text-white focus:border-amber-500 focus:outline-none text-sm" placeholder="Ex: Marrakech" />
                  </div>
                </div>

                <div>
                   <label className="block text-xs md:text-sm font-medium text-gray-400 mb-1">Client / Destinataire</label>
                   <input type="text" name="client" required className="w-full bg-[#0a0a0a] border border-gray-700 rounded-md p-2.5 text-white focus:border-amber-500 focus:outline-none text-sm" placeholder="Nom de l'entreprise" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-400 mb-1">Montant (MAD)</label>
                    <input type="number" name="amount" required className="w-full bg-[#0a0a0a] border border-gray-700 rounded-md p-2.5 text-white focus:border-amber-500 focus:outline-none text-sm" placeholder="Ex: 4500" />
                  </div>
                </div>
              </div>

              <div className="p-4 md:p-6 border-t border-gray-800 flex flex-col-reverse sm:flex-row justify-end gap-3 bg-gray-900/30 rounded-b-xl">
                <button type="button" onClick={() => setIsModalOpen(false)} className="w-full sm:w-auto px-5 py-2.5 border border-gray-700 text-gray-300 rounded-md hover:bg-gray-800 font-medium transition-colors text-sm">Annuler</button>
                <button type="submit" disabled={isSubmitting} className="w-full sm:w-auto px-5 py-2.5 bg-amber-500 text-black rounded-md hover:bg-amber-400 font-bold transition-colors text-sm disabled:opacity-50">
                  {isSubmitting ? 'Chargement...' : 'Confirmer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}