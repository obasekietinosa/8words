import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-bold uppercase tracking-wide border-black transition-all duration-100 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none';

    const variants = {
      primary: 'bg-neo-accent text-black border-4 shadow-neo-sm hover:bg-red-400',
      secondary: 'bg-neo-secondary text-black border-4 shadow-neo-sm hover:bg-yellow-300',
      outline: 'bg-white text-black border-4 shadow-neo-sm hover:bg-gray-50',
      ghost: 'bg-transparent text-black border-2 border-transparent hover:border-black hover:bg-neo-muted/20',
      danger: 'bg-black text-white border-4 border-black shadow-neo-sm hover:bg-gray-800',
    };

    const sizes = {
      sm: 'h-10 px-4 text-xs',
      md: 'h-12 px-6 text-sm',
      lg: 'h-14 px-8 text-base',
      icon: 'h-12 w-12 p-0',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
