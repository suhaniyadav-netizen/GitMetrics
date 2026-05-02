import React, { useState, useEffect } from 'react';
import { Activity, Moon, Sun, Book, Star, GitFork, Users, MapPin, Calendar, Building, Link2 } from 'lucide-react';
import SearchBar from '../components/SearchBar';

const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
  return num;
};

const getLangColor = (index) => {
  const colors = ['bg-[#0A1A14] dark:bg-[#2DCD8D]', 'bg-gray-400', 'bg-gray-300', 'bg-gray-200', 'bg-gray-100'];
  return colors[index % colors.length];
};

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [languages, setLanguages] = useState([]);
  
  const [stats, setStats] = useState({
    repos: '--',
    stars: '--',
    forks: '--',
    followers: '--'
  });

  useEffect(() => {
    const theme = localStorage.theme;
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
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

  const handleGithubSearch = async (username) => {
    setIsLoading(true);
    setErrorMsg('');
    
    try {
      const userRes = await fetch(`https://api.github.com/users/${username}`);
      
      if (userRes.status === 403) throw new Error("GitHub API limit reached.");
      if (!userRes.ok) throw new Error("User not found.");
      
      const userData = await userRes.json();
      
      const repoRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`);
      const reposData = await repoRes.json();
      
      const totalStars = Array.isArray(reposData) ? reposData.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0) : 0;
      const totalForks = Array.isArray(reposData) ? reposData.reduce((acc, repo) => acc + (repo.forks_count || 0), 0) : 0;

      const langCounts = {};
      let validLangRepos = 0;
      if (Array.isArray(reposData)) {
        reposData.forEach(r => {
          if (r.language) {
            langCounts[r.language] = (langCounts[r.language] || 0) + 1;
            validLangRepos++;
          }
        });
      }
      
      const langArray = Object.entries(langCounts)
        .map(([name, count]) => ({ name, percent: Math.round((count / validLangRepos) * 100) }))
        .sort((a, b) => b.percent - a.percent)
        .slice(0, 5);

      setStats({
        repos: formatNumber(userData.public_repos || 0),
        stars: formatNumber(totalStars),
        forks: formatNumber(totalForks),
        followers: formatNumber(userData.followers || 0)
      });
      
      setProfile(userData);
      setRepos(reposData || []);
      setLanguages(langArray);

    } catch (error) {
      setErrorMsg(error.message);
      setProfile(null);
      setRepos([]);
      setStats({ repos: '--', stars: '--', forks: '--', followers: '--' });
    } finally {
      setIsLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const waveColor = isDark ? '%23334155' : 'currentColor';
  
  const topRepos = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6);
  const maxImpact = Math.max(...topRepos.map(r => Math.max(r.stargazers_count, r.forks_count)), 1);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A1A14] text-[#0A1A14] dark:text-[#E8F3EE] transition-colors duration-300 flex flex-col font-sans relative overflow-x-hidden">
      
      <div 
        className="fixed inset-0 z-0 opacity-[0.08] dark:opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.1 18.3c.8-.8 1.5-1.6 2.3-2.5.8-.8 1.5-1.6 2.3-2.5.8-.8 1.5-1.6 2.3-2.5.8-.8 1.5-1.6 2.3-2.5.8-.8 1.5-1.6 2.3-2.5.8-.8 1.5-1.6 2.3-2.5.8-.8 1.5-1.6 2.3-2.5.8-.8 1.5-1.6 2.3-2.5.8-.8 1.5-1.6 2.3-2.5.8-.8 1.5-1.6 2.3-2.5.8-.8 1.5-1.6 2.3-2.5.8-.8 1.5-1.6 2.3-2.5.8-.8 1.5-1.6 2.3-2.5.8-.8 1.5-1.6 2.3-2.5.8-.8 1.5-1.6 2.3-2.5.8-.8 1.5-1.6 2.3-2.5.8-.8 1.5-1.6 2.3-2.5.8-.8 1.5-1.6 2.3-2.5.8-.8 1.5-1.6 2.3-2.5.8-.8 1.5-1.6 2.3-2.5' fill='none' stroke='${waveColor}' stroke-width='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 20px'
        }}
      />
      <div 
        className="fixed inset-0 z-0 opacity-[0.04] dark:opacity-[0.1] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Cdefs%3E%3Cpattern id='p' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Cpath d='M0 50 Q 25 0, 50 50 T 100 50' fill='none' stroke='${waveColor}' stroke-width='0.6'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23p)'/%3E%3C/svg%3E")`,
        }}
      />

      <nav className="relative z-10 flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 text-white bg-[#0A1A14] dark:bg-[#2DCD8D] dark:text-[#0A1A14] rounded-lg">
            <Activity className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">GitMetrics</span>
          <span className="px-2 py-0.5 text-[10px] font-bold text-[#0A1A14]/40 dark:text-[#2DCD8D]/60 border border-current rounded uppercase tracking-widest">V1.0</span>
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

      <main className="relative z-10 flex flex-col items-center flex-grow px-4 mx-auto w-full max-w-6xl py-8">
        
        {!profile && (
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-[11px] font-medium text-[#0A1A14]/60 dark:text-[#2DCD8D] bg-white dark:bg-[#11251E] border border-[#0A1A14]/10 dark:border-[#2DCD8D]/20 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2DCD8D] animate-pulse"></span>
              Live • powered by GitHub API
            </div>
            <h1 className="mb-2 text-5xl md:text-6xl font-bold tracking-tight text-[#0A1A14] dark:text-white leading-tight">Engineering intelligence,</h1>
            <h2 className="mb-6 text-4xl md:text-5xl font-bold tracking-tight text-[#0A1A14]/30 dark:text-white">at a glance.</h2>
            <p className="max-w-lg mx-auto text-sm md:text-base text-[#0A1A14]/60 dark:text-[#A8C7B9] leading-relaxed">
              Translate any GitHub profile into a recruiter-ready analytics dashboard in seconds.
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-8">
          <StatCard icon={Book} label="REPOSITORIES" value={stats.repos} />
          <StatCard icon={Star} label="TOTAL STARS" value={stats.stars} />
          <StatCard icon={GitFork} label="TOTAL FORKS" value={stats.forks} />
          <StatCard icon={Users} label="FOLLOWERS" value={stats.followers} />
        </div>

        <div className="w-full max-w-2xl flex flex-col items-center mb-12">
          <SearchBar placeholder="suhaniyadav-netizen" onSearch={handleGithubSearch} isLoading={isLoading} />
          {errorMsg && <div className="mt-4 text-sm text-red-500 font-medium">{errorMsg}</div>}
        </div>

        {profile && (
          <div className="w-full flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-white dark:bg-[#11251E] border border-[#0A1A14]/10 dark:border-white/10 rounded-xl p-6 shadow-sm shadow-black/5 dark:shadow-black/20">
                <div className="flex items-center gap-4 mb-6">
                  <img src={profile.avatar_url} alt="avatar" className="w-16 h-16 rounded-full border border-[#0A1A14]/10 dark:border-white/10" />
                  <div>
                    <h3 className="text-lg font-bold text-[#0A1A14] dark:text-white">{profile.name || profile.login}</h3>
                    <a href={profile.html_url} target="_blank" rel="noreferrer" className="text-sm text-gray-500 hover:text-blue-500 transition-colors flex items-center gap-1">
                      @{profile.login} <Link2 className="w-3 h-3" />
                    </a>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 border-y border-[#0A1A14]/5 dark:border-white/5 py-4 mb-4 text-center">
                  <div>
                    <div className="font-bold text-[#0A1A14] dark:text-white">{formatNumber(profile.public_repos)}</div>
                    <div className="text-[10px] uppercase text-gray-500 tracking-wider">Repos</div>
                  </div>
                  <div className="border-x border-[#0A1A14]/5 dark:border-white/5">
                    <div className="font-bold text-[#0A1A14] dark:text-white">{formatNumber(profile.followers)}</div>
                    <div className="text-[10px] uppercase text-gray-500 tracking-wider">Followers</div>
                  </div>
                  <div>
                    <div className="font-bold text-[#0A1A14] dark:text-white">{formatNumber(profile.following)}</div>
                    <div className="text-[10px] uppercase text-gray-500 tracking-wider">Following</div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 text-sm text-gray-600 dark:text-gray-400">
                  {profile.company && (
                    <div className="flex items-center gap-2"><Building className="w-4 h-4 opacity-70" /> {profile.company}</div>
                  )}
                  {profile.location && (
                    <div className="flex items-center gap-2"><MapPin className="w-4 h-4 opacity-70" /> {profile.location}</div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 opacity-70" /> 
                    Joined {new Date(profile.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-[#11251E] border border-[#0A1A14]/10 dark:border-white/10 rounded-xl p-6 shadow-sm shadow-black/5 dark:shadow-black/20">
                <div className="flex justify-between items-end mb-6">
                  <h3 className="font-bold text-[#0A1A14] dark:text-white">Languages</h3>
                  <span className="text-xs text-gray-500">{languages.length} detected</span>
                </div>
                
                <div className="w-full h-3 rounded-full overflow-hidden flex mb-6 bg-gray-100 dark:bg-gray-800">
                  {languages.map((l, i) => (
                    <div key={l.name} style={{ width: `${l.percent}%` }} className={`h-full ${getLangColor(i)}`}></div>
                  ))}
                </div>

                <div className="flex flex-col gap-3">
                  {languages.map((l, i) => (
                    <div key={l.name} className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${getLangColor(i)}`}></span>
                        <span className="text-gray-700 dark:text-gray-300">{l.name}</span>
                      </div>
                      <span className="text-gray-500">{l.percent}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-[#11251E] border border-[#0A1A14]/10 dark:border-white/10 rounded-xl p-6 shadow-sm shadow-black/5 dark:shadow-black/20 flex flex-col overflow-hidden">
                <div className="flex justify-between items-end mb-6">
                  <h3 className="font-bold text-[#0A1A14] dark:text-white">Repository impact</h3>
                  <span className="text-xs text-gray-500">Top 6 • stars / forks</span>
                </div>
                
                <div className="flex-grow flex items-end justify-between gap-2 h-40 border-b border-[#0A1A14]/10 dark:border-white/10 pb-2 relative">
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 dark:opacity-10">
                    <div className="border-t border-dashed border-gray-400 w-full h-0"></div>
                    <div className="border-t border-dashed border-gray-400 w-full h-0"></div>
                    <div className="border-t border-dashed border-gray-400 w-full h-0"></div>
                    <div className="border-t border-dashed border-gray-400 w-full h-0"></div>
                  </div>

                  {topRepos.map(repo => (
                    <div key={repo.id} className="flex flex-col items-center justify-end h-full flex-1 min-w-0 gap-2 relative z-10">
                      <div className="flex items-end justify-center w-full h-full gap-1">
                        <div style={{ height: `${Math.max((repo.stargazers_count / maxImpact) * 100, 2)}%` }} className="w-1/2 max-w-[12px] bg-[#0A1A14] dark:bg-white rounded-t-sm transition-all duration-1000"></div>
                        <div style={{ height: `${Math.max((repo.forks_count / maxImpact) * 100, 2)}%` }} className="w-1/2 max-w-[12px] bg-gray-400 dark:bg-gray-600 rounded-t-sm transition-all duration-1000"></div>
                      </div>
                      <span className="text-[9px] truncate w-full text-center text-gray-500" title={repo.name}>{repo.name}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#0A1A14] dark:bg-white"></span> stars</div>
                  <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-600"></span> forks</div>
                </div>
              </div>

            </div>

            <div className="bg-white dark:bg-[#11251E] border border-[#0A1A14]/10 dark:border-white/10 rounded-xl p-6 shadow-sm shadow-black/5 dark:shadow-black/20 overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-4 border-b border-[#0A1A14]/5 dark:border-white/5 gap-4">
                <div>
                  <h3 className="font-bold text-lg text-[#0A1A14] dark:text-white">Repositories</h3>
                  <span className="text-xs text-gray-500">{profile.public_repos} public • non-fork</span>
                </div>
                <div className="flex items-center border border-[#0A1A14]/10 dark:border-white/10 rounded-lg overflow-hidden text-xs font-medium">
                  <button className="px-3 py-1.5 bg-[#0A1A14]/5 dark:bg-white/10 text-[#0A1A14] dark:text-white">stars</button>
                  <button className="px-3 py-1.5 hover:bg-[#0A1A14]/5 dark:hover:bg-white/10 text-gray-500 border-l border-[#0A1A14]/10 dark:border-white/10 transition-colors">updated</button>
                  <button className="px-3 py-1.5 hover:bg-[#0A1A14]/5 dark:hover:bg-white/10 text-gray-500 border-l border-[#0A1A14]/10 dark:border-white/10 transition-colors">name</button>
                </div>
              </div>

              <div className="flex flex-col">
                {repos.slice(0, 5).map(repo => (
                  <div key={repo.id} className="py-4 border-b border-[#0A1A14]/5 dark:border-white/5 last:border-0 last:pb-0 flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div>
                      <a href={repo.html_url} target="_blank" rel="noreferrer" className="font-bold text-[#0A1A14] dark:text-white text-base hover:text-blue-500 transition-colors">{repo.name}</a>
                      <p className="text-sm text-gray-500 my-2">{repo.description || 'No description provided.'}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        {repo.language && (
                          <div className="flex items-center gap-1">
                            <span className="w-2.5 h-2.5 rounded-full bg-gray-400 dark:bg-gray-600"></span> {repo.language}
                          </div>
                        )}
                        <div className="flex items-center gap-1"><Star className="w-3.5 h-3.5" /> {formatNumber(repo.stargazers_count)}</div>
                        <div className="flex items-center gap-1"><GitFork className="w-3.5 h-3.5" /> {formatNumber(repo.forks_count)}</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 whitespace-nowrap">
                      Updated {new Date(repo.updated_at).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </main>

      <footer className="relative z-10 py-6 text-[11px] font-bold uppercase tracking-[0.2em] text-center text-[#0A1A14]/20 dark:text-[#2DCD8D]">
        &copy; {currentYear} Suhani Yadav • All rights reserved
      </footer>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="bg-white dark:bg-[#11251E] border border-[#0A1A14]/10 dark:border-white/10 p-4 rounded-xl text-left transition-all shadow-sm shadow-black/5 dark:shadow-black/20">
      <div className="flex items-center gap-2 text-[#0A1A14]/40 dark:text-white/40 mb-2">
        <Icon className="w-3.5 h-3.5" />
        <span className="text-[10px] font-bold tracking-wider uppercase">{label}</span>
      </div>
      <div className="text-2xl font-bold text-[#0A1A14] dark:text-white">{value}</div>
    </div>
  );
}