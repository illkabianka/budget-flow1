import React from 'react';

export const MicIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"></path>
    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"></path>
  </svg>
);

export const StopIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 6h12v12H6z"></path>
    </svg>
);


export const PaperclipIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
  </svg>
);

export const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
  </svg>
);

export const WalletIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
      <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h15a3 3 0 013 3v15a3 3 0 01-3-3h-15a3 3 0 01-3-3V4.5zM3 16.5v-3.818a1.5 1.5 0 01.44-1.06l5.818-5.818a1.5 1.5 0 012.122 0l5.818 5.818a1.5 1.5 0 01.44 1.06V16.5a1.5 1.5 0 01-1.5 1.5h-15a1.5 1.5 0 01-1.5-1.5zM9 15a1.5 1.5 0 011.5-1.5h3A1.5 1.5 0 0115 15v1.5a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 019 16.5V15z" clipRule="evenodd" />
    </svg>
);


export const ArrowUpIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06l-6.22-6.22V21a.75.75 0 01-1.5 0V4.81l-6.22 6.22a.75.75 0 11-1.06-1.06l7.5-7.5z" clipRule="evenodd" />
    </svg>
);

export const ArrowDownIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M12.53 21.53a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 111.06-1.06L11.25 19.19V3a.75.75 0 011.5 0v16.19l6.22-6.22a.75.75 0 111.06 1.06l-7.5 7.5z" clipRule="evenodd" />
    </svg>
);

// Navigation Icons
export const OverviewIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3-3H6a3 3 0 01-3-3V6zm1.5 1.5a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75v4.5a.75.75 0 01-.75.75h-4.5a.75.75 0 01-.75-.75v-4.5zm7.5 0a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75v4.5a.75.75 0 01-.75.75h-4.5a.75.75 0 01-.75-.75v-4.5zM4.5 13.5a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75v4.5a.75.75 0 01-.75.75h-4.5a.75.75 0 01-.75-.75v-4.5zm7.5 0a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75v4.5a.75.75 0 01-.75.75h-4.5a.75.75 0 01-.75-.75v-4.5z" clipRule="evenodd" />
    </svg>
);

export const OperationsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M2.625 6.75a.75.75 0 01.75-.75h17.25a.75.75 0 010 1.5H3.375a.75.75 0 01-.75-.75zm0 6a.75.75 0 01.75-.75h17.25a.75.75 0 010 1.5H3.375a.75.75 0 01-.75-.75zm0 6a.75.75 0 01.75-.75h17.25a.75.75 0 010 1.5H3.375a.75.75 0 01-.75-.75z" clipRule="evenodd" />
    </svg>
);

export const BudgetsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M10.5 4.5a.75.75 0 00-1.5 0v.75a.75.75 0 001.5 0v-.75zM15 4.5a.75.75 0 00-1.5 0v.75a.75.75 0 001.5 0v-.75zM4.5 10.5a.75.75 0 01.75-.75h.75a.75.75 0 010 1.5h-.75a.75.75 0 01-.75-.75zM4.5 15a.75.75 0 01.75-.75h.75a.75.75 0 010 1.5h-.75a.75.75 0 01-.75-.75zM10.5 18a.75.75 0 00-1.5 0v.75a.75.75 0 001.5 0v-.75zM15 18a.75.75 0 00-1.5 0v.75a.75.75 0 001.5 0v-.75zM18 10.5a.75.75 0 01.75-.75h.75a.75.75 0 010 1.5h-.75a.75.75 0 01-.75-.75zM18 15a.75.75 0 01.75-.75h.75a.75.75 0 010 1.5h-.75a.75.75 0 01-.75-.75z" />
        <path fillRule="evenodd" d="M6 3a3 3 0 00-3 3v12a3 3 0 003 3h12a3 3 0 003-3V6a3 3 0 00-3-3H6zm1.5 7.5a.75.75 0 000 1.5h9a.75.75 0 000-1.5h-9z" clipRule="evenodd" />
    </svg>
);

