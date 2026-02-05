import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getWordSets } from '../services/api';
import type { WordSetSummary } from '../types';
import { Header } from '../components/Header';

export const Home: React.FC = () => {
  const [wordSets, setWordSets] = useState<WordSetSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getWordSets()
      .then(setWordSets)
      .catch((err) => {
        console.error(err);
        setError('Failed to load word sets.');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Select a Word Set</h1>

        {loading && <div className="text-center p-4">Loading...</div>}
        {error && <div className="text-center p-4 text-red-600">{error}</div>}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {wordSets.map((ws) => (
            <Link key={ws.id} to={`/play/${ws.id}`} className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200">
              <h2 className="text-xl font-bold text-blue-600 mb-2">{ws.title}</h2>
              <div className="text-sm text-gray-500">
                {ws.published_at ? new Date(ws.published_at).toLocaleDateString() : 'Draft'}
              </div>
            </Link>
          ))}
        </div>

        {!loading && wordSets.length === 0 && !error && (
            <div className="text-center text-gray-500">No word sets available.</div>
        )}
      </main>
    </div>
  );
};
