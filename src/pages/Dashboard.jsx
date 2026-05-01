import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../store/userSlice';
import { Activity, AlertCircle } from 'lucide-react';
import StatsRow from '../components/StatsRow';
import ProfileCard from '../components/ProfileCard';
import LanguageChart from '../components/LanguageChart';
import ImpactChart from '../components/ImpactChart';
import RepoList from '../components/RepoList';

export default function Dashboard() {
  const { username } = useParams();
  const dispatch = useDispatch();
  
  const { profile, repos, status, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (username) {
      dispatch(fetchUserData(username));
    }
  }, [username, dispatch]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-8 h-8 border-4 rounded-full border-secondary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <AlertCircle className="w-12 h-12 mb-4 text-red-500" />
        <h2 className="mb-2 text-2xl font-bold text-accent">Analysis Failed</h2>
        <p className="mb-6 text-gray-600">{error}</p>
        <Link to="/" className="px-6 py-2 font-medium text-white transition-colors rounded-xl bg-accent hover:bg-black">
          Try another search
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans bg-gray-50 text-accent">
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 text-white bg-black rounded-lg">
            <Activity className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold">GitMetrics</span>
          <span className="px-2 py-0.5 text-xs font-medium text-gray-500 bg-gray-100 border border-gray-200 rounded-md">
            v1.0
          </span>
        </Link>
        
        {profile && (
          <a 
            href={profile.html_url} 
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-black"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
              <path d="M9 18c-4.51 2-5-2-7-2"></path>
            </svg>
            GitHub
          </a>
        )}
      </header>

      <main className="px-4 py-8 mx-auto max-w-7xl">
        {profile && (
          <div className="w-full">
            <StatsRow profile={profile} repos={repos} />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
              <div className="md:col-span-1">
                <ProfileCard profile={profile} />
              </div>

              <div className="space-y-6 md:col-span-2 lg:col-span-3">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <LanguageChart repos={repos} />
                  <ImpactChart repos={repos} />
                </div>
                
                <RepoList repos={repos} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}