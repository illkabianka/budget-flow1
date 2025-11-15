import React from 'react';
import { useData } from '../context/DataContext';
import { Transaction } from '../types';
import { CategoryTagIcon, ChevronRightIcon } from './icons';

const TransactionItem: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
    const { accounts, categories } = useData();
    const isIncome = transaction.type === 'income';

    const category = categories.find(c => c.id === transaction.categoryId);
    const fromAccount = accounts.find(a => a.id === transaction.fromAccountId);
    const toAccount = accounts.find(a => a.id === transaction.toAccountId);
    
    const amountColor = isIncome ? 'text-green-400' : 'text-red-400';
    const sign = isIncome ? '+' : '-';

    const accountName = transaction.type === 'transfer' 
        ? `Перевод: ${fromAccount?.name} → ${toAccount?.name}` 
        : (fromAccount?.name || toAccount?.name);

    const currencySymbol = {
        'KZT': '₸',
        'RUB': '₽',
        'USD': '$'
    }[transaction.currency] || transaction.currency;

    const formatDate = (dateString: string) => {
        // Mock time for display purposes to match screenshot style
        return new Date(dateString).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }) + ', 04:19';
    };

    return (
        <li className="flex items-center justify-between p-3">
            <div className="flex items-center space-x-4 flex-1">
                <div className="bg-gray-700 p-3 rounded-lg">
                    <CategoryTagIcon className="w-6 h-6 text-gray-400" />
                </div>
                <div className="flex-1">
                    <p className="font-semibold text-gray-200">{transaction.payee || category?.name || 'Без категории'}</p>
                    <p className="text-sm text-gray-400 truncate">{accountName}</p>
                </div>
            </div>
            <div className="flex items-center ml-2">
                <div className="text-right">
                    <p className="text-xs text-gray-500 whitespace-nowrap">{formatDate(transaction.date)}</p>
                    <p className={`font-bold text-md ${amountColor}`}>
                        {sign}{transaction.amount.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {currencySymbol}
                    </p>
                </div>
                <ChevronRightIcon className="w-5 h-5 text-gray-600 ml-3" />
            </div>
        </li>
    );
};


const TransactionList: React.FC = () => {
  const { transactions, mainCurrency } = useData();

  const groupedTransactions = transactions.reduce((acc, tx) => {
    const date = new Date(tx.date);
    // Ensure date is valid before processing
    if (isNaN(date.getTime())) return acc;
    
    const monthYear = date.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' });
    if (!acc[monthYear]) {
        acc[monthYear] = [];
    }
    acc[monthYear].push(tx);
    return acc;
  }, {} as Record<string, Transaction[]>);

  const exchangeRates: { [key: string]: number } = {
    'KZT': 1, 'USD': 450, 'RUB': 5,
  };

  const convertToMainCurrency = (amount: number, fromCurrency: string): number => {
      const rateInKZT = exchangeRates[fromCurrency] || 1;
      const amountInKZT = amount * rateInKZT;
      const mainCurrencyRate = exchangeRates[mainCurrency] || 1;
      return amountInKZT / mainCurrencyRate;
  };

  const totalSum = transactions.reduce((sum, tx) => {
    const convertedAmount = convertToMainCurrency(tx.amount, tx.currency);
    if (tx.type === 'expense') return sum - convertedAmount;
    if (tx.type === 'income') return sum + convertedAmount;
    return sum;
  }, 0);

  const currencySymbol = { 'KZT': '₸', 'RUB': '₽', 'USD': '$' }[mainCurrency] || mainCurrency;

  if (transactions.length === 0) {
      return (
        <div className="text-center py-10 text-gray-500">
            <p>Транзакций пока нет.</p>
            <p>Нажмите "+", чтобы добавить новую операцию.</p>
        </div>
      );
  }

  return (
    <div className="px-2 py-2">
      {Object.entries(groupedTransactions).map(([groupTitle, txs]) => (
        <div key={groupTitle} className="mb-4">
            <h2 className="px-3 py-2 text-md font-bold text-gray-200 capitalize">{groupTitle.replace(' г.', '')}</h2>
            <ul className="space-y-1 bg-gray-800 rounded-xl">
                {txs.map((tx, index) => (
                    <React.Fragment key={tx.id}>
                        <TransactionItem transaction={tx} />
                        {index < txs.length - 1 && <hr className="border-gray-700 mx-4" />}
                    </React.Fragment>
                ))}
            </ul>
        </div>
      ))}
      {transactions.length > 0 && (
         <div className="text-right mt-4 pr-3 text-sm">
            <span className="text-gray-400">Сумма: </span>
            <span className="font-semibold text-gray-300">
                {totalSum.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {currencySymbol}
            </span>
        </div>
      )}
    </div>
  );
};

export default TransactionList;