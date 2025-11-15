import React from 'react';
import SubPageHeader from '../../components/SubPageHeader';
import { RecurringIcon } from '../../components/icons';

interface RecurringPageProps {
  onBack: () => void;
}

const RecurringPage: React.FC<RecurringPageProps> = ({ onBack }) => {
    return (
        <div className="pb-20">
            <SubPageHeader title="Повторяющиеся операции" onBack={onBack} />
            <div className="flex flex-col items-center justify-center h-[calc(100vh-150px)] text-center text-gray-500">
                <RecurringIcon className="w-24 h-24 mb-4" />
                <h2 className="text-xl font-semibold text-gray-300">Повторяющиеся операции</h2>
                <p className="mt-2 max-w-xs">Этот раздел находится в разработке.</p>
            </div>
        </div>
    );
};

export default RecurringPage;
