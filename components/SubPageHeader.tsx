import React from 'react';
import { ChevronLeftIcon } from './icons';

interface SubPageHeaderProps {
    title: string;
    onBack: () => void;
}

const SubPageHeader: React.FC<SubPageHeaderProps> = ({ title, onBack }) => {
  return (
    <header className="p-4 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-700 flex items-center">
      <button onClick={onBack} className="p-2 -ml-2 mr-2 text-gray-300 hover:text-white rounded-full">
        <ChevronLeftIcon className="w-6 h-6" />
      </button>
      <h1 className="text-xl font-bold text-center text-gray-200 flex-1 -translate-x-4">
        {title}
      </h1>
    </header>
  );
};

export default SubPageHeader;
