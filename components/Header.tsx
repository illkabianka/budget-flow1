import React from 'react';

interface HeaderProps {
    title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = "FlowBudget AI" }) => {
  return (
    <header className="p-4 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-700">
      <h1 className="text-xl font-bold text-center text-gray-200">
        {title}
      </h1>
    </header>
  );
};

export default Header;