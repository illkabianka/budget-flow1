import React, { useState, useEffect } from 'react';
import { CategoryGroup } from '../types';
import * as Icons from './icons';

interface EditCategoryGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string | null, name: string) => void;
  group?: CategoryGroup | null;
}

const EditCategoryGroupModal: React.FC<EditCategoryGroupModalProps> = ({ isOpen, onClose, onSave, group }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (isOpen) {
      setName(group?.name || '');
    }
  }, [isOpen, group]);

  if (!isOpen) return null;

  const isNew = !group;
  const title = isNew ? 'Новая группа' : 'Изменить группу';

  const handleSave = () => {
    if (name.trim()) {
      onSave(group?.id || null, name.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col font-sans">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <button onClick={onClose} className="p-2 -ml-2 text-blue-400 hover:bg-gray-800 rounded-full">
          <Icons.ChevronLeftIcon className="w-7 h-7" />
          <span className="sr-only">Назад</span>
        </button>
        <h1 className="text-lg font-semibold text-gray-200 absolute left-1/2 -translate-x-1/2">{title}</h1>
        <button onClick={handleSave} className="px-4 py-2 text-lg text-blue-400 font-semibold disabled:text-gray-600" disabled={!name.trim()}>
          Сохранить
        </button>
      </header>

      <main className="flex-grow flex flex-col items-center px-4 pt-16">
        <div className="bg-gray-800 p-6 rounded-2xl mb-8 shadow-md">
            <Icons.CategoryGroupIcon className="w-12 h-12 text-gray-400" />
        </div>

        <div className="w-full">
            <label htmlFor="group-name" className="px-3 text-sm text-gray-400">Имя</label>
            <input
                id="group-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Требуется"
                className="w-full bg-gray-800 text-white p-4 mt-1 rounded-xl placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
            />
        </div>
      </main>
    </div>
  );
};

export default EditCategoryGroupModal;
