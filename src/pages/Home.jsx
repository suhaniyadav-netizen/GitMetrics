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
    <div className="min-h-screen bg-white dark:bg-[#09090b] text-slate-900 dark:text-zinc-100 transition-colors duration-500 flex flex-col font-sans relative overflow-hidden">
      
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.1] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #a1a1aa 1px, transparent 1px)',
          backgroundSize: '40px 100%'
        }}
      />

      <nav className="relative z-10 flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 text-white bg-black dark:bg-zinc-100 dark:text-black rounded-md">
            <Activity className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">GitMetrics</span>
          <span className="px-2 py-0.5 text-[10px] font-bold text-zinc-400 border border-zinc-200 dark:border-zinc-800 rounded uppercase tracking-widest">
            V1.0
          </span>
        </div>
        
        <div className="flex items-center gap-6">
          <button 
            onClick={toggleTheme}
            className="p-2 text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4 text-orange-400" /> : <Moon className="w-4 h-4" />}
          </button>
          
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors"
          >
            GitHub
          </a>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col items-center flex-1 px-4 pt-20 pb-20 mx-auto max-w-4xl text-center">
        
        <div className="flex items-center gap-2 px-3 py-1 mb-10 text-[11px] font-semibold text-zinc-500 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
          Live • powered by GitHub API
        </div>

        <h1 className="mb-4 text-5xl md:text-6xl font-bold tracking-tight text-black dark:text-zinc-50">
          Engineering intelligence,
        </h1>
        <h2 className="mb-8 text-4xl md:text-5xl font-bold tracking-tight text-zinc-400 dark:text-zinc-500">
          at a glance.
        </h2>

        <p className="max-w-lg mb-12 text-sm md:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
          The refined standard for GitHub developer analytics. <br />
          Professional dashboards generated in seconds.
        </p>

        <div className="w-full max-w-2xl mb-12 p-1.5 bg-zinc-100 dark:bg-zinc-900 rounded-2xl">
          <SearchBar />
        </div>

      </main>

      <footer className="relative z-10 py-10 text-[11px] font-bold uppercase tracking-[0.2em] text-center text-zinc-300 dark:text-zinc-800">
        &copy; {currentYear} Suhani Yadav • All rights reserved
      </footer>
    </div>
  );
}