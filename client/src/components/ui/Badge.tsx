import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary' | 'muted' | 'outline' | 'black';
  shape?: 'pill' | 'square';
  size?: 'sm' | 'md';
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'primary', shape = 'pill', size = 'md', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-black uppercase tracking-widest border-black';

    const variants = {
      primary: 'bg-neo-accent text-black border-2',
      secondary: 'bg-neo-secondary text-black border-2',
      muted: 'bg-neo-muted text-black border-2',
      outline: 'bg-transparent text-black border-2',
      black: 'bg-black text-white border-2 border-black',
    };

    const shapes = {
      pill: 'rounded-full',
      square: 'rounded-none',
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-[10px]',
      md: 'px-3 py-1 text-xs',
    };

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], shapes[shape], sizes[size], className)}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';
