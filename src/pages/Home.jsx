import React, { useState, useEffect } from 'react';
import { Activity, Moon, Sun, Book, Star, GitFork, Users } from 'lucide-react';
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
  const waveColor = isDark ? '%23334155' : 'currentColor';

  return (
    <div className="h-screen max-h-screen bg-white dark:bg-[#0A1A14] text-[#0A1A14] dark:text-[#E8F3EE] transition-colors duration-300 flex flex-col font-sans relative overflow-hidden">
      
      <div 
        className="absolute inset-0 z-0 opacity-[0.06] dark:opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.1 18.3c.8-.8 1.5-1.6 2.3-2.5.8-.8 1.5-1.6 2.3-2.5.8-.8 1.5-1.6 2.3-2.5.8-.8 1.5-1.6 2.3-2.5.8-.8 1.5-1.6 2.3-2.5.8-.8 1.5-1.6 2.3-2.5.8-.8 1.5-1.6 2.3-2.5.8-.8 1.5-1.6 2.3-2.5.8-.8 1.5-1.6 2.3-2.5.8-.8 1.5-1.6 2.3-2.5.8-.8 1.5-1.6 2.3-2.5.8-.8 1.5-1.6 2.3-2.5.8-.8 1.5-1.6 2.3-2.5.8-.8 1.5-1.6 2.3-2.5.8-.8 1.5-1.6 2.3-2.5.8-.8 1.5-1.6 2.3-2.5.8-.8 1.5-1.6 2.3-2.5.8-.8 1.5-1.6 2.3-2.5.8-.8 1.5-1.6 2.3-2.5' fill='none' stroke='${waveColor}' stroke-width='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 20px'
        }}
      />
      
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Cdefs%3E%3Cpattern id='p' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Cpath d='M0 50 Q 25 0, 50 50 T 100 50' fill='none' stroke='${waveColor}' stroke-width='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23p)'/%3E%3C/svg%3E")`,
        }}
      />

      <nav className="relative z-10 flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 text-white bg-[#0A1A14] dark:bg-[#2DCD8D] dark:text-[#0A1A14] rounded-lg">
            <Activity className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">GitMetrics</span>
          <span className="px-2 py-0.5 text-[10px] font-bold text-[#0A1A14]/40 dark:text-[#2DCD8D]/60 border border-current rounded uppercase tracking-widest">
            V1.0
          </span>
        </div>
        
        <div className="flex items-center gap-6">
          <button onClick={toggleTheme} className="p-2 text-current opacity-60 hover:opacity-100 transition-opacity">
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-medium opacity-60 hover:opacity-100 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-current">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
              <path d="M9 18c-4.51 2-5-2-7-2"></path>
            </svg>
            GitHub
          </a>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col items-center justify-center flex-grow px-4 mx-auto w-full max-w-6xl text-center">
        <div className="flex items-center gap-2 px-3 py-1 mb-6 text-[11px] font-medium text-[#0A1A14]/60 dark:text-[#2DCD8D] bg-white dark:bg-[#11251E] border border-current rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2DCD8D] animate-pulse"></span>
          Live • powered by GitHub API
        </div>

        <h1 className="mb-2 text-5xl md:text-6xl font-bold tracking-tight text-[#0A1A14] dark:text-white leading-tight">
          Engineering intelligence,
        </h1>
        <h2 className="mb-6 text-4xl md:text-5xl font-bold tracking-tight text-[#0A1A14]/30 dark:text-white">
          at a glance.
        </h2>

        <p className="max-w-lg mb-10 text-sm md:text-base text-[#0A1A14]/60 dark:text-[#A8C7B9] leading-relaxed">
          Translate any GitHub profile into a recruiter-ready analytics dashboard in seconds.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-10">
          <StatCard icon={Book} label="REPOSITORIES" value="--" />
          <StatCard icon={Star} label="TOTAL STARS" value="--" />
          <StatCard icon={GitFork} label="TOTAL FORKS" value="--" />
          <StatCard icon={Users} label="FOLLOWERS" value="--" />
        </div>

        <div className="w-full max-w-2xl">
          <SearchBar placeholder="suhaniyadav-netizen" />
        </div>
      </main>

      <footer className="relative z-10 py-6 text-[11px] font-bold uppercase tracking-[0.2em] text-center text-[#0A1A14]/20 dark:text-[#2DCD8D]">
        &copy; {currentYear} Suhani Yadav • All rights reserved
      </footer>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="bg-white dark:bg-[#11251E] border border-[#0A1A14]/10 dark:border-white/10 p-4 rounded-xl text-left transition-all hover:shadow-sm shadow-black/5 dark:shadow-black/20">
      <div className="flex items-center gap-2 text-[#0A1A14]/40 dark:text-white/40 mb-2">
        <Icon className="w-3.5 h-3.5" />
        <span className="text-[10px] font-bold tracking-wider uppercase">{label}</span>
      </div>
      <div className="text-2xl font-bold text-[#0A1A14] dark:text-white">{value}</div>
    </div>
  );
}