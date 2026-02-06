import React from 'react';
import type { GameStatus as StatusType } from '../types';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';

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
    <Card className="mb-6 bg-neo-bg">
      {status === 'playing' && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b-2 border-black pb-4">
            <div className="flex items-center gap-2">
              <span className="font-bold uppercase tracking-wide">Status</span>
              <Badge variant="primary" size="md" className="text-sm">
                Playing
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-bold uppercase tracking-wide">Lives</span>
              <div className="flex gap-1">
                {Array.from({ length: maxGuesses }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-4 w-4 border-2 border-black rounded-full ${i < guessesLeft ? 'bg-neo-accent' : 'bg-transparent'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {guesses.length > 0 && (
            <div>
              <span className="block text-sm font-bold uppercase tracking-wide mb-2">Mistakes:</span>
              <div className="flex flex-wrap gap-2">
                {guesses.map((guess, i) => (
                  <Badge key={i} variant="muted" shape="square" className="rotate-1 hover:rotate-0 transition-transform">
                    {guess}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {status === 'won' && (
        <div className="text-center py-4">
          <h2 className="text-4xl font-black text-neo-accent mb-6 uppercase tracking-tighter drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
            You Won!
          </h2>
          <Button onClick={onReset} variant="secondary" className="w-full">
            Play Again
          </Button>
        </div>
      )}

      {status === 'lost' && (
        <div className="text-center py-4">
          <h2 className="text-4xl font-black text-black mb-6 uppercase tracking-tighter">
            Game Over
          </h2>
          <Button onClick={onReset} variant="primary" className="w-full">
            Try Again
          </Button>
        </div>
      )}
    </Card>
  );
};