export const SettingsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.946 1.55l-.26 1.039a5.25 5.25 0 00-1.023.635l-.973-.346a1.95 1.95 0 00-2.14.73l-1.038 1.799a1.95 1.95 0 00.73 2.14l.974.346a5.25 5.25 0 000 1.27l-.974.346a1.95 1.95 0 00-.73 2.14l1.038 1.799a1.95 1.95 0 002.14.73l.973-.346a5.25 5.25 0 001.023.635l.26 1.039a1.95 1.95 0 001.946 1.55h2.244a1.95 1.95 0 001.946-1.55l.26-1.039a5.25 5.25 0 001.023-.635l.973.346a1.95 1.95 0 002.14-.73l1.038-1.799a1.95 1.95 0 00-.73-2.14l-.974-.346a5.25 5.25 0 000-1.27l.974.346a1.95 1.95 0 00.73-2.14l-1.038-1.799a1.95 1.95 0 00-2.14-.73l-.973.346a5.25 5.25 0 00-1.023-.635l-.26-1.039A1.95 1.95 0 0013.322 2.25H11.08zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clipRule="evenodd" />
    </svg>
);


// Action & UI Icons
export const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
    </svg>
);

export const ChevronLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M15.78 5.22a.75.75 0 010 1.06L10.06 12l5.72 5.72a.75.75 0 11-1.06 1.06l-6.25-6.25a.75.75 0 010-1.06l6.25-6.25a.75.75 0 011.06 0z" clipRule="evenodd" />
    </svg>
);

export const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 011.06 0l6 6a.75.75 0 010 1.06l-6 6a.75.75 0 01-1.06-1.06L13.69 12 8.22 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
    </svg>
);

export const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
    </svg>
);

export const MoreIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 12a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm6 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm6 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
);

export const CategoryTagIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M4.5 3.75a.75.75 0 00-.75.75v6.19l7.46-7.46A.75.75 0 0010.69 3H5.25a.75.75 0 00-.75.75zm.964 9.925 9.406-9.405a2.25 2.25 0 013.182 0l4.309 4.309a2.25 2.25 0 010 3.182l-9.406 9.405a.75.75 0 00-.22.53v2.81a.75.75 0 01-1.5 0V19.5a.75.75 0 00-.22-.53l-2.612-2.612a.75.75 0 00-1.06 0l-4.31-4.31a.75.75 0 000-1.06zM18 10.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" clipRule="evenodd" />
    </svg>
);

export const CategoryGroupIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.5 21a3 3 0 003-3V9a3 3 0 00-3-3h-5.25a3 3 0 00-2.65 1.5L9.9 9H4.5a3 3 0 00-3 3v6a3 3 0 003 3h15z" />
    </svg>
);

export const SelectIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
      <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
    </svg>
);


