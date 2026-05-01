import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, ChevronRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function SearchBar() {
  const { username } = useParams();
  const [query, setQuery] = useState(username || '');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (username) {
      setQuery(username);
    } else {
      setQuery('');
    }
  }, [username]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim().length < 2) {
        setSuggestions([]);
        setShowDropdown(false);
        return;
      }

      try {
        const response = await axios.get(`https://api.github.com/search/users?q=${query}&per_page=6`);
        setSuggestions(response.data.items);
        setShowDropdown(true);
      } catch (error) {
        console.error("Failed to fetch suggestions");
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setShowDropdown(false);
      navigate(`/dashboard/${query.trim()}`);
    }
  };

  const handleSelect = (selectedUsername) => {
    setQuery(selectedUsername);
    setShowDropdown(false);
    navigate(`/dashboard/${selectedUsername}`);
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="relative z-10 flex items-center w-full p-1.5 bg-white border border-gray-200 shadow-sm rounded-2xl hover:shadow-md transition-shadow focus-within:border-gray-300 focus-within:ring-4 focus-within:ring-gray-50">
          
          <div className="flex items-center justify-center pl-4 pr-2 text-gray-400">
            <Search className="w-5 h-5" />
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              if (suggestions.length > 0) setShowDropdown(true);
            }}
            placeholder="suhaniyadav"
            className="flex-1 py-3 text-lg bg-transparent outline-none text-accent placeholder-gray-400"
          />

          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setSuggestions([]);
                setShowDropdown(false);
              }}
              className="p-2 mr-1 text-gray-400 transition-colors hover:text-gray-600 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 font-medium text-white transition-colors bg-accent rounded-xl hover:bg-black"
          >
            Analyze
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>
      </form>

      {showDropdown && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 z-50 mt-2 overflow-hidden bg-white border border-gray-200 shadow-xl rounded-2xl">
          <div className="flex flex-col divide-y divide-gray-100">
            {suggestions.map((user) => (
              <button
                key={user.id}
                onClick={() => handleSelect(user.login)}
                className="flex items-center justify-between w-full px-4 py-3 transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar_url}
                    alt={user.login}
                    className="w-8 h-8 border border-gray-100 rounded-full shadow-sm"
                  />
                  <span className="font-mono text-sm font-medium text-accent">{user.login}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}