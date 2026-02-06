import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getWordSets } from '../services/api';
import { Header } from '../components/Header';

export const Home: React.FC = () => {
  const { data: wordSets = [], isLoading: loading, isError } = useQuery({
    queryKey: ['wordSets'],
    queryFn: getWordSets,
  });

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-brand-parchment tracking-tight">Select a Word Set</h1>

        {loading && <div className="text-center p-4 text-brand-parchment/60">Loading...</div>}
        {isError && <div className="text-center p-4 text-brand-sunset-end">Failed to load word sets.</div>}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {wordSets.map((ws) => (
            <Link key={ws.id} to={`/play/${ws.id}`} className="block p-6 bg-brand-parchment rounded-2xl border-4 border-brand-parchment hover:border-brand-amber shadow-lg hover:shadow-brand-amber/20 hover:-translate-y-1 transition-all duration-300 group">
              <h2 className="text-2xl font-extrabold text-brand-onyx mb-3 uppercase tracking-wide">{ws.title}</h2>
              <div className="flex items-center justify-between text-sm text-brand-onyx/60 font-mono">
                <span>{ws.published_at ? new Date(ws.published_at).toLocaleDateString() : 'Draft'}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-brand-amber font-bold">PLAY →</span>
              </div>
            </Link>
          ))}
        </div>

        {!loading && wordSets.length === 0 && !isError && (
            <div className="text-center text-brand-parchment/50 font-mono mt-12">No word sets available.</div>
        )}
      </main>
    </div>
  );
};
