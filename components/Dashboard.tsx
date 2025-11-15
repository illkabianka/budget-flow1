import React from 'react';
import { useData } from '../context/DataContext';
import { WalletIcon, ArrowDownIcon, ArrowUpIcon } from './icons';

const Dashboard: React.FC = () => {
  const { accounts, transactions, mainCurrency } = useData();

  const exchangeRates: { [key: string]: number } = {
    'KZT': 1, 'USD': 450, 'RUB': 5,
  };

  const convertToMainCurrency = (amount: number, fromCurrency: string): number => {
    const rateInKZT = exchangeRates[fromCurrency] || 1;
    const amountInKZT = amount * rateInKZT;
    const mainCurrencyRate = exchangeRates[mainCurrency] || 1;
    return amountInKZT / mainCurrencyRate;
  };

  const totalBalance = accounts.reduce((sum, acc) => {
      return sum + convertToMainCurrency(acc.balance, acc.currency);
  }, 0);

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const monthlyTransactions = transactions.filter(tx => {
    const txDate = new Date(tx.date);
    return txDate >= startOfMonth && txDate <= endOfMonth;
  });

  const monthlyIncome = monthlyTransactions
    .filter(tx => tx.type === 'income')
    .reduce((sum, tx) => sum + convertToMainCurrency(tx.amount, tx.currency), 0);

  const monthlyExpense = monthlyTransactions
    .filter(tx => tx.type === 'expense')
    .reduce((sum, tx) => sum + convertToMainCurrency(tx.amount, tx.currency), 0);
    
  const totalFlow = monthlyIncome + monthlyExpense;
  const incomePercentage = totalFlow > 0 ? (monthlyIncome / totalFlow) * 100 : 0;

  return (
    <div className="p-4 space-y-4">
      {/* Total Balance Card */}
      <div className="bg-gray-800 rounded-xl p-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">Общий баланс</p>
          <p className="text-3xl font-bold text-white mt-1">
            {totalBalance.toLocaleString('ru-RU', { maximumFractionDigits: 0 })} 
            <span className="text-lg text-gray-400 ml-1">{mainCurrency}</span>
          </p>
        </div>
        <div className="bg-blue-500/20 p-3 rounded-full">
          <WalletIcon className="w-8 h-8 text-blue-400" />
        </div>
      </div>

      {/* Monthly Flow Card */}
      <div className="bg-gray-800 rounded-xl p-4">
        <h3 className="text-md font-semibold mb-3 text-gray-300">Обзор за месяц</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-green-500/20 rounded-full"><ArrowUpIcon className="w-4 h-4 text-green-400" /></div>
              <span className="text-gray-300">Доходы</span>
            </div>
            <span className="font-semibold text-green-400">+{monthlyIncome.toLocaleString('ru-RU', { maximumFractionDigits: 0 })}</span>
          </div>
          <div className="flex justify-between items-center">
             <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-red-500/20 rounded-full"><ArrowDownIcon className="w-4 h-4 text-red-400" /></div>
              <span className="text-gray-300">Расходы</span>
            </div>
            <span className="font-semibold text-red-400">-{monthlyExpense.toLocaleString('ru-RU', { maximumFractionDigits: 0 })}</span>
          </div>
        </div>
        {totalFlow > 0 && (
         <div className="w-full bg-gray-700 rounded-full h-2 mt-4 overflow-hidden flex">
            <div className="bg-green-500 h-2" style={{ width: `${incomePercentage}%` }}></div>
            <div className="bg-red-500 h-2" style={{ width: `${100 - incomePercentage}%` }}></div>
        </div>
        )}
      </div>

      {/* Accounts List Card */}
      <div className="bg-gray-800 rounded-xl p-4">
        <h3 className="text-md font-semibold mb-2 text-gray-300">Счета</h3>
        <ul className="space-y-2">
          {accounts.map(acc => (
            <li key={acc.id} className="flex justify-between items-center text-sm">
              <span className="text-gray-300">{acc.name}</span>
              <span className="font-medium text-white">
                {acc.balance.toLocaleString('ru-RU')} 
                <span className="text-xs text-gray-500 ml-1">{acc.currency}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;