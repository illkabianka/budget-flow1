import React from 'react';
import { OverviewIcon, OperationsIcon, BudgetsIcon, SettingsIcon } from './icons';

interface BottomNavProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const NavItem: React.FC<{
  label: string;
  icon: React.ElementType;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon: Icon, isActive, onClick }) => {
  const color = isActive ? 'text-blue-400' : 'text-gray-400';
  return (
    <button onClick={onClick} className="flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors hover:text-blue-300">
      <Icon className={`w-6 h-6 mb-1 ${color}`} />
      <span className={`text-xs ${color}`}>{label}</span>
    </button>
  );
};


const BottomNav: React.FC<BottomNavProps> = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { id: 'overview', label: 'Обзор', icon: OverviewIcon },
    { id: 'transactions', label: 'Операции', icon: OperationsIcon },
    { id: 'budgets', label: 'Бюджеты', icon: BudgetsIcon },
    { id: 'settings', label: 'Настройки', icon: SettingsIcon },
  ];
  
  const rootPage = currentPage.split('/')[0];

  return (
    <nav className="bg-gray-800 border-t border-gray-700 grid grid-cols-4 sticky bottom-0 z-20">
      {navItems.map(item => (
        <NavItem
          key={item.id}
          label={item.label}
          icon={item.icon}
          isActive={rootPage === item.id}
          onClick={() => setCurrentPage(item.id)}
        />
      ))}
    </nav>
  );
};

export default BottomNav;
