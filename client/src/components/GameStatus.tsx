import React from 'react';
import type { GameStatus as StatusType } from '../types';

interface GameStatusProps {
  status: StatusType;
  guesses: string[];
  maxGuesses: number;
  onReset?: () => void;
}

export const GameStatus: React.FC<GameStatusProps> = ({ status, guesses, maxGuesses, onReset }) => {
  const guessesLeft = maxGuesses - guesses.length;

  return (
    <div className="mt-6 p-4 border rounded-lg bg-gray-50 max-w-md mx-auto shadow-sm">
      {status === 'playing' && (
        <div>
          <p className="font-bold text-gray-700">Guesses left: <span className="text-blue-600">{guessesLeft}</span></p>
          {guesses.length > 0 && (
            <div className="mt-2 text-sm">
              <span className="text-gray-500">Incorrect: </span>
              <span className="text-red-600 font-medium">{guesses.join(', ')}</span>
            </div>
          )}
        </div>
      )}

      {status === 'won' && (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">You Won! 🎉</h2>
          <button onClick={onReset} className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors">
            Play Again
          </button>
        </div>
      )}

      {status === 'lost' && (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Game Over</h2>
          <button onClick={onReset} className="px-6 py-2 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition-colors">
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};
