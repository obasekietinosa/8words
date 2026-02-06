import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from './ui/Container';
import { Button } from './ui/Button';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neo-bg p-4">
      <Container className="text-center">
        <h1 className="text-9xl font-black text-black mb-4 drop-shadow-[8px_8px_0_#FF6B6B]">
          404
        </h1>
        <p className="text-2xl font-bold uppercase mb-8 border-2 border-black inline-block px-4 py-2 bg-white -rotate-2">
          Page not found
        </p>
        <div className="block">
            <Link to="/">
            <Button size="lg" variant="primary">
                Go Home
            </Button>
            </Link>
        </div>
      </Container>
    </div>
  );
};
