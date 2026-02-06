import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getWordSet } from '../services/api';
import { useGame } from '../hooks/useGame';
import { Header } from '../components/Header';
import { WordChain } from '../components/WordChain';
import { GameStatus } from '../components/GameStatus';
import { Container } from '../components/ui/Container';
import { Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Game: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: wordSet = null, isLoading: loading, isError } = useQuery({
    queryKey: ['wordSet', id],
    queryFn: () => getWordSet(parseInt(id!)),
    enabled: !!id,
  });

  const {
    currentWordIndex,
    guesses,
    mistakes,
    status,
    isRevealed,
    revealedIndices,
    submitGuess,
    resetGame,
    words,
    maxGuesses
  } = useGame(wordSet);

  if (loading) {
    return (
        <div className="min-h-screen bg-neo-bg flex items-center justify-center">
             <Loader2 className="h-12 w-12 animate-spin" />
        </div>
    );
  }

  if (isError || !wordSet) {
      return (
          <div className="min-h-screen bg-neo-bg">
              <Header />
              <Container className="text-center py-20">
                <div className="text-4xl font-black mb-8 uppercase">Failed to load word set</div>
                <Link to="/">
                    <Button>Back to Home</Button>
                </Link>
              </Container>
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-neo-bg pb-20">
      <Header />
      <Container size="md" className="py-6">
        <div className="sticky top-0 z-10 bg-neo-bg/95 backdrop-blur-sm pb-4 pt-2 border-b-4 border-black border-dashed mb-8">
            <div className="mb-4 flex justify-between items-center">
                <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight truncate pr-4">
                    {wordSet.title}
                </h1>
                <Link to="/">
                    <Button variant="ghost" size="sm" className="whitespace-nowrap">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Exit
                    </Button>
                </Link>
            </div>

            <GameStatus
                status={status}
                guesses={guesses}
                mistakes={mistakes}
                maxGuesses={maxGuesses}
                onReset={resetGame}
            />
        </div>

        <WordChain
            words={words}
            currentWordIndex={currentWordIndex}
            isRevealed={isRevealed}
            revealedIndices={revealedIndices}
            onGuess={submitGuess}
        />
      </Container>
    </div>
  );
};
