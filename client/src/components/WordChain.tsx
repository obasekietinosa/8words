import React from 'react';

interface WordChainProps {
  words: string[];
  currentWordIndex: number;
  isRevealed: boolean;
  revealedIndices: Set<number>;
}

export const WordChain: React.FC<WordChainProps> = ({ words, currentWordIndex, isRevealed, revealedIndices }) => {
  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto py-4">
      {words.map((word, index) => {
        const isPast = index <= currentWordIndex;
        const isCurrent = index === currentWordIndex + 1;
        const isLast = index === words.length - 1;

        // Connector Logic
        const showConnector = !isLast;

        return (
          <div key={index} className="flex flex-col items-center w-full animate-fadeIn">
            {/* The Word Node */}
            <div className={`
              relative w-full p-4 rounded-xl border-4 text-center text-xl font-bold uppercase tracking-widest shadow-md transition-all duration-500
              ${isPast
                ? 'bg-brand-parchment border-brand-parchment text-brand-onyx font-sans' // Completed: Solid Parchment
                : isCurrent
                  ? 'bg-brand-onyx border-brand-amber text-brand-parchment font-mono shadow-[0_0_15px_rgba(242,169,59,0.2)]' // Active: Dark with Amber Border
                  : 'bg-brand-onyx border-brand-parchment/20 text-brand-parchment/20 font-mono' // Future: Dimmed
              }
              ${isCurrent && isRevealed ? 'border-brand-sunset-end text-brand-sunset-end animate-shake' : ''}
            `}>
              {/* Content */}
              {isPast ? (
                word
              ) : isCurrent ? (
                isRevealed ? (
                  word
                ) : (
                  <span className="flex justify-center gap-1">
                    {word.split('').map((char, i) => (
                      <span key={i} className={`
                         w-6 border-b-2 text-center transition-all
                         ${revealedIndices.has(i) ? 'border-brand-parchment/50' : 'border-brand-parchment/20 text-transparent'}
                      `}>
                         {revealedIndices.has(i) ? char : '_'}
                      </span>
                    ))}
                  </span>
                )
              ) : (
                <span className="opacity-0">HIDDEN</span>
              )}
            </div>

            {/* Connector */}
            {showConnector && (
              <div className="flex flex-col items-center h-8">
                <div className={`w-0.5 h-full ${isPast ? 'bg-brand-parchment' : 'bg-brand-parchment/20'}`}></div>
                <div className={`w-3 h-3 rounded-full -mt-1 ${isPast ? 'bg-brand-parchment' : 'bg-brand-parchment/20'}`}></div>
                 {/* Arrow tip for the active connection */}
                 {isCurrent && !isLast && (
                     <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-brand-parchment/20 -mt-2"></div>
                 )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
