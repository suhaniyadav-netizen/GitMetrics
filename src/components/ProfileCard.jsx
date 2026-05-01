import React from 'react';
import { MapPin, Link as LinkIcon, Calendar, ExternalLink } from 'lucide-react';

export default function ProfileCard({ profile }) {
 
  const joinDate = new Date(profile.created_at).toLocaleDateString('en-US', { 
    month: 'short', 
    year: 'numeric' 
  });

  return (
    <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-2xl h-fit">
      
      
      <div className="flex items-start gap-4 mb-6">
        <img 
          src={profile.avatar_url} 
          alt={profile.name} 
          className="w-16 h-16 border border-gray-100 rounded-full shadow-sm" 
        />
        <div>
          <h2 className="text-xl font-bold text-accent">{profile.name || profile.login}</h2>
          <a 
            href={profile.html_url} 
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center gap-1 text-sm text-gray-500 transition-colors hover:text-secondary"
          >
            @{profile.login} <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      
      {profile.bio && (
        <p className="mb-6 text-sm leading-relaxed text-gray-600">{profile.bio}</p>
      )}

   
      <div className="grid grid-cols-3 gap-2 p-3 mb-6 text-center border border-gray-100 divide-x divide-gray-200 bg-gray-50 rounded-xl">
        <div>
          <div className="text-lg font-bold text-accent">{profile.public_repos}</div>
          <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mt-1">Repos</div>
        </div>
        <div>
          <div className="text-lg font-bold text-accent">{profile.followers}</div>
          <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mt-1">Followers</div>
        </div>
        <div>
          <div className="text-lg font-bold text-accent">{profile.following}</div>
          <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mt-1">Following</div>
        </div>
      </div>

    
      <div className="space-y-3 text-sm text-gray-600">
        {profile.location && (
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
            <span className="truncate">{profile.location}</span>
          </div>
        )}
        {profile.blog && (
          <div className="flex items-center gap-3">
            <LinkIcon className="w-4 h-4 text-gray-400 shrink-0" />
            <a 
              href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`} 
              target="_blank" 
              rel="noreferrer" 
              className="truncate transition-colors hover:text-secondary hover:underline"
            >
              {profile.blog}
            </a>
          </div>
        )}
        <div className="flex items-center gap-3">
          <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
          <span>Joined {joinDate}</span>
        </div>
      </div>

    </div>
  );
}