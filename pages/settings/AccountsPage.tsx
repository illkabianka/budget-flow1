import React, { useState, useEffect, useRef } from 'react';
import { useData } from '../../context/DataContext';
import * as Icons from '../../components/icons';
import AddAccountModal from '../../components/AddAccountModal';
import EditAccountGroupModal from '../../components/EditAccountGroupModal';
import { Account, AccountGroup } from '../../types';

const iconMap: { [key: string]: React.FC<{ className?: string }> } = {
    WalletIcon: Icons.WalletIcon,
    BankIcon: Icons.BankIcon,
    AccountsIcon: Icons.AccountsIcon
};

interface AccountsPageProps {
  onBack: () => void;
}

const AccountsPage: React.FC<AccountsPageProps> = ({ onBack }) => {
    const { accounts, accountGroups, mainCurrency, addAccount, updateAccount, addAccountGroup, updateAccountGroup, deleteAccounts } = useData();
    const [isPlusMenuOpen, setPlusMenuOpen] = useState(false);
    const [isMoreMenuOpen, setMoreMenuOpen] = useState(false);
    const [isAddAccountModalOpen, setAddAccountModalOpen] = useState(false);
    const [isAccountActionModalOpen, setAccountActionModalOpen] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
    const [editingAccount, setEditingAccount] = useState<Account | null>(null);
    const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
    const [editingGroup, setEditingGroup] = useState<AccountGroup | null>(null);
    const [isSelectMode, setIsSelectMode] = useState(false);
    const [selectedAccounts, setSelectedAccounts] = useState<Set<string>>(new Set());

    const plusMenuRef = useRef<HTMLDivElement>(null);
    const moreMenuRef = useRef<HTMLDivElement>(null);

    const exchangeRates: { [key: string]: number } = {
        'KZT': 1, 'USD': 450, 'RUB': 5,
    };

    const convertToMainCurrency = (amount: number, fromCurrency: string): number => {
        if (fromCurrency === mainCurrency) return amount;
        const rateInKZT = exchangeRates[fromCurrency] || 1;
        const amountInKZT = amount * rateInKZT;
        const mainCurrencyRate = exchangeRates[mainCurrency] || 1;
        return amountInKZT / mainCurrencyRate;
    };

    const handleOpenAddModal = () => {
        setEditingAccount(null);
        setAddAccountModalOpen(true);
        setPlusMenuOpen(false);
    };
    
    const handleOpenAddGroupModal = () => {
        setEditingGroup(null);
        setIsGroupModalOpen(true);
        setPlusMenuOpen(false);
    };
    
    const handleOpenEditGroupModal = (group: AccountGroup) => {
        setEditingGroup(group);
        setIsGroupModalOpen(true);
    };
    
    const handleSaveGroup = (id: string | null, name: string) => {
        if (id) {
            updateAccountGroup(id, name);
        } else {
            addAccountGroup({ name });
        }
        setIsGroupModalOpen(false);
        setEditingGroup(null);
    };

    const handleSaveAccount = (accountData: Account | Omit<Account, 'id'>) => {
        if ('id' in accountData) {
            updateAccount(accountData as Account);
        } else {
            addAccount(accountData as Omit<Account, 'id'>);
        }
        setAddAccountModalOpen(false);
        setEditingAccount(null);
    };
    
    const handleAccountClick = (account: Account) => {
        if (isSelectMode) {
            toggleAccountSelection(account.id);
        } else {
            setSelectedAccount(account);
            setAccountActionModalOpen(true);
        }
    };

    const toggleAccountSelection = (accountId: string) => {
        setSelectedAccounts(prev => {
            const newSelection = new Set(prev);
            if (newSelection.has(accountId)) {
                newSelection.delete(accountId);
            } else {
                newSelection.add(accountId);
            }
            return newSelection;
        });
    };
    
    const getAccountPlural = (count: number) => {
        if (count === 1) return 'счет';
        if (count > 1 && count < 5) return 'счета';
        return 'счетов';
    }

    const handleDeleteSelectedAccounts = () => {
        if (selectedAccounts.size === 0) return;
        if (window.confirm(`Вы уверены, что хотите удалить ${selectedAccounts.size} ${getAccountPlural(selectedAccounts.size)}? Это действие нельзя отменить.`)) {
            deleteAccounts(selectedAccounts);
            setSelectedAccounts(new Set());
            setIsSelectMode(false);
        }
    };

    const groupedAccounts = accountGroups.map(group => ({
        ...group,
        accounts: accounts.filter(acc => acc.groupId === group.id)
    }));
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (plusMenuRef.current && !plusMenuRef.current.contains(event.target as Node)) {
                setPlusMenuOpen(false);
            }
            if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
                setMoreMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const renderHeader = () => {
        if (isSelectMode) {
            return (
                <div className="p-4 flex justify-between items-center sticky top-0 z-10 bg-gray-900/80 backdrop-blur-sm">
                    <button onClick={handleDeleteSelectedAccounts} className="px-2 py-1 text-lg text-red-400 disabled:text-gray-600" disabled={selectedAccounts.size === 0}>
                        Удалить
                    </button>
                    <h1 className="text-xl font-bold text-gray-200">{selectedAccounts.size > 0 ? `Выбрано: ${selectedAccounts.size}` : 'Выбрать счета'}</h1>
                    <button onClick={() => { setIsSelectMode(false); setSelectedAccounts(new Set()); }} className="px-2 py-1 text-lg text-blue-400 font-semibold">
                        Отмена
                    </button>
                </div>
            );
        }
        return (
            <div className="p-4 flex justify-between items-center sticky top-0 z-10 bg-gray-900/80 backdrop-blur-sm">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-800">
                    <Icons.ChevronLeftIcon className="w-6 h-6" />
                </button>
                <div className="flex items-center space-x-2">
                    <div className="relative" ref={plusMenuRef}>
                        <button onClick={() => { setPlusMenuOpen(!isPlusMenuOpen); setMoreMenuOpen(false); }} className="p-2 rounded-full hover:bg-gray-800">
                            <Icons.PlusIcon className="w-6 h-6" />
                        </button>
                        {isPlusMenuOpen && (
                            <div className="absolute right-0 mt-2 w-56 bg-gray-700 rounded-xl shadow-lg z-20 p-2">
                                <button onClick={handleOpenAddModal} className="w-full flex items-center text-left px-3 py-2 text-sm text-gray-200 hover:bg-gray-600 rounded-lg">
                                    <Icons.AccountsIcon className="w-5 h-5 mr-3" />
                                    Новый счет
                                </button>
                                <button onClick={handleOpenAddGroupModal} className="w-full flex items-center text-left px-3 py-2 text-sm text-gray-200 hover:bg-gray-600 rounded-lg">
                                    <Icons.CategoryGroupIcon className="w-5 h-5 mr-3" />
                                    Новая группа
                                </button>
                            </div>
                        )}
                    </div>
                     <div className="relative" ref={moreMenuRef}>
                        <button onClick={() => { setMoreMenuOpen(!isMoreMenuOpen); setPlusMenuOpen(false); }} className="p-2 rounded-full hover:bg-gray-800">
                            <Icons.MoreIcon className="w-6 h-6" />
                        </button>
                        {isMoreMenuOpen && (
                             <div className="absolute right-0 mt-2 w-56 bg-gray-700 rounded-xl shadow-lg z-20 p-2">
                                <button onClick={() => { setIsSelectMode(true); setMoreMenuOpen(false); }} className="w-full flex items-center text-left px-3 py-2 text-sm text-gray-200 hover:bg-gray-600 rounded-lg">
                                    <Icons.SelectIcon className="w-5 h-5 mr-3" />
                                    Выбрать
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 min-h-screen text-gray-200 pb-20">
            {renderHeader()}

            {!isSelectMode && <h1 className="text-4xl font-bold px-4 mt-2 mb-6">Счета</h1>}

            <div className={`px-4 space-y-8 ${isSelectMode ? 'pt-4' : ''}`}>
                {groupedAccounts.map(group => {
                    const groupTotal = group.accounts.reduce((sum, acc) => {
                        return sum + convertToMainCurrency(acc.balance, acc.currency);
                    }, 0);

                    return (
                        <div key={group.id}>
                            <div className="flex justify-between items-center mb-2 px-1">
                                <div>
                                    <h2 className="text-xl font-semibold">{group.name}</h2>
                                    {group.accounts.length > 0 && (
                                        <p className="text-sm text-gray-400">
                                            {groupTotal.toLocaleString('ru-RU', { maximumFractionDigits: 0 })} {mainCurrency}
                                        </p>
                                    )}
                                </div>
                                {!isSelectMode && <button onClick={() => handleOpenEditGroupModal(group)} className="text-sm text-blue-400 hover:text-blue-300">Изменить</button>}
                            </div>
                            <div className="bg-gray-800 rounded-xl">
                                <ul className="divide-y divide-gray-700">
                                    {group.accounts.map(account => {
                                        const IconComponent = iconMap[account.icon] || Icons.WalletIcon;
                                        const isSelected = selectedAccounts.has(account.id);
                                        return (
                                            <li key={account.id} onClick={() => handleAccountClick(account)} className={`flex items-center p-3 space-x-4 text-left transition-colors duration-150 ${!isSelectMode ? 'hover:bg-gray-700/50' : ''} ${isSelected ? 'bg-blue-500/10' : ''}`}>
                                                {isSelectMode && (
                                                    <div className="pr-2">
                                                        <div className={`w-6 h-6 rounded-full border-2 ${isSelected ? 'bg-blue-500 border-blue-500' : 'border-gray-500'} flex items-center justify-center`}>
                                                            {isSelected && <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="w-10 h-10 p-2 rounded-full flex items-center justify-center" style={{ backgroundColor: account.color ? `${account.color}20` : '#67E8F920' }}>
                                                    <IconComponent className="w-6 h-6" style={{ color: account.color || '#67E8F9' }} />
                                                </div>
                                                <span className="flex-grow text-gray-200 font-semibold">{account.name}</span>
                                                <div className="text-right">
                                                    <p className="text-gray-200 font-medium">{account.balance.toLocaleString('ru-RU')} <span className="text-gray-400">{account.currency}</span></p>
                                                    {account.currency !== mainCurrency && (
                                                        <p className="text-xs text-gray-500">
                                                            ≈ {convertToMainCurrency(account.balance, account.currency).toLocaleString('ru-RU', { maximumFractionDigits: 0 })} {mainCurrency}
                                                        </p>
                                                    )}
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            <AddAccountModal 
                isOpen={isAddAccountModalOpen}
                onClose={() => {
                    setAddAccountModalOpen(false);
                    setEditingAccount(null);
                }}
                onSave={handleSaveAccount}
                accountToEdit={editingAccount}
            />

            <EditAccountGroupModal 
                isOpen={isGroupModalOpen}
                onClose={() => setIsGroupModalOpen(false)}
                onSave={handleSaveGroup}
                group={editingGroup}
            />

            {isAccountActionModalOpen && selectedAccount && (
                <div 
                    className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
                    onClick={() => setAccountActionModalOpen(false)}
                >
                    <div 
                        className="w-full max-w-sm bg-gray-800 rounded-2xl shadow-lg p-3 space-y-2"
                        onClick={e => e.stopPropagation()}
                    >
                        <button 
                            onClick={() => {
                                setEditingAccount(selectedAccount);
                                setAccountActionModalOpen(false);
                                setAddAccountModalOpen(true);
                            }}
                            className="w-full py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors">
                            Изменить счет
                        </button>
                        <button className="w-full py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors">
                            Показать операции
                        </button>
                         <button onClick={() => setAccountActionModalOpen(false)} className="w-full py-3 mt-4 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors">
                            Отмена
                        </button>
                    </div>
                </div>
            )}

             {isSelectMode && selectedAccounts.size > 0 && (
                <div className="fixed bottom-0 left-0 right-0 bg-gray-800/80 backdrop-blur-sm border-t border-gray-700 p-4 flex justify-center z-20">
                    <button className="text-blue-400 text-lg font-semibold">Переместить</button>
                </div>
            )}
        </div>
    );
};

export default AccountsPage;