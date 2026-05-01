import React from 'react';
import { Activity, BarChart3, PieChart, Zap, Github } from 'lucide-react';
import SearchBar from '../components/SearchBar';

export default function Home() {
  return (
    <div className="min-h-screen font-sans bg-[#FAFAFA] text-accent relative overflow-hidden">
      
     
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-gray-200/50 to-transparent blur-3xl rounded-full -z-10 pointer-events-none" />

     
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 bg-white/50 backdrop-blur-md border-b border-gray-200/50">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 text-white bg-black rounded-lg shadow-md">
            <Activity className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">GitMetrics</span>
        </div>
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 transition-colors bg-white border border-gray-200 shadow-sm rounded-xl hover:bg-gray-50 hover:text-black"
        >
          <Github className="w-4 h-4" />
          Star on GitHub
        </a>
      </nav>

     
      <main className="relative z-10 flex flex-col items-center px-4 pt-24 pb-16 mx-auto max-w-7xl md:pt-32">
        
      
        <div className="flex items-center gap-2 px-4 py-1.5 mb-8 text-xs font-semibold tracking-wide text-emerald-700 bg-emerald-50 border border-emerald-200/60 rounded-full shadow-sm">
          <span className="relative flex w-2 h-2">
            <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-80 animate-ping"></span>
            <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-500"></span>
          </span>
          LIVE API CONNECTION
        </div>

        
        <h1 className="max-w-4xl mb-6 text-5xl font-extrabold tracking-tight text-center text-transparent md:text-7xl bg-clip-text bg-gradient-to-b from-black to-gray-700">
          Engineering intelligence, <br className="hidden md:block" />
          <span className="text-gray-400">at a glance.</span>
        </h1>

        <p className="max-w-2xl mb-12 text-lg text-center text-gray-500 md:text-xl">
          Instantly translate any GitHub developer profile into a beautiful, recruiter-ready analytics dashboard. No authentication required.
        </p>

       
        <div className="w-full max-w-2xl p-2 mb-20 bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl">
          <SearchBar />
        </div>

      
        <div className="grid w-full grid-cols-1 gap-6 pt-16 border-t border-gray-200/60 md:grid-cols-3 md:gap-8">
          
          <FeatureCard 
            icon={BarChart3}
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
    </div>
  );
}


function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="p-6 transition-all duration-300 bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-md hover:-translate-y-1">
      <div className="flex items-center justify-center w-12 h-12 mb-4 bg-gray-50 rounded-xl">
        <Icon className="w-6 h-6 text-gray-700" />
      </div>
      <h3 className="mb-2 text-lg font-bold text-gray-900">{title}</h3>
      <p className="text-sm leading-relaxed text-gray-500">{description}</p>
    </div>
  );
}