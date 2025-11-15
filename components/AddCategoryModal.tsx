import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { Category } from '../types';
import * as Icons from './icons';

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: Omit<Category, 'id'>) => void;
  initialGroupId?: string;
}

const availableIcons: { [key: string]: React.FC<{ className?: string }> } = {
    'PocketMoneyIcon': Icons.PocketMoneyIcon, 'ClientsIcon': Icons.ClientsIcon,
    'AdditionalIncomeIcon': Icons.AdditionalIncomeIcon, 'RefundsIcon': Icons.RefundsIcon,
    'OtherIncomeIcon': Icons.OtherIncomeIcon, 'FoodIcon': Icons.FoodIcon,
    'SupermarketIcon': Icons.SupermarketIcon, 'BarIcon': Icons.BarIcon,
    'SalaryIcon': Icons.SalaryIcon, 'TransportIcon': Icons.TransportIcon,
    'WalletIcon': Icons.WalletIcon, 'BudgetsIcon': Icons.BudgetsIcon,
    'HeartIcon': Icons.HeartIcon, 'PayeesIcon': Icons.PayeesIcon,
    'AccountsIcon': Icons.AccountsIcon, 'RemindersIcon': Icons.RemindersIcon,
    'TagsIcon': Icons.TagsIcon, 'CategoryTagIcon': Icons.CategoryTagIcon,
};
const availableIconNames = Object.keys(availableIcons);

const colorPalette = [
  '#F87171', '#FB923C', '#FBBF24', '#A3E635', '#4ADE80',
  '#34D399', '#22D3EE', '#60A5FA', '#A78BFA', '#F472B6',
];

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ isOpen, onClose, onSave, initialGroupId }) => {
  const { categoryGroups } = useData();
  const [name, setName] = useState('Новая категория');
  const [selectedIcon, setSelectedIcon] = useState('CategoryTagIcon');
  const [selectedColor, setSelectedColor] = useState(colorPalette[6]);
  const [selectedGroupId, setSelectedGroupId] = useState(initialGroupId || categoryGroups[0]?.id || '');

  useEffect(() => {
    if (isOpen) {
        setName('Новая категория');
        setSelectedIcon('CategoryTagIcon');
        setSelectedColor(colorPalette[6]);
        setSelectedGroupId(initialGroupId || categoryGroups[0]?.id || '');
    }
  }, [isOpen, initialGroupId, categoryGroups]);

  if (!isOpen) {
    return null;
  }

  const handleSave = () => {
    if (name.trim() && selectedGroupId) {
        onSave({
            name: name.trim(),
            icon: selectedIcon,
            color: selectedColor,
            groupId: selectedGroupId,
        });
    }
  };

  const SelectedIconComponent = availableIcons[selectedIcon];

  return (
    <div 
      className="fixed inset-0 bg-black/70 z-40 flex items-center justify-center p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="w-full max-w-sm bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-center text-white">Новая категория</h2>
        
        <div className="flex items-center space-x-4 bg-gray-700 p-3 rounded-lg">
            <div className="w-12 h-12 flex items-center justify-center rounded-full" style={{ backgroundColor: selectedColor }}>
                <SelectedIconComponent className="w-7 h-7 text-white" />
            </div>
            <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent text-lg font-semibold text-white outline-none"
            />
        </div>
        
        <div>
            <label className="text-sm font-medium text-gray-400">Иконка</label>
            <div className="grid grid-cols-6 gap-2 mt-2 bg-gray-700 p-2 rounded-lg">
                {availableIconNames.map(iconName => {
                    const IconComponent = availableIcons[iconName];
                    const isActive = selectedIcon === iconName;
                    return (
                        <button key={iconName} onClick={() => setSelectedIcon(iconName)} className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${isActive ? 'bg-blue-500' : 'hover:bg-gray-600'}`}>
                           <IconComponent className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-300'}`} />
                        </button>
                    )
                })}
            </div>
        </div>

        <div>
            <label className="text-sm font-medium text-gray-400">Цвет</label>
            <div className="grid grid-cols-5 gap-3 mt-2">
                {colorPalette.map(color => (
                    <button key={color} onClick={() => setSelectedColor(color)} className="w-10 h-10 rounded-full mx-auto" style={{ backgroundColor: color }}>
                       {selectedColor === color && <div className="w-full h-full rounded-full border-2 border-white/80 flex items-center justify-center"><div className="w-3 h-3 bg-white/80 rounded-full"></div></div>}
                    </button>
                ))}
            </div>
        </div>
        
        <div>
            <label htmlFor="group-select" className="text-sm font-medium text-gray-400">Группа</label>
            <select
                id="group-select"
                value={selectedGroupId}
                onChange={(e) => setSelectedGroupId(e.target.value)}
                className="w-full mt-1 bg-gray-700 text-white p-3 rounded-lg border-none outline-none appearance-none"
            >
                {categoryGroups.map(group => (
                    <option key={group.id} value={group.id}>{group.name}</option>
                ))}
            </select>
        </div>

        <div className="flex space-x-3 pt-2">
            <button onClick={onClose} className="w-full py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors">Отмена</button>
            <button onClick={handleSave} className="w-full py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors">Сохранить</button>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryModal;