// Settings Icons
export const AccountsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.5 3.75a3 3 0 00-3 3v10.5a3 3 0 003 3h15a3 3 0 003-3V6.75a3 3 0 00-3-3h-15z" />
      <path fillRule="evenodd" d="M21 8.25a1.5 1.5 0 00-1.5-1.5H4.5a1.5 1.5 0 00-1.5 1.5v1.858c.231.024.465.042.7.042h15.6a.75.75 0 01.7.042V8.25z" clipRule="evenodd" fill="#475569" />
    </svg>
);
export const BankIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        <path d="M0 0h24v24H0z" fill="none"/>
        <path fillRule="evenodd" d="M3.75 5.25a3 3 0 013-3h10.5a3 3 0 013 3v1.5a.75.75 0 01-1.5 0V5.25a1.5 1.5 0 00-1.5-1.5H6.75a1.5 1.5 0 00-1.5 1.5v13.5a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5v-1.5a.75.75 0 011.5 0V18.75a3 3 0 01-3 3H6.75a3 3 0 01-3-3V5.25z" clipRule="evenodd" />
        <path d="M15.75 8.25a.75.75 0 01.75.75v6a.75.75 0 01-1.5 0v-6a.75.75 0 01.75-.75zM12 8.25a.75.75 0 01.75.75v6a.75.75 0 01-1.5 0v-6a.75.75 0 01.75-.75zM8.25 8.25a.75.75 0 01.75.75v6a.75.75 0 01-1.5 0v-6a.75.75 0 01.75-.75z" />
    </svg>
);
export const CategoriesIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M9.25 2.25a.75.75 0 00-1.5 0V3h-1.5a3 3 0 00-3 3v1.5H2.25a.75.75 0 000 1.5H3v1.5H2.25a.75.75 0 000 1.5H3v1.5H2.25a.75.75 0 000 1.5H3v1.5a3 3 0 003 3h1.5v.75a.75.75 0 001.5 0V21h1.5v.75a.75.75 0 001.5 0V21h1.5v.75a.75.75 0 001.5 0V21h1.5a3 3 0 003-3v-1.5h.75a.75.75 0 000-1.5h-.75v-1.5h.75a.75.75 0 000-1.5h-.75v-1.5h.75a.75.75 0 000-1.5h-.75V6a3 3 0 00-3-3h-1.5V2.25a.75.75 0 00-1.5 0V3h-1.5V2.25a.75.75 0 00-1.5 0V3h-1.5V2.25zM15 6.75a.75.75 0 00-1.5 0v10.5a.75.75 0 001.5 0V6.75z" />
    </svg>
);
export const CurrencyIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25v2.25H9a.75.75 0 000 1.5h2.25V18a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9.75H15a.75.75 0 000-1.5h-2.25V6z" clipRule="evenodd" />
    </svg>
);
export const PayeesIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
    </svg>
);
export const TagsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M5.25 3a.75.75 0 00-.75.75v16.5a.75.75 0 001.5 0V15h13.5a.75.75 0 000-1.5H6V9h13.5a.75.75 0 000-1.5H6V3.75A.75.75 0 005.25 3zM15.75 3a.75.75 0 00-.75.75v16.5a.75.75 0 001.5 0V3.75a.75.75 0 00-.75-.75z" />
    </svg>
);
export const RemindersIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M10.5 5.25a.75.75 0 01.75.75v.008l.094.004c.394.018.775.059 1.156.124a10.493 10.493 0 016.43 2.158c.24.232.358.552.358.874V18a.75.75 0 01-1.5 0v-6.331a9 9 0 00-5.617-2.07c-.432-.064-.87-.107-1.312-.132l-.128-.005a.75.75 0 01-.75-.75V5.25z" />
        <path fillRule="evenodd" d="M9.013 18.2a4.493 4.493 0 01-1.285-.515 1.5 1.5 0 01-1.04-1.493v-2.31a.75.75 0 01.375-.65.625.625 0 01.75.06l.75 1.03a4.49 4.49 0 012.351.246 1.5 1.5 0 01.918 2.146 4.493 4.493 0 01-3.814 1.527zM15 13.5a.75.75 0 01.75.75v.008l.094.004c.394.018.775.059 1.156.124a6.993 6.993 0 014.287 1.438c.24.232.358.552.358.874v.792a.75.75 0 01-1.5 0v-.792a5.493 5.493 0 00-3.35-1.12c-.432-.064-.87-.107-1.312-.132l-.128-.005a.75.75 0 01-.75-.75v-.008z" clipRule="evenodd" />
    </svg>
);
export const SyncIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M12 1.5a.75.75 0 01.75.75V3a.75.75 0 01-1.5 0V2.25A.75.75 0 0112 1.5zM5.636 4.136a.75.75 0 011.06 0l.915.914a.75.75 0 01-1.06 1.06l-.915-.914a.75.75 0 010-1.06zM2.25 12a.75.75 0 01.75-.75H4.5a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zM5.636 19.864a.75.75 0 010-1.06l.915-.915a.75.75 0 011.06 1.06l-.915.915a.75.75 0 01-1.06 0zM12 22.5a.75.75 0 01-.75-.75V21a.75.75 0 011.5 0v.75a.75.75 0 01-.75.75zM17.293 18.707a.75.75 0 011.06 0l.914-.915a.75.75 0 011.06 1.06l-.914.915a.75.75 0 01-1.06 0zM21.75 12a.75.75 0 01-.75.75H19.5a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75zM17.293 5.293a.75.75 0 010 1.06l-.914.915a.75.75 0 01-1.06-1.06l.914-.915a.75.75 0 011.06 0z" clipRule="evenodd" />
        <path d="M11.12 6.092A5.251 5.251 0 0113.5 5.25a5.25 5.25 0 015.25 5.25c0 1.524-.648 2.888-1.684 3.824a.75.75 0 01-1.062-1.061A3.75 3.75 0 1013.5 6.75a3.738 3.738 0 00-1.58.337.75.75 0 01-1.018-1.063 5.215 5.215 0 01.218-.032z" />
    </svg>
);
export const RecurringIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M15.97 4.47a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H6.75a.75.75 0 010-1.5h11.69l-2.47-2.47a.75.75 0 010-1.06zM8.03 16.47a.75.75 0 01-1.06 0l-3.75-3.75a.75.75 0 010-1.06l3.75-3.75a.75.75 0 011.06 1.06L5.56 11.25h11.69a.75.75 0 010 1.5H5.56l2.47 2.47a.75.75 0 010 1.06z" clipRule="evenodd" />
    </svg>
);
export const HeartIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-1.383-.597 15.363 15.363 0 01-1.897-1.177 15.363 15.363 0 01-1.897-1.177C6.449 16.59 5.341 15.54 4.5 14.25c-.841-1.291-1.233-2.652-1.233-4.01V9.75c0-1.358.392-2.719 1.233-4.01.841-1.29 1.949-2.34 2.853-3.144C8.36 2.502 9.423 2 10.5 2h3c1.077 0 2.14.502 3.147 1.106.904.805 2.012 1.854 2.853 3.144.841 1.291 1.233 2.652 1.233 4.01v.49c0 1.358-.392-2.719-1.233 4.01-.841-1.29-1.949 2.34-2.853 3.144a15.363 15.363 0 01-1.897 1.177 15.363 15.363 0 01-1.897 1.177 15.247 15.247 0 01-1.383.597l-.022.012-.007.003z" />
    </svg>
);
export const MailIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
        <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
    </svg>
);


