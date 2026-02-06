import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="p-4 bg-gray-800 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">8Words</Link>
      </div>
    </header>
  );
};
