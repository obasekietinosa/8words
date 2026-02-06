import React from 'react';
import { cn } from '../../utils/cn';

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'flex h-14 w-full border-4 border-black bg-white px-4 py-2 text-lg font-bold placeholder:text-black/40 focus:bg-neo-secondary focus:outline-none focus:shadow-neo-sm disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
