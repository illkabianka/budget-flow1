import React from 'react';
import Header from '../components/Header';
import { BudgetsIcon } from '../components/icons';

const BudgetsPage: React.FC = () => {
    return (
        <div className="pb-20">
            <Header title="Бюджеты" />
            <div className="flex flex-col items-center justify-center h-[calc(100vh-150px)] text-center text-gray-500">
                <BudgetsIcon className="w-24 h-24 mb-4" />
                <h2 className="text-xl font-semibold text-gray-300">Раздел в разработке</h2>
                <p className="mt-2 max-w-xs">Функционал бюджетирования скоро появится, чтобы помочь вам еще лучше контролировать свои финансы.</p>
            </div>
        </div>
    );
};

export default BudgetsPage;