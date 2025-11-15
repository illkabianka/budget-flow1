import React from 'react';
import Header from '../components/Header';
import { useData } from '../context/DataContext';
import { 
    AccountsIcon, CategoriesIcon, PayeesIcon, TagsIcon, RemindersIcon, 
    SyncIcon, RecurringIcon, HeartIcon, MailIcon, ChevronRightIcon, CurrencyIcon
} from '../components/icons';

type SettingItemProps = {
    icon: React.ElementType;
    label: string;
    onClick?: () => void;
};

const SettingItem: React.FC<SettingItemProps> = ({ icon: Icon, label, onClick }) => (
    <button onClick={onClick} className="w-full flex items-center justify-between p-4 bg-gray-800 rounded-lg text-left transition-colors hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed" disabled={!onClick}>
        <div className="flex items-center space-x-4">
            <Icon className="w-6 h-6 text-gray-400" />
            <span className="text-gray-200">{label}</span>
        </div>
        {onClick && <ChevronRightIcon className="w-5 h-5 text-gray-500" />}
    </button>
);

const SelectSettingItem: React.FC<{
    icon: React.ElementType;
    label: string;
    value: string;
    onChange: (newValue: string) => void;
    options: { value: string; label: string }[];
}> = ({ icon: Icon, label, value, onChange, options }) => (
    <div className="w-full flex items-center justify-between p-4 bg-gray-800 rounded-lg">
        <div className="flex items-center space-x-4">
            <Icon className="w-6 h-6 text-gray-400" />
            <span className="text-gray-200">{label}</span>
        </div>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="bg-gray-700 text-white py-1 px-2 rounded-lg border-none outline-none appearance-none"
        >
            {options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    </div>
);


const SettingsSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div>
        <h2 className="px-4 py-2 text-sm font-semibold text-gray-500 uppercase tracking-wider">{title}</h2>
        <div className="space-y-2 px-4">{children}</div>
    </div>
);

interface SettingsPageProps {
    navigateTo: (page: string) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ navigateTo }) => {
    const { mainCurrency, setMainCurrency } = useData();
    
    const generalSettings = [
        { label: 'Счета', icon: AccountsIcon, path: 'settings/accounts' },
        { label: 'Категории', icon: CategoriesIcon, path: 'settings/categories' },
        { label: 'Получатели', icon: PayeesIcon, path: 'settings/payees' },
        { label: 'Теги', icon: TagsIcon, path: 'settings/tags' },
        { label: 'Напоминания', icon: RemindersIcon, path: 'settings/reminders' },
    ];

    const dataSettings = [
        { label: 'Синхронизация и данные', icon: SyncIcon, path: 'settings/sync' },
        { label: 'Повторяющиеся операции', icon: RecurringIcon, path: 'settings/recurring' },
    ];

    const supportSettings = [
        { label: 'Рассказать друзьям', icon: HeartIcon, action: () => alert('Скоро здесь можно будет поделиться приложением!') },
        { label: 'Связаться с разработчиком', icon: MailIcon, action: () => window.location.href = 'mailto:support@flowbudget.app' },
    ];


    return (
        <div className="pb-24">
            <Header title="Настройки" />
            <div className="py-4 space-y-6">
                <SettingsSection title="Общие">
                    {generalSettings.map(item => <SettingItem key={item.label} label={item.label} icon={item.icon} onClick={() => navigateTo(item.path)} />)}
                </SettingsSection>
                <SettingsSection title="Валюта">
                    <SelectSettingItem 
                        label="Основная валюта" 
                        icon={CurrencyIcon}
                        value={mainCurrency}
                        onChange={setMainCurrency}
                        options={[
                            { value: 'KZT', label: 'KZT' },
                            { value: 'USD', label: 'USD' },
                            { value: 'RUB', label: 'RUB' },
                        ]}
                    />
                </SettingsSection>
                <SettingsSection title="Данные">
                    {dataSettings.map(item => <SettingItem key={item.label} label={item.label} icon={item.icon} onClick={() => navigateTo(item.path)} />)}
                </SettingsSection>
                 <SettingsSection title="Поддержка">
                    {supportSettings.map(item => <SettingItem key={item.label} label={item.label} icon={item.icon} onClick={item.action} />)}
                </SettingsSection>
            </div>
        </div>
    );
};

export default SettingsPage;