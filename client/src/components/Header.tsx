import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from './ui/Container';

export const Header: React.FC = () => {
  return (
    <header className="py-6 bg-neo-bg border-b-4 border-black">
      <Container className="flex justify-between items-center">
        <Link to="/" className="group relative inline-block">
          <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 transition-transform group-hover:translate-x-2 group-hover:translate-y-2" />
          <div className="relative border-4 border-black bg-neo-secondary px-4 py-2 font-black text-2xl uppercase tracking-widest hover:-translate-y-1 hover:-translate-x-1 transition-transform">
            8Words
          </div>
        </Link>
      </Container>
    </header>
  );
};
