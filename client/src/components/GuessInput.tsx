import React, { useState } from 'react';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

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
    <form onSubmit={handleSubmit} className="flex gap-4 mt-6">
      <Input
        type="text"
        placeholder="ENTER GUESS..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
        autoFocus
        className="uppercase"
      />
      <Button
        type="submit"
        variant="primary"
        disabled={disabled || !value.trim()}
      >
        GUESS
      </Button>
    </form>
  );
};
