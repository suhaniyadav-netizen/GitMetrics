import React, { useState } from 'react';
import { Star } from 'lucide-react';

const languageColors = {
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Java: '#b07219',
  TypeScript: '#3178c6',
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#178600',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Ruby: '#701516',
  Go: '#00ADD8',
  Rust: '#dea584',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  PHP: '#4F5D95',
  Shell: '#89e051',
  Move: '#4a9eff',
};

export default function RepoList({ repos }) {
  const [currentPage, setCurrentPage] = useState(1);
  const reposPerPage = 10;

  const totalPages = Math.ceil(repos.length / reposPerPage);
  const startIndex = (currentPage - 1) * reposPerPage;
  const currentRepos = repos.slice(startIndex, startIndex + reposPerPage);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  if (!repos || repos.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 bg-white border border-gray-200 rounded-2xl">
        <p className="text-gray-400">No public repositories found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-2xl">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-sm font-bold tracking-wide text-accent">REPOSITORIES</h3>
        <p className="text-xs text-gray-500">{repos.length} public • non-fork</p>
      </div>

      <div className="divide-y divide-gray-100">
        {currentRepos.map((repo) => (
          <div key={repo.id} className="p-6 transition-colors hover:bg-gray-50">
            <div className="flex items-start justify-between mb-2">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-lg font-bold transition-colors text-accent hover:text-secondary"
              >
                {repo.name}
              </a>
              <div className="text-xs text-gray-400 whitespace-nowrap">
                Updated {new Date(repo.updated_at).toLocaleDateString()}
              </div>
            </div>

            {repo.description && (
              <p className="mb-4 text-sm leading-relaxed text-gray-600 max-w-3xl">
                {repo.description}
              </p>
            )}

            <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
              {repo.language && (
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: languageColors[repo.language] || '#ccc' }}
                  ></span>
                  {repo.language}
                </div>
              )}
              {repo.stargazers_count > 0 && (
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-gray-400" />
                  {repo.stargazers_count}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-medium text-gray-600 transition-colors bg-white border border-gray-200 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Prev
          </button>
          <span className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm font-medium text-gray-600 transition-colors bg-white border border-gray-200 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}