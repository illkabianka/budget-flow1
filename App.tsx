typescript
import React, { useState } from 'react';
import BottomNav from './components/BottomNav';
import { DataProvider } from './context/DataContext';

// Lazy load pages for better initial performance
const OverviewPage = React.lazy(() => import('./pages/OverviewPage'));
const TransactionsPage = React.lazy(() => import('./pages/TransactionsPage'));
const BudgetsPage = React.lazy(() => import('./pages/BudgetsPage'));
const SettingsPage = React.lazy(() => import('./pages/SettingsPage'));
const AccountsPage = React.lazy(() => import('./pages/settings/AccountsPage'));
const CategoriesPage = React.lazy(() => import('./pages/settings/CategoriesPage'));
const PayeesPage = React.lazy(() => import('./pages/settings/PayeesPage'));
const TagsPage = React.lazy(() => import('./pages/settings/TagsPage'));
const RemindersPage = React.lazy(() => import('./pages/settings/RemindersPage'));
const SyncPage = React.lazy(() => import('./pages/settings/SyncPage'));
const RecurringPage = React.lazy(() => import('./pages/settings/RecurringPage'));


const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('overview');

  const navigateTo = (page: string) => setCurrentPage(page);

  const goBack = () => {
    const parts = currentPage.split('/');
    if (parts.length > 1) {
        setCurrentPage(parts.slice(0, -1).join('/'));
    } else {
        // Fallback to overview if at root level
        setCurrentPage('overview');
    }
  };


  const renderContent = () => {
    switch (currentPage) {
      case 'overview':
        return <OverviewPage />;
      case 'transactions':
        return <TransactionsPage />;
      case 'budgets':
        return <BudgetsPage />;
      case 'settings':
        return <SettingsPage navigateTo={navigateTo} />;
      case 'settings/accounts':
        return <AccountsPage onBack={goBack} />;
      case 'settings/categories':
        return <CategoriesPage onBack={goBack} />;
      case 'settings/payees':
        return <PayeesPage onBack={goBack} />;
      case 'settings/tags':
        return <TagsPage onBack={goBack} />;
      case 'settings/reminders':
        return <RemindersPage onBack={goBack} />;
      case 'settings/sync':
        return <SyncPage onBack={goBack} />;
      case 'settings/recurring':
        return <RecurringPage onBack={goBack} />;
      default:
        return <OverviewPage />;
    }
  };

  return (
    <DataProvider>
      <div className="flex flex-col h-screen bg-gray-900 font-sans">
        <main className="flex-grow overflow-y-auto">
          <React.Suspense fallback={<div className="w-full h-full flex items-center justify-center"><p>Загрузка...</p></div>}>
            {renderContent()}
          </React.Suspense>
        </main>
        <BottomNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </DataProvider>
  );
};

export default App;