import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getWordSet } from '../services/api';
import type { WordSet } from '../types';
import { useGame } from '../hooks/useGame';
import { Header } from '../components/Header';
import { WordChain } from '../components/WordChain';
import { GuessInput } from '../components/GuessInput';
import { GameStatus } from '../components/GameStatus';

export const Game: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [wordSet, setWordSet] = useState<WordSet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    currentWordIndex,
    guesses,
    status,
    isRevealed,
    submitGuess,
    resetGame,
    words,
    maxGuesses
  } = useGame(wordSet);

  useEffect(() => {
    if (id) {
      getWordSet(parseInt(id))
        .then(setWordSet)
        .catch((err) => {
          console.error(err);
          setError('Failed to load word set.');
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error) return (
      <div className="min-h-screen bg-gray-100">
          <Header />
          <div className="p-8 text-center">
            <div className="text-red-600 mb-4">{error}</div>
            <Link to="/" className="text-blue-600 hover:underline">Back to Home</Link>
          </div>
      </div>
  );
  if (!wordSet) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto p-4 max-w-2xl">
        <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">{wordSet.title}</h1>
            <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">← Change Set</Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <WordChain
                words={words}
                currentWordIndex={currentWordIndex}
                isRevealed={isRevealed}
            />

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
      </main>
    </div>
  );
};
