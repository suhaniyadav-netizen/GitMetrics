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
    <div className="min-h-screen bg-white dark:bg-[#121212] text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col font-sans relative overflow-hidden">
      
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px)',
          backgroundSize: '40px 100%'
        }}
      />

      <nav className="relative z-10 flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 text-white bg-black dark:bg-white dark:text-black rounded-lg">
            <Activity className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">GitMetrics</span>
          <span className="px-2 py-0.5 text-[10px] font-bold text-gray-400 border border-gray-200 dark:border-gray-800 rounded uppercase tracking-widest">
            V1.0
          </span>
        </div>
        
        <div className="flex items-center gap-6">
          <button 
            onClick={toggleTheme}
            className="p-2 text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
              <path d="M9 18c-4.51 2-5-2-7-2"></path>
            </svg>
            GitHub
          </a>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col items-center flex-1 px-4 pt-20 pb-20 mx-auto max-w-4xl text-center">
        
        <div className="flex items-center gap-2 px-3 py-1 mb-10 text-[11px] font-medium text-gray-500 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"></span>
          Live • powered by GitHub API
        </div>

        <h1 className="mb-4 text-5xl md:text-6xl font-bold tracking-tight text-black dark:text-white">
          Engineering intelligence,
        </h1>
        <h2 className="mb-8 text-4xl md:text-5xl font-bold tracking-tight text-gray-400 dark:text-gray-500">
          at a glance.
        </h2>

        <p className="max-w-lg mb-12 text-sm md:text-base text-gray-500 dark:text-gray-400 leading-relaxed">
          Translate any GitHub profile into a recruiter-ready analytics dashboard in seconds.
        </p>

        <div className="w-full max-w-2xl mb-12">
          <SearchBar />
        </div>

      </main>

      <footer className="relative z-10 py-8 text-[11px] font-bold uppercase tracking-[0.2em] text-center text-gray-300 dark:text-gray-700">
        &copy; {currentYear} Suhani Yadav • All rights reserved
      </footer>
    </div>
  );
}