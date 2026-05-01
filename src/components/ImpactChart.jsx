import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function ImpactChart({ repos }) {
  const topRepos = useMemo(() => {
    return [...repos]
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6)
      .map(repo => ({
        name: repo.name,
        stars: repo.stargazers_count,
        forks: repo.forks_count
      }));
  }, [repos]);

  return (
    <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-2xl h-80">
      <h3 className="mb-4 text-sm font-bold tracking-wide text-accent">REPOSITORY IMPACT</h3>
      {topRepos.length > 0 ? (
        <ResponsiveContainer width="100%" height="85%">
          <BarChart data={topRepos} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis dataKey="name" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="stars" fill="#1E293B" radius={[4, 4, 0, 0]} />
            <Bar dataKey="forks" fill="#94A3B8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-400">No repository data</div>
      )}
    </div>
  );
}