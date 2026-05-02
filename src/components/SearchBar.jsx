import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowRight, X } from 'lucide-react';

export default function SearchBar({ placeholder, onSearch, isLoading }) {
  const [username, setUsername] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!username.trim()) {
        setSuggestions([]);
        setShowDropdown(false);
        return;
      }
      try {
        const res = await fetch(`https://api.github.com/search/users?q=${username}&per_page=6`);
        if (res.ok) {
          const data = await res.json();
          setSuggestions(data.items || []);
          setShowDropdown(true);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [username]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (searchVal = username) => {
    if (searchVal.trim() && onSearch && !isLoading) {
      setShowDropdown(false);
      onSearch(searchVal);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSelectSuggestion = (login) => {
    setUsername(login);
    handleSearch(login);
  };

  return (
    <div ref={wrapperRef} className="relative w-full z-50">
      <div className="flex items-center w-full px-4 py-2 bg-white dark:bg-[#11251E] rounded-xl shadow-sm border border-[#0A1A14]/10 dark:border-white/10 focus-within:border-[#0A1A14]/30 dark:focus-within:border-white/30 transition-colors relative z-10">
        <Search className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
        
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyPress}
          onFocus={() => { if (suggestions.length > 0) setShowDropdown(true); }}
          placeholder={placeholder || "suhaniyadav-netizen"}
          disabled={isLoading}
          className="w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 shadow-none text-[#0A1A14] dark:text-white placeholder-gray-400 font-mono disabled:opacity-50"
        />

        {username && (
          <button
            onClick={() => { setUsername(''); setSuggestions([]); setShowDropdown(false); }}
            className="p-1 mr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <button 
          onClick={() => handleSearch()}
          disabled={isLoading}
          className="flex items-center gap-2 p-2 bg-[#0A1A14] dark:bg-[#2DCD8D] text-white dark:text-[#0A1A14] rounded-lg font-bold text-sm px-5 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
        >
          {isLoading ? 'Searching...' : (
             <>
               Analyze <ArrowRight className="w-4 h-4" />
             </>
          )}
        </button>
      </div>

      {showDropdown && suggestions.length > 0 && (
        <div className="absolute top-full mt-2 left-0 w-full bg-white dark:bg-[#11251E] border border-[#0A1A14]/10 dark:border-white/10 rounded-xl shadow-xl overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-200">
          {suggestions.map((user) => (
            <button
              key={user.id}
              onClick={() => handleSelectSuggestion(user.login)}
              className="w-full flex items-center justify-between px-5 py-3 hover:bg-[#0A1A14]/5 dark:hover:bg-white/5 transition-colors group text-left"
            >
              <div className="flex items-center gap-4">
                <img src={user.avatar_url} alt={user.login} className="w-8 h-8 rounded-full border border-black/5 dark:border-white/5" />
                <span className="font-mono text-sm font-medium text-[#0A1A14] dark:text-[#E8F3EE]">{user.login}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-[#0A1A14] dark:group-hover:text-[#2DCD8D] transition-colors" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}