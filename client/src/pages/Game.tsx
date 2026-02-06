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
      <div className="min-h-screen bg-gray-100">
          <Header />
          <div className="p-8 text-center">
            <div className="text-red-600 mb-4">Failed to load word set.</div>
            <Link to="/" className="text-blue-600 hover:underline">Back to Home</Link>
          </div>
      </div>
  );
  if (!wordSet) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto p-4 max-w-2xl">
        <div className="sticky top-0 z-10 bg-gray-100 pb-4 pt-2">
            <div className="mb-2 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">{wordSet.title}</h1>
                <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">← Change Set</Link>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <GameStatus
                    status={status}
                    guesses={guesses}
                    maxGuesses={maxGuesses}
                    onReset={resetGame}
                />

                <GuessInput
                    onGuess={submitGuess}
                    disabled={status !== 'playing'}
                />
            </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mt-4">
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
