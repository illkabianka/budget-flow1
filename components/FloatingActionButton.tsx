import React from 'react';
import { PlusIcon } from './icons';

interface FloatingActionButtonProps {
  onClick: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-24 right-4 z-30 w-14 h-14 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-transform transform active:scale-95"
      aria-label="Добавить операцию"
    >
      <PlusIcon className="w-8 h-8" />
    </button>
  );
};

export default FloatingActionButton;