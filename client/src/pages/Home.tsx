import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import { getRandomWordSetId } from '../services/api';
import { Loader2, Play, BookOpen, Grid } from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlePlayNow = async () => {
    try {
      setLoading(true);
      const { id } = await getRandomWordSetId();
      navigate(`/play/${id}`);
    } catch (error) {
      console.error('Failed to get random word set', error);
      // Fallback to puzzles list if random fails
      navigate('/puzzles');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neo-bg">
      <Header />
      <Container className="py-12">
        <div className="flex flex-col gap-12 max-w-4xl mx-auto">

          {/* Hero Section */}
          <div className="text-center space-y-8">
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
              8Words
            </h1>
            <p className="text-2xl font-bold uppercase tracking-wide">
              The daily word chain challenge
            </p>

            <button
              onClick={handlePlayNow}
              disabled={loading}
              className="group relative inline-flex items-center justify-center gap-4 px-12 py-6 text-3xl font-black uppercase tracking-wider bg-neo-accent border-4 border-black shadow-[8px_8px_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[6px_6px_0_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="h-8 w-8 animate-spin" />
              ) : (
                <Play className="h-8 w-8 fill-current" />
              )}
              Play Now
            </button>
          </div>

          {/* View All Puzzles */}
          <Link to="/puzzles" className="block group">
            <Card hoverEffect className="flex flex-col sm:flex-row items-center justify-between p-8 bg-neo-secondary border-4 border-black gap-4 text-center sm:text-left">
              <div className="flex items-center gap-4">
                <Grid className="h-8 w-8" />
                <h2 className="text-2xl font-black uppercase">View All Puzzles</h2>
              </div>
              <span className="font-bold uppercase group-hover:underline decoration-4 underline-offset-4 text-sm sm:text-base">
                Browse Archive &rarr;
              </span>
            </Card>
          </Link>

          {/* How to Play */}
          <Card className="border-4 border-black p-8 bg-white">
            <div className="flex items-center gap-4 mb-6">
              <BookOpen className="h-8 w-8" />
              <h2 className="text-3xl font-black uppercase">How to Play</h2>
            </div>

            <div className="space-y-4 text-lg font-medium">
              <div className="flex gap-4 items-start">
                <div className="bg-black text-white w-8 h-8 flex items-center justify-center font-bold shrink-0 rounded-full">1</div>
                <p>Guess the 8 words related to the daily theme or word chain.</p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-black text-white w-8 h-8 flex items-center justify-center font-bold shrink-0 rounded-full">2</div>
                <p>You have limited lives to complete the set. Wrong guesses cost a life!</p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-black text-white w-8 h-8 flex items-center justify-center font-bold shrink-0 rounded-full">3</div>
                <p>Stuck? Use hints to reveal a letter, but be careful with your guesses.</p>
              </div>
            </div>
          </Card>

        </div>
      </Container>
    </div>
  );
};
