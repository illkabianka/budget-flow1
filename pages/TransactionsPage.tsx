import React, { useState } from 'react';
import TransactionList from '../components/TransactionList';
import FloatingActionButton from '../components/FloatingActionButton';
import AddTransactionModal from '../components/AddTransactionModal';
import { MoreIcon, SearchIcon } from '../components/icons';

const TransactionsPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());

    const formattedDate = currentDate.toLocaleDateString('ru-RU', { month: 'short', year: 'numeric' });
    const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1).replace(' г.', '');

    return (
        <div className="pb-20">
            <header className="p-4 bg-gray-900 flex justify-between items-center sticky top-0 z-10 border-b border-gray-800">
                <h1 className="text-2xl font-bold">{capitalizedDate}</h1>
                <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-800">
                        <SearchIcon className="w-6 h-6" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-800">
                        <MoreIcon className="w-6 h-6" />
                    </button>
                </div>
            </header>
            
            <div className="p-4">
                <div className="grid grid-cols-2 gap-3 mb-4">
                    <button className="bg-gray-800 text-sm py-3 px-4 rounded-xl flex items-center justify-between">
                        <span>Доходы</span>
                        <span className="font-mono text-lg text-gray-400">+</span>
                    </button>
                    <button className="bg-gray-800 text-sm py-3 px-4 rounded-xl flex items-center justify-between">
                        <span>Расходы</span>
                        <span className="font-mono text-lg text-gray-400">-</span>
                    </button>
                    <button className="bg-gray-800 text-sm py-3 px-4 rounded-xl text-left">Анализ</button>
                    <button className="bg-gray-800 text-sm py-3 px-4 rounded-xl text-left">Запланировано</button>
                </div>
            </div>
            <TransactionList />
            <FloatingActionButton onClick={() => setIsModalOpen(true)} />
            <AddTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default TransactionsPage;