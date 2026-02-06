import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getWordSet } from '../services/api';
import { useGame } from '../hooks/useGame';
import { Header } from '../components/Header';
import { WordChain } from '../components/WordChain';
import { GuessInput } from '../components/GuessInput';
import { GameStatus } from '../components/GameStatus';

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

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (isError) return (
      <div className="min-h-screen">
          <Header />
          <div className="p-8 text-center">
            <div className="text-brand-sunset-end mb-4">Failed to load word set.</div>
            <Link to="/" className="text-brand-amber hover:underline">Back to Home</Link>
          </div>
      </div>
  );
  if (!wordSet) return null;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto p-4 max-w-2xl">
        <div className="sticky top-0 z-10 bg-brand-onyx pb-4 pt-2">
            <div className="mb-4 flex justify-between items-center border-b border-brand-parchment/10 pb-2">
                <h1 className="text-2xl font-extrabold text-brand-parchment uppercase tracking-wide">{wordSet.title}</h1>
                <Link to="/" className="text-sm text-brand-amber hover:text-brand-sunset-start font-medium">← Change Set</Link>
            </div>

            <div className="bg-brand-onyx border-2 border-brand-parchment/20 p-4 rounded-xl shadow-lg">
                <GameStatus
                    status={status}
                    guesses={guesses}
                    mistakes={mistakes}
                    maxGuesses={maxGuesses}
                    onReset={resetGame}
                />

                <GuessInput
                    onGuess={submitGuess}
                    disabled={status !== 'playing'}
                />
            </div>
        </div>

        <div className="bg-brand-onyx p-6 rounded-xl shadow-lg border-2 border-brand-parchment/20 mt-4">
            <WordChain
                words={words}
                currentWordIndex={currentWordIndex}
                isRevealed={isRevealed}
                revealedIndices={revealedIndices}
            />
        </div>
      </main>
    </div>
  );
};
