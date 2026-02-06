import React, { useState } from 'react';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { cn } from '../utils/cn';

interface GuessInputProps {
  onGuess: (guess: string) => void;
  disabled?: boolean;
  className?: string;
}

export const GuessInput: React.FC<GuessInputProps> = ({ onGuess, disabled, className }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onGuess(value);
      setValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("flex gap-4 mt-6", className)}>
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
