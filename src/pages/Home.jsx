import React from 'react';

export default function Home() {
  return (
    <div className="relative flex flex-col items-center min-h-screen px-4 overflow-hidden bg-primary pt-20 md:pt-32">
      <div 
        className="absolute inset-0 bg-[size:32px_32px]"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)'
        }}
      />

      <div className="relative z-10 flex flex-col items-center w-full max-w-3xl text-center">
        <div className="flex items-center gap-2 px-3 py-1.5 mb-8 text-xs font-medium text-emerald-600 bg-white border border-emerald-100 rounded-full shadow-sm">
          <span className="relative flex w-2 h-2">
            <span className="absolute inline-flex w-full h-full bg-emerald-400 rounded-full opacity-75 animate-ping"></span>
            <span className="relative inline-flex w-2 h-2 bg-emerald-500 rounded-full"></span>
          </span>
          Live • powered by GitHub API
        </div>

        {/* Hero Typography */}
        <h1 className="mb-6 text-5xl font-semibold tracking-tight text-accent md:text-6xl">
          Engineering intelligence, <br className="hidden md:block" />
          <span className="text-gray-400">at a glance.</span>
        </h1>


        <p className="max-w-xl mb-10 text-lg text-gray-500">
          Translate any GitHub profile into a recruiter-ready analytics dashboard in seconds.
        </p>

        {/* Placeholder for the Search Component we will build next */}
        <div className="w-full p-4 mt-4 text-gray-400 border border-gray-300 border-dashed rounded-xl bg-white/50 backdrop-blur-sm">
          [Search Bar Component goes here]
        </div>

      </div>
    </div>
  );
}