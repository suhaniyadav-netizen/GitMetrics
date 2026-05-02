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
    <div className="min-h-screen font-sans bg-[#F9FBFF] dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 relative overflow-hidden flex flex-col transition-colors duration-500">
      
      <div 
        className="absolute inset-0 z-0 opacity-[0.15] dark:opacity-[0.1] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#64748b 0.8px, transparent 0.8px)',
          backgroundSize: '32px 32px'
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-blue-500/10 dark:from-blue-400/5 to-transparent blur-[120px] -z-10 pointer-events-none" />

      <nav className="relative z-10 flex items-center justify-between px-8 py-5 bg-white/40 dark:bg-[#1E293B]/40 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 text-white bg-slate-900 dark:bg-blue-600 rounded-xl shadow-lg">
            <Activity className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">GitMetrics</span>
        </div>
        
        <div className="flex items-center gap-5">
          <button 
            onClick={toggleTheme}
            className="p-2.5 text-slate-500 transition-all bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 hover:shadow-sm"
          >
            {isDark ? <Sun className="w-4 h-4 text-yellow-500" /> : <Moon className="w-4 h-4" />}
          </button>
          
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 transition-all bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700 rounded-full hover:border-slate-300 dark:hover:border-slate-500 hover:shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
              <path d="M9 18c-4.51 2-5-2-7-2"></path>
            </svg>
            GitHub
          </a>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col items-center flex-1 px-4 pt-24 pb-20 mx-auto max-w-6xl md:pt-32">
        
        <div className="flex items-center gap-2 px-4 py-1.5 mb-10 text-[11px] font-bold tracking-[0.15em] uppercase text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-400/10 border border-blue-100 dark:border-blue-400/20 rounded-full">
          <span className="relative flex w-2 h-2">
            <span className="absolute inline-flex w-full h-full rounded-full bg-blue-400 opacity-80 animate-ping"></span>
            <span className="relative inline-flex w-2 h-2 rounded-full bg-blue-500"></span>
          </span>
          Live Engine Active
        </div>

        <h1 className="max-w-4xl mb-8 text-5xl font-bold tracking-tight text-center text-slate-900 dark:text-white md:text-7xl leading-[1.1]">
          Engineering intelligence, <br className="hidden md:block" />
          <span className="text-slate-400 dark:text-slate-500 font-semibold italic">at a glance.</span>
        </h1>

        <p className="max-w-xl mb-14 text-lg text-center text-slate-500 dark:text-slate-400 leading-relaxed font-light">
          Translate any developer's GitHub portfolio into a high-fidelity analytics dashboard instantly. No authentication required.
        </p>

        <div className="w-full max-w-2xl p-2.5 mb-24 bg-white/60 dark:bg-[#1E293B]/60 backdrop-blur-2xl border border-white/80 dark:border-slate-700/50 shadow-2xl shadow-blue-900/5 dark:shadow-none rounded-[2.5rem]">
          <SearchBar />
        </div>

        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-3">
          <FeatureCard 
            icon={BarChart}
            title="Impact Metrics"
            description="Automated cross-repo aggregation reveals technical influence through stars and forks."
          />
          <FeatureCard 
            icon={PieChart}
            title="Stack Mapping"
            description="Precise language proficiency breakdowns visualized to highlight architectural expertise."
          />
          <FeatureCard 
            icon={Zap}
            title="Real-time Fetch"
            description="Leverages modern async data patterns for immediate profiling with zero friction."
          />
        </div>
      </main>

      <footer className="relative z-10 py-10 mt-auto text-[13px] font-medium tracking-wide text-center text-slate-400 dark:text-slate-500 border-t border-slate-200/60 dark:border-slate-800/60">
        &copy; {currentYear} Suhani Yadav • All rights reserved
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="group p-8 transition-all duration-500 bg-white dark:bg-[#1E293B] border border-slate-100 dark:border-slate-800/50 rounded-[2rem] hover:shadow-xl hover:-translate-y-1">
      <div className="flex items-center justify-center w-12 h-12 mb-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors">
        <Icon className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
      </div>
      <h3 className="mb-3 text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
      <p className="text-[15px] leading-relaxed text-slate-500 dark:text-slate-400 font-light">{description}</p>
    </div>
  );
}