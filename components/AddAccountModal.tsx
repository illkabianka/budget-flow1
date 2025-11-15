import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { Account } from '../types';
import * as Icons from './icons';

// Local component for toggle switch
const ToggleSwitch: React.FC<{
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}> = ({ checked, onChange, label }) => {
  return (
    <label className="flex items-center justify-between cursor-pointer bg-gray-700 p-3 rounded-lg">
      <span className="text-gray-200">{label}</span>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div className={`block w-12 h-6 rounded-full transition-colors ${checked ? 'bg-blue-500' : 'bg-gray-600'}`}></div>
        <div
          className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
            checked ? 'transform translate-x-6' : ''
          }`}
        ></div>
      </div>
    </label>
  );
};


interface AddAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (account: Omit<Account, 'id'> | Account) => void;
  accountToEdit?: Account | null;
}

const availableIcons: { [key: string]: React.FC<{ className?: string }> } = {
    'WalletIcon': Icons.WalletIcon, 
    'BankIcon': Icons.BankIcon,
    'AccountsIcon': Icons.AccountsIcon,
    'HeartIcon': Icons.HeartIcon,
    'CategoriesIcon': Icons.CategoriesIcon,
    'PayeesIcon': Icons.PayeesIcon,
    'TagsIcon': Icons.TagsIcon,
    'RemindersIcon': Icons.RemindersIcon,
    'RecurringIcon': Icons.RecurringIcon,
    'SyncIcon': Icons.SyncIcon,
};
const availableIconNames = Object.keys(availableIcons);

const colorPalette = [
  '#F87171', '#FB923C', '#FBBF24', '#A3E635', '#4ADE80',
  '#34D399', '#22D3EE', '#60A5FA', '#A78BFA', '#F472B6',
];

const AddAccountModal: React.FC<AddAccountModalProps> = ({ isOpen, onClose, onSave, accountToEdit }) => {
  const { accountGroups } = useData();
  const [name, setName] = useState('Новый счет');
  const [balance, setBalance] = useState('0');
  const [currency, setCurrency] = useState('KZT');
  const [selectedIcon, setSelectedIcon] = useState('WalletIcon');
  const [selectedColor, setSelectedColor] = useState(colorPalette[7]);
  const [selectedGroupId, setSelectedGroupId] = useState(accountGroups[0]?.id || '');
  const [isDefault, setIsDefault] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [includeInStatistics, setIncludeInStatistics] = useState(true);
  
  const isEditMode = !!accountToEdit;
  const title = isEditMode ? 'Изменить счет' : 'Новый счет';

  useEffect(() => {
    if (isOpen) {
        if (isEditMode && accountToEdit) {
            setName(accountToEdit.name);
            setBalance(String(accountToEdit.balance));
            setCurrency(accountToEdit.currency);
            setSelectedIcon(accountToEdit.icon);
            setSelectedColor(accountToEdit.color || colorPalette[7]);
            setSelectedGroupId(accountToEdit.groupId);
            setIsDefault(!!accountToEdit.isDefault);
            setIsPending(!!accountToEdit.isPending);
            setIncludeInStatistics(accountToEdit.includeInStatistics !== false);
        } else {
            setName('Новый счет');
            setBalance('0');
            setCurrency('KZT');
            setSelectedIcon('WalletIcon');
            setSelectedColor(colorPalette[7]);
            setSelectedGroupId(accountGroups[0]?.id || '');
            setIsDefault(false);
            setIsPending(false);
            setIncludeInStatistics(true);
        }
    }
  }, [isOpen, isEditMode, accountToEdit, accountGroups]);

  if (!isOpen) {
    return null;
  }

  const handleSave = () => {
    const numericBalance = parseFloat(balance.replace(',', '.')) || 0;
    if (name.trim() && selectedGroupId) {
        const baseAccountData = {
            name: name.trim(),
            icon: selectedIcon,
            color: selectedColor,
            groupId: selectedGroupId,
            isDefault,
            isPending,
            includeInStatistics,
        };

        if (isEditMode && accountToEdit) {
            onSave({
                ...accountToEdit,
                ...baseAccountData,
            });
        } else {
            onSave({
                ...baseAccountData,
                balance: numericBalance,
                currency,
            });
        }
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
        className="w-full max-w-sm bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4 overflow-y-auto max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-center text-white">{title}</h2>
        
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
        
        <div className="bg-gray-700 p-3 rounded-lg">
            <label className="text-xs text-gray-400">{isEditMode ? 'Общий баланс' : 'Начальный баланс'}</label>
            <div className="flex items-baseline">
                <input 
                    type="text"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    className="w-full bg-transparent text-2xl font-bold text-white outline-none mt-1 disabled:text-gray-500"
                    placeholder="0"
                    disabled={isEditMode}
                />
                 <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="bg-transparent text-lg text-gray-300 font-semibold outline-none border-none disabled:text-gray-500" disabled={isEditMode}>
                    <option value="KZT">KZT</option>
                    <option value="USD">USD</option>
                    <option value="RUB">RUB</option>
                </select>
            </div>
        </div>


        <div>
            <label className="text-sm font-medium text-gray-400">Иконка</label>
            <div className="grid grid-cols-5 gap-2 mt-2 bg-gray-700 p-2 rounded-lg">
                {availableIconNames.map(iconName => {
                    const IconComponent = availableIcons[iconName];
                    const isActive = selectedIcon === iconName;
                    return (
                        <button key={iconName} onClick={() => setSelectedIcon(iconName)} className={`w-10 h-10 flex-grow flex items-center justify-center rounded-lg transition-colors ${isActive ? 'bg-blue-500' : 'hover:bg-gray-600'}`}>
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
                {accountGroups.map(group => (
                    <option key={group.id} value={group.id}>{group.name}</option>
                ))}
            </select>
        </div>

        <div className="space-y-2">
            <ToggleSwitch
                label="Счет по умолчанию"
                checked={isDefault}
                onChange={setIsDefault}
            />
            <ToggleSwitch
                label="Ожидающий"
                checked={isPending}
                onChange={setIsPending}
            />
            <ToggleSwitch
                label="Учитывать в статистике"
                checked={includeInStatistics}
                onChange={setIncludeInStatistics}
            />
        </div>

        <div className="flex space-x-3 pt-2">
            <button onClick={onClose} className="w-full py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors">Отмена</button>
            <button onClick={handleSave} className="w-full py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors">Сохранить</button>
        </div>
      </div>
    </div>
  );
};

export default AddAccountModal;