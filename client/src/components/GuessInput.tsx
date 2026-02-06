import React, { useState } from 'react';

interface GuessInputProps {
  onGuess: (guess: string) => void;
  disabled?: boolean;
}

export const GuessInput: React.FC<GuessInputProps> = ({ onGuess, disabled }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onGuess(value);
      setValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mt-6 w-full">
      <input
        type="text"
        className="flex-1 p-4 bg-brand-onyx border-2 border-brand-parchment/30 rounded-xl text-brand-parchment font-mono placeholder-brand-parchment/30 focus:outline-none focus:border-brand-amber focus:ring-1 focus:ring-brand-amber transition-all shadow-inner uppercase tracking-wider"
        placeholder="ENTER NEXT LINK..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
        autoFocus
      />
      <button
        type="submit"
        className="px-6 py-4 bg-brand-amber text-brand-onyx font-extrabold rounded-xl hover:bg-brand-sunset-start hover:brightness-110 disabled:bg-brand-parchment/10 disabled:text-brand-parchment/20 transition-all shadow-lg hover:-translate-y-0.5 disabled:transform-none disabled:shadow-none uppercase tracking-wide"
        disabled={disabled || !value.trim()}
      >
        Guess
      </button>
    </form>
  );
};
