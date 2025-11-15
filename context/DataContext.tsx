import React, { createContext, useContext, ReactNode, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { Transaction, Account, Category, CategoryGroup, AccountGroup } from '../types';

interface DataContextType {
  transactions: Transaction[];
  accounts: Account[];
  accountGroups: AccountGroup[];
  categories: Category[];
  categoryGroups: CategoryGroup[];
  mainCurrency: string;
  setMainCurrency: React.Dispatch<React.SetStateAction<string>>;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  addAccount: (account: Omit<Account, 'id'>) => void;
  updateAccount: (account: Account) => void;
  addAccountGroup: (group: Omit<AccountGroup, 'id'>) => void;
  updateAccountGroup: (groupId: string, name: string) => void;
  deleteAccounts: (accountIds: Set<string>) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  addCategoryGroup: (group: Omit<CategoryGroup, 'id'>) => void;
  updateCategoryGroup: (groupId: string, name:string) => void;
  deleteCategories: (categoryIds: Set<string>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const initialAccountGroups: AccountGroup[] = [
    { id: 'group_cards', name: 'Карты' },
    { id: 'group_cash', name: 'Наличные' },
    { id: 'group_savings', name: 'Вклады и накопления' },
];

const initialAccounts: Account[] = [
  { id: 'acc1', name: 'Карта Kaspi', currency: 'KZT', balance: 150000, groupId: 'group_cards', icon: 'WalletIcon', color: '#60A5FA', isDefault: true, includeInStatistics: true },
  { id: 'acc2', name: 'Наличные KZT', currency: 'KZT', balance: 50000, groupId: 'group_cash', icon: 'WalletIcon', color: '#4ADE80', includeInStatistics: true },
  { id: 'acc3', name: 'Депозит', currency: 'KZT', balance: 500000, groupId: 'group_savings', icon: 'BankIcon', color: '#FBBF24', includeInStatistics: false },
  { id: 'acc4', name: 'Доллары', currency: 'USD', balance: 1000, groupId: 'group_cash', icon: 'WalletIcon', color: '#22D3EE', includeInStatistics: true, isPending: true },
];

const initialCategoryGroups: CategoryGroup[] = [
    { id: 'income', name: 'Доход' },
    { id: 'products', name: 'Продукты' },
    { id: 'transport', name: 'Транспорт' },
];

const initialCategories: Category[] = [
    // Доход
    { id: 'income1', name: 'Карманные', icon: 'PocketMoneyIcon', groupId: 'income' },
    { id: 'income2', name: 'Клиенты', icon: 'ClientsIcon', groupId: 'income' },
    { id: 'income3', name: 'Дополнительные', icon: 'AdditionalIncomeIcon', groupId: 'income' },
    { id: 'income4', name: 'Возвраты', icon: 'RefundsIcon', groupId: 'income' },
    { id: 'income5', name: 'Другие', icon: 'OtherIncomeIcon', groupId: 'income' },
    { id: 'income6', name: 'Зарплата', icon: 'SalaryIcon', groupId: 'income' },
    // Продукты
    { id: 'prod1', name: 'Питание', icon: 'FoodIcon', groupId: 'products' },
    { id: 'prod2', name: 'Супермаркет', icon: 'SupermarketIcon', groupId: 'products' },
    { id: 'prod3', name: 'Бары, алкоголь', icon: 'BarIcon', groupId: 'products' },
    // Транспорт
    { id: 'trans1', name: 'Такси', icon: 'TransportIcon', groupId: 'transport' },
];


const today = new Date();
const yesterday = new Date(new Date().setDate(today.getDate() - 1));
const twoDaysAgo = new Date(new Date().setDate(today.getDate() - 2));


const initialTransactions: Transaction[] = [
    { id: 'txn1', type: 'expense', amount: 3500, currency: 'KZT', date: twoDaysAgo.toISOString().split('T')[0], fromAccountId: 'acc1', categoryId: 'prod1', payee: 'Starbucks' },
    { id: 'txn2', type: 'expense', amount: 500, currency: 'KZT', date: yesterday.toISOString().split('T')[0], fromAccountId: 'acc2', categoryId: 'trans1', payee: 'Яндекс Такси' },
    { id: 'txn3', type: 'income', amount: 420000, currency: 'KZT', date: today.toISOString().split('T')[0], toAccountId: 'acc1', categoryId: 'income6', payee: 'ТОО "Рога и Копыта"' },
];

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('transactions', initialTransactions);
  const [accounts, setAccounts] = useLocalStorage<Account[]>('accounts', initialAccounts);
  const [accountGroups, setAccountGroups] = useLocalStorage<AccountGroup[]>('accountGroups', initialAccountGroups);
  const [categories, setCategories] = useLocalStorage<Category[]>('categories', initialCategories);
  const [categoryGroups, setCategoryGroups] = useLocalStorage<CategoryGroup[]>('categoryGroups', initialCategoryGroups);
  const [mainCurrency, setMainCurrency] = useLocalStorage<string>('mainCurrency', 'KZT');

  const addTransaction = useCallback((transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: `txn-${new Date().toISOString()}-${Math.random()}`,
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
    
    setAccounts(prevAccounts => 
        prevAccounts.map(acc => {
            if (acc.id === newTransaction.fromAccountId) {
                return { ...acc, balance: acc.balance - newTransaction.amount };
            }
            if (acc.id === newTransaction.toAccountId) {
                return { ...acc, balance: acc.balance + newTransaction.amount };
            }
            return acc;
        })
    );
  }, [setAccounts, setTransactions]);

  const addAccount = useCallback((account: Omit<Account, 'id'>) => {
    const newAccount: Account = {
        ...account,
        id: `acc-${new Date().toISOString()}-${Math.random()}`
    };
    setAccounts(prev => [...prev, newAccount]);
  }, [setAccounts]);
  
  const updateAccount = useCallback((updatedAccount: Account) => {
      setAccounts(prev => prev.map(acc => acc.id === updatedAccount.id ? updatedAccount : acc));
  }, [setAccounts]);

  const addAccountGroup = useCallback((group: Omit<AccountGroup, 'id'>) => {
    const newGroup: AccountGroup = {
        ...group,
        id: `acc_group-${new Date().toISOString()}-${Math.random()}`
    };
    setAccountGroups(prev => [...prev, newGroup]);
  }, [setAccountGroups]);

  const updateAccountGroup = useCallback((groupId: string, name: string) => {
      setAccountGroups(prev => prev.map(g => g.id === groupId ? { ...g, name } : g));
  }, [setAccountGroups]);

  const deleteAccounts = useCallback((accountIds: Set<string>) => {
      setAccounts(prev => prev.filter(a => !accountIds.has(a.id)));
      // TODO: Also delete transactions associated with these accounts or handle them.
  }, [setAccounts]);

  const addCategory = useCallback((category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
        ...category,
        id: `cat-${new Date().toISOString()}-${Math.random()}`
    };
    setCategories(prev => [...prev, newCategory]);
  }, [setCategories]);

  const addCategoryGroup = useCallback((group: Omit<CategoryGroup, 'id'>) => {
    const newGroup: CategoryGroup = {
        ...group,
        id: `group-${new Date().toISOString()}-${Math.random()}`
    };
    setCategoryGroups(prev => [...prev, newGroup]);
  }, [setCategoryGroups]);

  const updateCategoryGroup = useCallback((groupId: string, name: string) => {
      setCategoryGroups(prev => prev.map(g => g.id === groupId ? { ...g, name } : g));
  }, [setCategoryGroups]);
  
  const deleteCategories = useCallback((categoryIds: Set<string>) => {
      setCategories(prev => prev.filter(c => !categoryIds.has(c.id)));
  }, [setCategories]);

  return (
    <DataContext.Provider value={{ 
        transactions, 
        accounts, 
        accountGroups,
        categories, 
        categoryGroups,
        mainCurrency,
        setMainCurrency, 
        addTransaction, 
        addAccount,
        updateAccount,
        addAccountGroup,
        updateAccountGroup,
        deleteAccounts,
        addCategory, 
        addCategoryGroup, 
        updateCategoryGroup, 
        deleteCategories 
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};