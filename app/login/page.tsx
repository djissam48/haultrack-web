"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulation dyal chargement 9bel may-dkhel (1.5 secondes)
    setTimeout(() => {
      window.location.href = '/'; // Kay-redd l'user l'Dashboard
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      
      {/* Design d'arrière plan (Effet de lumière d'hbia khfifa) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md bg-[#121212] border border-gray-800 rounded-2xl shadow-2xl p-8 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Header / Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-xl bg-amber-500 flex items-center justify-center text-black font-bold text-3xl mb-4 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
            H
          </div>
          <h1 className="text-2xl font-bold tracking-wide text-white">HAULTRACK</h1>
          <p className="text-sm text-gray-400 mt-2">Logistics Management System</p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">Email Professionnel</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input 
                type="email" 
                required 
                className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none transition-all" 
                placeholder="admin@haultrack.ma" 
                defaultValue="admin@haultrack.ma"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-sm font-medium text-gray-400">Mot de passe</label>
              <a href="#" className="text-xs text-amber-500 hover:text-amber-400 transition-colors">Oublié ?</a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input 
                type="password" 
                required 
                className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none transition-all" 
                placeholder="••••••••" 
                defaultValue="password123"
              />
            </div>
          </div>

          <div className="pt-2">
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-3 bg-amber-500 text-black rounded-lg font-bold hover:bg-amber-400 transition-colors shadow-[0_0_15px_rgba(245,158,11,0.2)] flex justify-center items-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Connexion en cours...
                </>
              ) : (
                'Se Connecter'
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center border-t border-gray-800 pt-6">
          <p className="text-xs text-gray-500">© 2026 HaulTrack. Développé pour la logistique B2B.</p>
        </div>
      </div>
    </div>
  );
}