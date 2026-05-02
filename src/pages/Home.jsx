import React, { useState, useEffect } from 'react';
import { Activity, Moon, Sun } from 'lucide-react';
import SearchBar from '../components/SearchBar';

export default function Home() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-[#FDFDFD] dark:bg-[#0F1115] text-[#1A1A1A] dark:text-[#ECECEC] transition-colors duration-500 flex flex-col font-sans antialiased relative overflow-hidden">
      
      {/* Solid Grid Background - Visible and sharp */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.08] dark:opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #0D9488 1px, transparent 1px),
            linear-gradient(to bottom, #0D9488 1px, transparent 1px)
          `,
          backgroundSize: '45px 45px'
        }}
      />

      <nav className="relative z-10 flex items-center justify-between px-10 py-8">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 text-white bg-[#0D9488] rounded-lg shadow-sm">
            <Activity className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">GitMetrics</span>
          <span className="px-2 py-0.5 text-[10px] font-bold text-[#0D9488] border border-[#0D9488]/30 rounded uppercase tracking-widest">
            V1.0
          </span>
        </div>
        
        <div className="flex items-center gap-8">
          <button 
            onClick={toggleTheme} 
            className="p-2 text-slate-400 hover:text-[#0D9488] dark:hover:text-[#2DD4BF] transition-colors"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noreferrer" 
            className="text-sm font-bold tracking-widest text-slate-500 hover:text-[#0D9488] dark:hover:text-[#2DD4BF] transition-colors uppercase"
          >
            GITHUB
          </a>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col items-center flex-1 px-6 pt-24 pb-20 mx-auto max-w-4xl text-center">
        
        <div className="flex items-center gap-2 px-3 py-1 mb-10 text-[11px] font-bold text-[#0D9488] dark:text-[#2DD4BF] bg-[#0D9488]/5 dark:bg-[#2DD4BF]/10 border border-[#0D9488]/20 rounded-full uppercase tracking-tighter">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488] dark:bg-[#2DD4BF] shadow-[0_0_8px_rgba(13,148,136,0.6)]"></span>
          Live API Connection
        </div>

        <h1 className="mb-4 text-6xl md:text-7xl font-extrabold tracking-tighter text-black dark:text-white leading-none">
          Engineering intelligence,
        </h1>
        <h2 className="mb-10 text-4xl md:text-5xl font-bold tracking-tight text-slate-400 dark:text-slate-600">
          at a glance.
        </h2>

        <p className="max-w-md mb-14 text-base text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
          Professional GitHub profile analytics. <br /> 
          Clean, recruiter-ready dashboards in seconds.
        </p>

        <div className="w-full max-w-2xl mb-12">
          <div className="p-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl transition-all focus-within:border-[#0D9488] focus-within:ring-4 focus-within:ring-[#0D9488]/10">
            <SearchBar />
          </div>
        </div>

      </main>

      <footer className="relative z-10 py-10 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-slate-400 dark:text-slate-600 transition-colors duration-300">
          &copy; {currentYear} Suhani Yadav • All rights reserved
        </p>
      </footer>
    </div>
  );
}