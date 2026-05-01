import React from 'react';
import { BookOpen, Star, GitFork, Users } from 'lucide-react';

export default function StatsRow({ profile }) {
  return (
    <div className="grid grid-cols-2 mb-6 overflow-hidden bg-white border border-gray-200 divide-x divide-y shadow-sm md:grid-cols-4 rounded-2xl md:divide-y-0">
      <StatBox icon={BookOpen} label="REPOSITORIES" value={profile.public_repos} />
      <StatBox icon={Star} label="TOTAL STARS" value="--" />
      <StatBox icon={GitFork} label="TOTAL FORKS" value="--" />
      <StatBox icon={Users} label="FOLLOWERS" value={profile.followers} />
    </div>
  );
}


function StatBox({ icon: Icon, label, value }) {
  return (
    <div className="p-6 transition-colors hover:bg-gray-50">
      <div className="flex items-center gap-2 mb-2 text-xs font-semibold tracking-wider text-gray-500 uppercase">
        <Icon className="w-4 h-4" />
        {label}
      </div>
      <div className="text-3xl font-bold text-accent">{value}</div>
    </div>
  );
}