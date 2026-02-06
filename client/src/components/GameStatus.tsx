import React from 'react';
import type { GameStatus as StatusType } from '../types';

interface GameStatusProps {
  status: StatusType;
  guesses: string[];
  mistakes: number;
  maxGuesses: number;
  onReset?: () => void;
}

export const GameStatus: React.FC<GameStatusProps> = ({ status, guesses, mistakes, maxGuesses, onReset }) => {
  const guessesLeft = maxGuesses - mistakes;

  return (
    <div className="flex flex-col items-center gap-4">
      {status === 'playing' && (
        <div className="w-full">
          <div className="flex justify-between items-center mb-2">
            <span className="text-brand-parchment font-sans font-medium text-sm tracking-wide">CHANCE METER</span>
            <span className="text-brand-amber font-mono font-bold">{guessesLeft} / {maxGuesses}</span>
          </div>

          <div className="flex gap-2 justify-center py-2">
            {Array.from({ length: maxGuesses }).map((_, i) => (
              <div
                key={i}
                className={`h-4 w-4 rounded-full border-2 border-brand-amber transition-all duration-300 ${
                  i < guessesLeft
                    ? 'bg-brand-amber shadow-[0_0_10px_rgba(242,169,59,0.5)]'
                    : 'bg-transparent opacity-30'
                }`}
              />
            ))}
          </div>

          {guesses.length > 0 && (
            <div className="mt-4 text-center">
              <div className="text-brand-parchment/60 text-xs uppercase tracking-widest mb-1">Missed Connections</div>
              <div className="flex flex-wrap justify-center gap-2">
                {guesses.map((guess, idx) => (
                  <span key={idx} className="text-brand-sunset-end font-mono text-sm line-through decoration-2">
                    {guess}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {status === 'won' && (
        <div className="text-center animate-bounce-short">
          <h2 className="text-3xl font-extrabold text-brand-amber mb-4 tracking-tight">CONNECTION SECURED</h2>
          <button onClick={onReset} className="px-8 py-3 bg-brand-amber text-brand-onyx font-bold rounded-lg hover:bg-brand-sunset-end hover:text-white transition-all shadow-lg transform hover:-translate-y-1">
            INITIALIZE NEXT CHAIN
          </button>
        </div>
      )}

      {status === 'lost' && (
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-brand-sunset-end mb-4 tracking-tight">CHAIN BROKEN</h2>
          <button onClick={onReset} className="px-8 py-3 bg-brand-parchment text-brand-onyx font-bold rounded-lg hover:bg-white transition-all shadow-lg transform hover:-translate-y-1">
            RETRY LINK
          </button>
        </div>
      )}
    </div>
  );
};
