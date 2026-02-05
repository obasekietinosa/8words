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
    <form onSubmit={handleSubmit} className="flex gap-2 mt-6 max-w-md mx-auto">
      <input
        type="text"
        className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        placeholder="Enter your guess..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
        autoFocus
      />
      <button
        type="submit"
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors shadow-sm"
        disabled={disabled || !value.trim()}
      >
        Guess
      </button>
    </form>
  );
};
