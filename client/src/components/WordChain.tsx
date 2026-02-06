import React from 'react';
import { cn } from '../utils/cn';
import { GuessInput } from './GuessInput';

interface WordChainProps {
  words: string[];
  currentWordIndex: number;
  isRevealed: boolean;
  revealedIndices: Set<number>;
  onGuess: (guess: string) => void;
}

export const WordChain: React.FC<WordChainProps> = ({
  words,
  currentWordIndex,
  isRevealed,
  revealedIndices,
  onGuess
}) => {
  // Create a list of words to display:
  // 1. Map to preserve original indices
  // 2. Filter to show only up to current active word (or last revealed)
  // 3. Reverse to show current/newest at top
  const displayedWords = words
    .map((word, index) => ({ word, index }))
    .slice(0, currentWordIndex + 2)
    .reverse();

  return (
    <div className="flex flex-col gap-4 my-8 max-w-md mx-auto">
      {displayedWords.map(({ word, index }) => {
        const isPast = index <= currentWordIndex;
        const isCurrent = index === currentWordIndex + 1;
        const isFuture = index > currentWordIndex + 1;

        return (
          <div key={index} className="relative flex flex-col items-center">

            <div
              className={cn(
                "w-full p-4 border-4 border-black text-center font-bold text-xl uppercase tracking-widest shadow-neo-sm transition-transform",
                // Sticker rotation variations based on index parity to look messy
                index % 2 === 0 ? "rotate-1" : "-rotate-1",

                isPast && "bg-neo-secondary text-black",

                isCurrent && isRevealed && "bg-neo-accent text-black animate-pulse", // Lost state

                isCurrent && !isRevealed && "bg-white text-black ring-4 ring-neo-muted ring-opacity-50 border-black", // Active state

                isFuture && "bg-gray-100 text-gray-300 border-gray-300 shadow-none border-dashed"
              )}
            >
              {isPast ? (
                word
              ) : isCurrent ? (
                isRevealed ? word : (
                  <div className="flex flex-col items-center w-full">
                    {/* Hint Display */}
                    <span className="inline-block mb-4">
                      {word.split('').map((char, i) => (
                        <span key={i} className={cn(
                          "inline-block w-6 border-b-4 mx-0.5 transition-all duration-300",
                          revealedIndices.has(i) ? "border-black text-black" : "border-gray-300 text-transparent"
                        )}>
                          {revealedIndices.has(i) ? char : '_'}
                        </span>
                      ))}
                    </span>

                    {/* Inline Input */}
                    <GuessInput onGuess={onGuess} className="mt-0 w-full" />
                  </div>
                )
              ) : (
                 <span className="opacity-20">???</span>
              )}
            </div>

            {/* Connector Line - Placed AFTER the card for reversed layout (connecting down) */}
            {index > 0 && (
              <div className="h-6 w-1 bg-black mt-1" />
            )}
          </div>
        );
      })}
    </div>
  );
};
