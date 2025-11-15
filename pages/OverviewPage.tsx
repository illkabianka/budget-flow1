import React, { useState } from 'react';
import Header from '../components/Header';
import Dashboard from '../components/Dashboard';
import TransactionList from '../components/TransactionList';
import FloatingActionButton from '../components/FloatingActionButton';
import AddTransactionModal from '../components/AddTransactionModal';

const OverviewPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="pb-20">
            <Header title="Обзор" />
            <Dashboard />
            <TransactionList />
            <FloatingActionButton onClick={() => setIsModalOpen(true)} />
            <AddTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default OverviewPage;