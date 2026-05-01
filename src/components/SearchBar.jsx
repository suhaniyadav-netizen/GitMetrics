import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export default function SearchBar() {
  const { username } = useParams();
 
  const [query, setQuery] = useState(username || '');
  const navigate = useNavigate();


  useEffect(() => {
    if (username) {
      setQuery(username);
    } else {
      setQuery('');
    }
  }, [username]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/dashboard/${query.trim()}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-2xl mx-auto">
      <div className="flex items-center w-full p-1.5 bg-white border border-gray-200 shadow-sm rounded-2xl hover:shadow-md transition-shadow focus-within:border-gray-300 focus-within:ring-4 focus-within:ring-gray-50">
        
        <div className="flex items-center justify-center pl-4 pr-2 text-gray-400">
          <Search className="w-5 h-5" />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="suhaniyadav"
          className="flex-1 py-3 text-lg bg-transparent outline-none text-accent placeholder-gray-400"
        />

        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
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
  );
}