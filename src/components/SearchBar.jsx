import React, { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ placeholder, onSearch }) {
  const [username, setUsername] = useState('');

  const handleSearch = () => {
    if (username.trim() && onSearch) {
      onSearch(username);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center w-full px-4 py-2 bg-white dark:bg-[#11251E] rounded-xl shadow-sm border border-[#0A1A14]/10 dark:border-white/10">
      <Search className="w-5 h-5 text-gray-400 mr-3" />
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder={placeholder || "suhaniyadav-netizen"}
        className="w-full bg-transparent border-none focus:ring-0 text-[#0A1A14] dark:text-white placeholder-gray-400"
      />
      <button 
        onClick={handleSearch}
        className="ml-2 p-2 bg-[#0A1A14] dark:bg-[#2DCD8D] text-white dark:text-[#0A1A14] rounded-lg font-bold text-sm px-6 hover:opacity-90 transition-opacity"
      >
        Analyze
      </button>
    </div>
  );
}