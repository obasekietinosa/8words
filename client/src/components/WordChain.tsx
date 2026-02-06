import React from 'react';

interface WordChainProps {
  words: string[];
  currentWordIndex: number;
  isRevealed: boolean;
}

export const WordChain: React.FC<WordChainProps> = ({ words, currentWordIndex, isRevealed }) => {
  return (
    <div className="flex flex-col gap-2 my-4 max-w-md mx-auto">
      {words.map((word, index) => {
        // Previously guessed words (or the start word)
        if (index <= currentWordIndex) {
          return (
            <div key={index} className="p-3 bg-green-100 border border-green-300 rounded text-green-900 font-mono text-lg text-center uppercase shadow-sm">
              {word}
            </div>
          );
        }

        // The current target word
        if (index === currentWordIndex + 1) {
          if (isRevealed) {
             // Game lost, reveal the word
             return (
               <div key={index} className="p-3 bg-red-100 border border-red-300 rounded text-red-900 font-mono text-lg text-center uppercase shadow-sm animate-pulse">
                 {word}
               </div>
             );
          }

          // Still guessing: Show first char + blanks
          const firstChar = word.charAt(0);
          const restLength = word.length - 1;
          const masked = firstChar + '_ '.repeat(restLength).trim();

          return (
             <div key={index} className="p-3 bg-blue-50 border border-blue-200 rounded text-blue-800 font-mono text-lg text-center tracking-widest uppercase shadow-sm ring-2 ring-blue-300">
               {masked}
             </div>
          );
        }

        // Future words
        return (
          <div key={index} className="p-3 bg-gray-50 border border-gray-200 rounded text-gray-400 font-mono text-lg text-center shadow-sm">
             {Array(word.length).fill('_').join(' ')}
          </div>
        );
      })}
    </div>
  );
};
