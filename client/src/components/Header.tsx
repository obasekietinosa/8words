import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export const Header: React.FC = () => {
  return (
    <header className="p-4 bg-brand-onyx border-b-2 border-brand-amber/20 shadow-md">
      <div className="container mx-auto flex justify-center items-center relative">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img src={logo} alt="8WORDS" className="h-10 w-auto" />
        </Link>
      </div>
    </header>
  );
};
