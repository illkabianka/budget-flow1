
import React from 'react';

const Loader: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="w-8 h-8 border-4 border-t-transparent border-blue-400 rounded-full animate-spin"></div>
      <p className="mt-3 text-sm text-gray-400">{text}</p>
    </div>
  );
};

export default Loader;
