import React from 'react';
import { cn } from '../utils/cn';

interface WordChainProps {
  words: string[];
  currentWordIndex: number;
  isRevealed: boolean;
  revealedIndices: Set<number>;
}

export const WordChain: React.FC<WordChainProps> = ({ words, currentWordIndex, isRevealed, revealedIndices }) => {
  return (
    <div className="flex flex-col gap-4 my-8 max-w-md mx-auto">
      {words.map((word, index) => {
        const isPast = index <= currentWordIndex;
        const isCurrent = index === currentWordIndex + 1;
        const isFuture = index > currentWordIndex + 1;

        return (
          <div key={index} className="relative flex flex-col items-center">
            {/* Connector Line */}
            {index > 0 && (
              <div className="h-6 w-1 bg-black mb-1" />
            )}

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
                  <span className="inline-block">
                    {word.split('').map((char, i) => (
                      <span key={i} className={cn(
                        "inline-block w-6 border-b-4 mx-0.5",
                        revealedIndices.has(i) ? "border-black text-black" : "border-gray-300 text-transparent"
                      )}>
                        {revealedIndices.has(i) ? char : '_'}
                      </span>
                    ))}
                  </span>
                )
              ) : (
                 <span className="opacity-20">???</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
