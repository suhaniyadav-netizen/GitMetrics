import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../store/userSlice';
import { Activity, Github, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const { username } = useParams();
  const dispatch = useDispatch();
  
  // Pulling state directly from our Redux store
  const { profile, status, error } = useSelector((state) => state.user);

  // Trigger the API call as soon as the component loads
  useEffect(() => {
    if (username) {
      dispatch(fetchUserData(username));
    }
  }, [username, dispatch]);

  // Handle Loading State
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-8 h-8 border-4 rounded-full border-secondary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  // Handle Error State (e.g., User doesn't exist or API limit reached)
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
      
      {/* 1:1 Top Navigation Bar */}
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
            <Github className="w-4 h-4" />
            GitHub
          </a>
        )}
      </header>

      {/* Main Dashboard Layout */}
      <main className="px-4 py-8 mx-auto max-w-7xl">
        {profile && (
          <div>
            <h1 className="mb-4 text-2xl font-bold">Data Fetched Successfully!</h1>
            <p className="mb-4 text-gray-500">
              The API is working perfectly. Here is the raw data we will use to build the Profile Card and Stats in the next step:
            </p>
            <pre className="p-4 overflow-auto text-sm text-green-400 bg-gray-900 rounded-xl">
              {JSON.stringify(profile, null, 2)}
            </pre>
          </div>
        )}
      </main>

    </div>
  );
}