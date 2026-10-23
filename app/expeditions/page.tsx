import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';

// 1. Hada howa l'7el li tleb Next.js 16 bach y-sm7 lina njbdou données dbsa7
export const instant = false;

export default async function ExpeditionsPage() {
  
  // Njibou ga3 l'expéditions mn Database dbsa7, m-rtbin bl'jdid howa lowel
  const shipments = await prisma.shipment.findMany({
    orderBy: {
      id: 'desc',
    },
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'En transit': return <span className="px-2.5 py-1 bg-amber-500/20 text-amber-500 border border-amber-500/30 rounded-full text-xs font-medium">En transit</span>;
      case 'Livré': return <span className="px-2.5 py-1 bg-green-500/20 text-green-500 border border-green-500/30 rounded-full text-xs font-medium">Livré</span>;
      case 'En attente': return <span className="px-2.5 py-1 bg-gray-500/20 text-gray-400 border border-gray-500/30 rounded-full text-xs font-medium">En attente</span>;
      default: return <span className="px-2.5 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-medium">{status}</span>;
    }
  };

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-gray-200 font-sans relative overflow-hidden">
      
      {/* Sidebar */}
      <aside className="hidden md:flex inset-y-0 left-0 z-40 w-64 border-r border-gray-800 bg-[#121212] flex-col justify-between">
        <div>
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-amber-500 flex items-center justify-center text-black font-bold text-xl">H</div>
              <span className="text-xl font-bold tracking-wide text-white">HAULTRACK</span>
            </div>
          </div>
          
          <nav className="px-4 space-y-1 mt-4">
            <Link href="/" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-md transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
              Aperçu de la flotte
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-md transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
              Carte et Suivi
            </Link>
            <Link href="/expeditions" className="flex items-center gap-3 px-4 py-3 bg-gray-800/80 border-l-2 border-amber-500 text-white rounded-r-md font-medium transition-colors">
              <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              Expéditions
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 relative z-0 w-full">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <Link href="/" className="md:hidden text-white hover:text-amber-500 p-1">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            </Link>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white">Toutes les Expéditions</h1>
              <p className="text-xs md:text-sm text-gray-400 mt-1">Gérez et suivez l'historique de vos livraisons ({shipments.length} au total)</p>
            </div>
          </div>
        </header>

        {/* Data Table */}
        <div className="bg-[#121212] border border-gray-800 rounded-xl overflow-hidden overflow-x-auto shadow-sm">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-900/50 border-b border-gray-800 text-gray-400 text-xs uppercase tracking-wider">
                <th className="p-4 font-medium">ID Expédition</th>
                <th className="p-4 font-medium">Client</th>
                <th className="p-4 font-medium">Trajet (Origine → Dest.)</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Montant</th>
                <th className="p-4 font-medium">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50 text-sm">
              {shipments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    Mzl makhlti 7ta expédition f l'Database.
                  </td>
                </tr>
              ) : (
                shipments.map((shipment) => (
                  <tr key={shipment.id} className="hover:bg-gray-800/20 transition-colors">
                    <td className="p-4 font-medium text-white">{shipment.shipmentId}</td>
                    <td className="p-4 text-gray-300">{shipment.client}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-gray-300">
                        <span>{shipment.origin}</span>
                        <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        <span>{shipment.destination}</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-400">{shipment.date}</td>
                    <td className="p-4 font-medium text-gray-300">{shipment.amount}</td>
                    <td className="p-4">{getStatusBadge(shipment.status)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}