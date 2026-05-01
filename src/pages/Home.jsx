import React, { useState, useEffect } from 'react';
import { Activity, BarChart, PieChart, Zap, Moon, Sun } from 'lucide-react';
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
    <div className="min-h-screen font-sans bg-[#FAFAFA] dark:bg-slate-950 text-slate-900 dark:text-slate-100 relative overflow-hidden flex flex-col">
      
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-gray-200/50 dark:from-slate-800/50 to-transparent blur-3xl rounded-full -z-10 pointer-events-none" />

      <nav className="relative z-10 flex items-center justify-between px-6 py-4 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md border-b border-gray-200/50 dark:border-slate-800/50">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 text-white bg-black dark:bg-white dark:text-black rounded-lg shadow-md">
            <Activity className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">GitMetrics</span>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2 text-gray-500 transition-colors bg-white border border-gray-200 rounded-xl hover:bg-gray-50 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 transition-colors bg-white border border-gray-200 shadow-sm rounded-xl hover:bg-gray-50 hover:text-black dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
              <path d="M9 18c-4.51 2-5-2-7-2"></path>
            </svg>
            GitHub
          </a>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col items-center flex-1 px-4 pt-20 pb-16 mx-auto max-w-7xl md:pt-24">
        
        <div className="flex items-center gap-2 px-4 py-1.5 mb-8 text-xs font-semibold tracking-wide text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-400/10 border border-emerald-200/60 dark:border-emerald-400/20 rounded-full shadow-sm">
          <span className="relative flex w-2 h-2">
            <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-80 animate-ping"></span>
            <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-500"></span>
          </span>
          LIVE API CONNECTION
        </div>

        <h1 className="max-w-4xl mb-6 text-4xl font-extrabold tracking-tight text-center text-transparent md:text-6xl bg-clip-text bg-gradient-to-b from-black to-gray-700 dark:from-white dark:to-gray-400">
          Engineering intelligence, <br className="hidden md:block" />
          <span className="text-gray-400 dark:text-gray-500">at a glance.</span>
        </h1>

        <p className="max-w-2xl mb-12 text-base text-center text-gray-500 md:text-lg dark:text-gray-400">
          Instantly translate any GitHub developer profile into a beautiful, recruiter-ready analytics dashboard. No authentication required.
        </p>

        <div className="w-full max-w-2xl p-2 mb-20 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/60 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl">
          <SearchBar />
        </div>

        <div className="grid w-full grid-cols-1 gap-6 pt-16 border-t border-gray-200/60 dark:border-slate-800 md:grid-cols-3 md:gap-8">
          <FeatureCard 
            icon={BarChart}
            title="Instant Analytics"
            description="We calculate cross-repository metrics like total stars and forks on the fly, giving you numbers GitHub hides."
          />
          <FeatureCard 
            icon={PieChart}
            title="Language Profiling"
            description="Visually break down a developer's exact tech stack and language proficiency across their entire public portfolio."
          />
          <FeatureCard 
            icon={Zap}
            title="Lightning Fast"
            description="Built on React and Vite. Data is fetched, aggregated, and visualized in milliseconds without page reloads."
          />
        </div>
      </main>

      <footer className="relative z-10 py-6 mt-auto text-sm text-center text-gray-500 dark:text-gray-400 border-t border-gray-200/60 dark:border-slate-800">
        &copy; {currentYear} Suhani Yadav. All rights reserved.
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="p-6 transition-all duration-300 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-sm rounded-2xl hover:shadow-md hover:-translate-y-1">
      <div className="flex items-center justify-center w-12 h-12 mb-4 bg-gray-50 dark:bg-slate-800 rounded-xl">
        <Icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
      </div>
      <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  );
}