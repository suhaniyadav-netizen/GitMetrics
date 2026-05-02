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
    <div className="min-h-screen bg-white dark:bg-[#0C0C0C] text-[#1A1A1A] dark:text-[#E5E5E5] transition-colors duration-500 flex flex-col font-sans selection:bg-indigo-100 dark:selection:bg-indigo-500/30">
      
      {/* Structural Grid - Only visible in dark mode for depth */}
      <div className="absolute inset-0 z-0 opacity-0 dark:opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(to right, #FFF 1px, transparent 1px)', backgroundSize: '80px 100%' }} />

      <nav className="relative z-10 flex items-center justify-between px-10 py-8">
        <div className="flex items-center gap-3 group cursor-default">
          <Activity className="w-6 h-6 text-black dark:text-white group-hover:rotate-12 transition-transform" />
          <span className="text-lg font-bold tracking-tight">GitMetrics</span>
        </div>
        
        <div className="flex items-center gap-8">
          <button onClick={toggleTheme} className="text-[#A1A1A1] hover:text-black dark:hover:text-white transition-colors">
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="text-sm font-semibold tracking-wide hover:opacity-60 transition-opacity">
            GITHUB
          </a>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col items-center flex-1 px-6 pt-28 pb-20 mx-auto max-w-4xl text-center">
        
        <h1 className="mb-4 text-6xl md:text-8xl font-bold tracking-tighter text-black dark:text-white leading-[0.9]">
          Engineering <br /> intelligence.
        </h1>
        
        <p className="mt-8 mb-16 text-lg md:text-xl text-[#737373] dark:text-[#888888] font-medium tracking-tight">
          Sophisticated analytics for the modern developer.
        </p>

        <div className="w-full max-w-xl group">
          <div className="p-1 bg-[#F5F5F5] dark:bg-[#161616] rounded-2xl transition-all group-focus-within:ring-1 ring-black/5 dark:ring-white/10">
            <SearchBar />
          </div>
          <div className="mt-6 flex justify-center gap-4 text-[10px] font-bold tracking-[0.2em] text-[#D4D4D4] dark:text-[#262626] uppercase">
            <span>Verified API</span>
            <span>•</span>
            <span>No Auth Required</span>
          </div>
        </div>

      </main>

      <footer className="relative z-10 py-12 text-[10px] font-bold uppercase tracking-[0.3em] text-center text-[#E5E5E5] dark:text-[#1A1A1A]">
        &copy; {currentYear} Suhani Yadav
      </footer>
    </div>
  );
}