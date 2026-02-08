import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getWordSets } from '../services/api';
import { Header } from '../components/Header';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Loader2, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export const WordSetList: React.FC = () => {
  const [page, setPage] = useState(1);
  const limit = 9;

  const { data, isLoading: loading, isError } = useQuery({
    queryKey: ['wordSets', page],
    queryFn: () => getWordSets(page, limit),
    placeholderData: keepPreviousData,
  });

  const wordSets = data?.data || [];
  const totalPages = data?.meta.totalPages || 0;

  return (
    <div className="min-h-screen bg-neo-bg">
      <Header />
      <Container className="py-12">
        <div className="mb-12 text-center">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4 drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
            Select Set
          </h1>
          <p className="text-xl font-bold uppercase tracking-wide bg-neo-accent inline-block px-4 py-1 border-2 border-black rotate-2 shadow-neo-sm">
            Choose your challenge
          </p>
        </div>

        {loading && (
          <div className="flex justify-center p-12">
            <Loader2 className="h-12 w-12 animate-spin text-black" />
          </div>
        )}

        {isError && (
          <div className="flex justify-center p-12">
            <div className="flex items-center gap-2 text-neo-accent font-bold text-xl uppercase">
               <AlertCircle className="h-8 w-8" />
               Failed to load word sets
            </div>
          </div>
        )}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {wordSets.map((ws, i) => (
            <Link key={ws.id} to={`/play/${ws.id}`} className="block group">
              <Card hoverEffect className={`h-full flex flex-col justify-between ${i % 3 === 1 ? 'rotate-1' : i % 3 === 2 ? '-rotate-1' : 'rotate-0'}`}>
                <div>
                  <div className="flex justify-between items-start mb-4">
                     <Badge variant="secondary" shape="pill" size="sm">
                        #{ws.id}
                     </Badge>
                     {ws.published_at ? (
                        <span className="text-xs font-bold border-2 border-black px-2 py-0.5 bg-white">
                          {new Date(ws.published_at).toLocaleDateString()}
                        </span>
                     ) : (
                        <Badge variant="muted" size="sm">Draft</Badge>
                     )}
                  </div>
                  <h2 className="text-3xl font-black uppercase leading-none mb-2 break-words group-hover:text-neo-accent transition-colors">
                    {ws.title}
                  </h2>
                </div>
                <div className="mt-6 pt-4 border-t-4 border-black border-dashed flex justify-end">
                   <span className="font-bold uppercase text-sm group-hover:underline decoration-4 decoration-neo-accent underline-offset-4">
                     Play Now &rarr;
                   </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {!loading && wordSets.length === 0 && !isError && (
            <div className="text-center text-gray-500 font-bold uppercase mt-12">No word sets available.</div>
        )}

        {/* Pagination Controls */}
        {!loading && !isError && totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-4">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 border-2 border-black bg-white shadow-neo-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <span className="font-bold uppercase">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 border-2 border-black bg-white shadow-neo-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        )}
      </Container>
    </div>
  );
};