// NEW Category Icons
export const PocketMoneyIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
        <path d="M13.913 2.938a.75.75 0 01.246 1.044l-4.25 7.5a.75.75 0 01-1.3.062l-2.25-4.5a.75.75 0 011.06-1.06l1.72 3.44 3.72-6.596a.75.75 0 011.044-.246z" />
    </svg>
);
export const ClientsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M5.25 4.5a.75.75 0 01.75.75v13.5a.75.75 0 01-1.5 0V5.25a.75.75 0 01.75-.75zm14.25 0a.75.75 0 01.75.75v13.5a.75.75 0 01-1.5 0V5.25a.75.75 0 01.75-.75zm-6.75 0a.75.75 0 01.75.75v13.5a.75.75 0 01-1.5 0V5.25a.75.75 0 01.75-.75zM9 4.5a.75.75 0 01.75.75v13.5a.75.75 0 01-1.5 0V5.25a.75.75 0 01.75-.75zM15.75 4.5a.75.75 0 01.75.75v13.5a.75.75 0 01-1.5 0V5.25a.75.75 0 01.75-.75z" />
        <path fillRule="evenodd" d="M3 3.75A.75.75 0 013.75 3h16.5a.75.75 0 01.75.75v16.5a.75.75 0 01-.75.75H3.75a.75.75 0 01-.75-.75V3.75zm1.5 0V12h15V3.75h-15z" clipRule="evenodd" />
    </svg>
);
export const AdditionalIncomeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 9a.75.75 0 01.75.75v3c0 .414-.336.75-.75.75h-3a.75.75 0 010-1.5h2.25V9.75A.75.75 0 019 9z" />
        <path fillRule="evenodd" d="M3 3.75A.75.75 0 013.75 3h16.5a.75.75 0 01.75.75v16.5a.75.75 0 01-.75-.75V3.75H3.75zM5.25 5.25v13.5h13.5V5.25H5.25zM12 8.25a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H12zM12 11.25a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H12z" clipRule="evenodd" />
    </svg>
);
export const RefundsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.356 3.018a.75.75 0 00-1.06-1.06L7.21 5.925a.75.75 0 000 1.06l4.086 3.968a.75.75 0 001.06-1.06l-2.618-2.544 6.17.412a.75.75 0 00.672-.823 8.25 8.25 0 00-8.25-7.92zM12.001 15a.75.75 0 00-1.06 1.06l2.618 2.544-6.17-.412a.75.75 0 00-.672.823 8.25 8.25 0 008.25 7.92 8.25 8.25 0 008.25-8.25.75.75 0 00-.75-.75h-2.25a.75.75 0 000 1.5h.582a6.75 6.75 0 01-6.16 4.965l.504-3.784a.75.75 0 00-.495-.862l-2.07-.69z" />
    </svg>
);
export const OtherIncomeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M17.97 15.684A3.75 3.75 0 0116.5 15a3.75 3.75 0 011.04-2.578.75.75 0 00-1.1-1.025A5.25 5.25 0 0015 15a5.25 5.25 0 001.43 3.535.75.75 0 001.1-1.025A3.73 3.73 0 0117.97 15.684zM12 3a.75.75 0 01.75.75v16.5a.75.75 0 01-1.5 0V3.75A.75.75 0 0112 3zM4.03 5.293a.75.75 0 010 1.06l-1.93 1.93a.75.75 0 01-1.06-1.06l1.93-1.93a.75.75 0 011.06 0zm1.93 1.93a.75.75 0 011.06 0l1.93 1.93a.75.75 0 01-1.06 1.06L5.96 8.283a.75.75 0 010-1.06z" clipRule="evenodd" />
    </svg>
);
export const FoodIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.923 5.104a.75.75 0 01.996-1.12l5.25 4.667a.75.75 0 010 1.12l-5.25 4.667a.75.75 0 01-1-1.12L17.14 10H14.25a3 3 0 00-3 3v7.5a.75.75 0 01-1.5 0V13a4.5 4.5 0 014.5-4.5h2.89l-4.217-3.746z" />
        <path d="M9.75 8.25a.75.75 0 01-.75-.75V3a.75.75 0 011.5 0v4.5a.75.75 0 01-.75.75zm-1.5 1.5a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H8.25zM6 9.75A.75.75 0 015.25 9V3a.75.75 0 011.5 0v6a.75.75 0 01-.75.75zm-1.5 1.5a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H4.5z" />
    </svg>
);
export const SupermarketIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.46-5.232.75.75 0 00-.674-.968H9.75a.75.75 0 01-.75-.75V5.192l-2.88-9.594a.438.438 0 00-.412-.32H2.25zM6.25 18a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM18.25 18a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
);
export const BarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 1.5a.75.75 0 01.75.75V3h-1.5V2.25A.75.75 0 0118 1.5zM16.5 3V2.25a2.25 2.25 0 012.25-2.25h.001c1.241 0 2.249 1.008 2.249 2.25V3h1.5a.75.75 0 010 1.5h-.035l-1.35 11.237A3.75 3.75 0 0117.126 19.5H6.874a3.75 3.75 0 01-3.738-3.763L1.785 4.5H1.75a.75.75 0 010-1.5h14.75zM4.743 15.228A2.25 2.25 0 016.874 18h10.252a2.25 2.25 0 012.131-2.772l1.125-9.378H3.618l1.125 9.378z" />
    </svg>
);
export const SalaryIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M9.375 3a.75.75 0 000 1.5h1.125v1.5H9.375a.75.75 0 000 1.5h1.125V9h-1.5a.75.75 0 000 1.5h1.5v1.5h-1.5a.75.75 0 000 1.5h1.5v1.5h-1.5a.75.75 0 000 1.5h1.5V18h-1.125a.75.75 0 000 1.5h5.25a.75.75 0 000-1.5h-1.125V6.75h1.125a.75.75 0 000-1.5H13.5V3.75h1.125a.75.75 0 000-1.5h-5.25z" />
        <path fillRule="evenodd" d="M3 1.5A1.5 1.5 0 001.5 3v18A1.5 1.5 0 003 22.5h18a1.5 1.5 0 001.5-1.5V3A1.5 1.5 0 0021 1.5H3zm18 1.5v3.75H3V3h18zM3 9.75v11.25h18V9.75H3z" clipRule="evenodd" />
    </svg>
);
export const TransportIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h15a3 3 0 013 3v12a3 3 0 01-3 3H4.5a3 3 0 01-3-3v-12zm3-1.5a1.5 1.5 0 00-1.5 1.5v12a1.5 1.5 0 001.5 1.5h15a1.5 1.5 0 001.5-1.5v-12a1.5 1.5 0 00-1.5-1.5h-15z" clipRule="evenodd" />
        <path d="M5.25 12a.75.75 0 01.75-.75H9a.75.75 0 010 1.5H6a.75.75 0 01-.75-.75zm3.75 2.25a.75.75 0 000-1.5H12a.75.75 0 000 1.5H9z" />
    </svg>
);