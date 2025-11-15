
import React, { useState, useEffect, useRef } from 'react';
import { useData } from '../../context/DataContext';
import * as Icons from '../../components/icons';
import AddCategoryModal from '../../components/AddCategoryModal';
import EditCategoryGroupModal from '../../components/EditCategoryGroupModal';
import { Category, CategoryGroup } from '../../types';

const iconMap: { [key: string]: React.FC<{ className?: string }> } = {
    PocketMoneyIcon: Icons.PocketMoneyIcon,
    ClientsIcon: Icons.ClientsIcon,
    AdditionalIncomeIcon: Icons.AdditionalIncomeIcon,
    RefundsIcon: Icons.RefundsIcon,
    OtherIncomeIcon: Icons.OtherIncomeIcon,
    FoodIcon: Icons.FoodIcon,
    SupermarketIcon: Icons.SupermarketIcon,
    BarIcon: Icons.BarIcon,
    SalaryIcon: Icons.SalaryIcon,
    TransportIcon: Icons.TransportIcon,
    CategoryTagIcon: Icons.CategoryTagIcon
};

interface CategoriesPageProps {
  onBack: () => void;
}

const CategoriesPage: React.FC<CategoriesPageProps> = ({ onBack }) => {
    const { categories, categoryGroups, addCategory, addCategoryGroup, updateCategoryGroup, deleteCategories } = useData();
    const [isPlusMenuOpen, setPlusMenuOpen] = useState(false);
    const [isMoreMenuOpen, setMoreMenuOpen] = useState(false);
    const [isAddCategoryModalOpen, setAddCategoryModalOpen] = useState(false);
    const [isCategoryActionModalOpen, setCategoryActionModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [initialGroupIdForModal, setInitialGroupIdForModal] = useState<string | undefined>();
    const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
    const [editingGroup, setEditingGroup] = useState<CategoryGroup | null>(null);
    const [isSelectMode, setIsSelectMode] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());

    const plusMenuRef = useRef<HTMLDivElement>(null);
    const moreMenuRef = useRef<HTMLDivElement>(null);

    const handleOpenAddModal = (groupId?: string) => {
        setInitialGroupIdForModal(groupId);
        setAddCategoryModalOpen(true);
        setPlusMenuOpen(false);
    };
    
    const handleOpenAddGroupModal = () => {
        setEditingGroup(null);
        setIsGroupModalOpen(true);
        setPlusMenuOpen(false);
    };
    
    const handleOpenEditGroupModal = (group: CategoryGroup) => {
        setEditingGroup(group);
        setIsGroupModalOpen(true);
    };
    
    const handleSaveGroup = (id: string | null, name: string) => {
        if (id) {
            updateCategoryGroup(id, name);
        } else {
            addCategoryGroup({ name });
        }
        setIsGroupModalOpen(false);
        setEditingGroup(null);
    };

    const handleSaveCategory = (newCategoryData: Omit<Category, 'id'>) => {
        addCategory(newCategoryData);
        setAddCategoryModalOpen(false);
    };
    
    const handleCategoryClick = (category: Category) => {
        if (isSelectMode) {
            toggleCategorySelection(category.id);
        } else {
            setSelectedCategory(category);
            setCategoryActionModalOpen(true);
        }
    };

    const toggleCategorySelection = (categoryId: string) => {
        setSelectedCategories(prev => {
            const newSelection = new Set(prev);
            if (newSelection.has(categoryId)) {
                newSelection.delete(categoryId);
            } else {
                newSelection.add(categoryId);
            }
            return newSelection;
        });
    };

    const getCategoryPlural = (count: number) => {
        const lastDigit = count % 10;
        const lastTwoDigits = count % 100;
        if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
            return 'категорий';
        }
        if (lastDigit === 1) {
            return 'категорию';
        }
        if (lastDigit >= 2 && lastDigit <= 4) {
            return 'категории';
        }
        return 'категорий';
    };

    const handleDeleteSelectedCategories = () => {
        if (selectedCategories.size === 0) return;
        const pluralForm = getCategoryPlural(selectedCategories.size);
        if (window.confirm(`Вы уверены, что хотите удалить ${selectedCategories.size} ${pluralForm}? Это действие нельзя отменить.`)) {
            deleteCategories(selectedCategories);
            setSelectedCategories(new Set());
            setIsSelectMode(false);
        }
    };


    const groupedCategories = categoryGroups.map(group => ({
        ...group,
        categories: categories.filter(cat => cat.groupId === group.id)
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
                    <button onClick={handleDeleteSelectedCategories} className="px-2 py-1 text-lg text-red-400 disabled:text-gray-600" disabled={selectedCategories.size === 0}>
                        Удалить
                    </button>
                    <h1 className="text-xl font-bold text-gray-200">{selectedCategories.size > 0 ? `Выбрано: ${selectedCategories.size}` : 'Выбрать категории'}</h1>
                    <button onClick={() => { setIsSelectMode(false); setSelectedCategories(new Set()); }} className="px-2 py-1 text-lg text-blue-400 font-semibold">
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
                                <button onClick={() => handleOpenAddModal()} className="w-full flex items-center text-left px-3 py-2 text-sm text-gray-200 hover:bg-gray-600 rounded-lg">
                                    <Icons.CategoryTagIcon className="w-5 h-5 mr-3" />
                                    Новая категория
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

            {!isSelectMode && <h1 className="text-4xl font-bold px-4 mt-2 mb-6">Категории</h1>}

            <div className={`px-4 space-y-8 ${isSelectMode ? 'pt-4' : ''}`}>
                {groupedCategories.map(group => (
                    <div key={group.id}>
                        <div className="flex justify-between items-center mb-2 px-1">
                            <h2 className="text-xl font-semibold">{group.name}</h2>
                            {!isSelectMode && <button onClick={() => handleOpenEditGroupModal(group)} className="text-sm text-blue-400 hover:text-blue-300">Изменить</button>}
                        </div>
                        <div className="bg-gray-800 rounded-xl">
                            <ul className="divide-y divide-gray-700">
                                {group.categories.map(category => {
                                    const IconComponent = iconMap[category.icon] || Icons.CategoryTagIcon;
                                    const isSelected = selectedCategories.has(category.id);
                                    return (
                                        <li key={category.id} onClick={() => handleCategoryClick(category)} className={`flex items-center p-3 space-x-4 text-left transition-colors duration-150 ${!isSelectMode ? 'hover:bg-gray-700/50' : ''} ${isSelected ? 'bg-blue-500/10' : ''}`}>
                                            {isSelectMode && (
                                                <div className="pr-2">
                                                    <div className={`w-6 h-6 rounded-full border-2 ${isSelected ? 'bg-blue-500 border-blue-500' : 'border-gray-500'} flex items-center justify-center`}>
                                                        {isSelected && <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                                                    </div>
                                                </div>
                                            )}
                                            <div className="w-10 h-10 bg-gray-700 p-2 rounded-full flex items-center justify-center">
                                                <IconComponent className="w-6 h-6" style={{ color: category.color || '#67E8F9' }} />
                                            </div>
                                            <span className="flex-grow text-gray-200">{category.name}</span>
                                            <span className="text-gray-400 mr-2">0</span>
                                            {!isSelectMode && <Icons.ChevronRightIcon className="w-5 h-5 text-gray-600" />}
                                        </li>
                                    );
                                })}
                                {!isSelectMode && (
                                    <li>
                                         <button onClick={() => handleOpenAddModal(group.id)} className="w-full flex items-center p-3 space-x-4 text-green-400 hover:bg-gray-700/50 rounded-b-xl">
                                             <div className="w-10 h-10 flex items-center justify-center ml-2">
                                                <Icons.PlusIcon className="w-6 h-6" />
                                             </div>
                                             <span className="flex-grow text-left">Новая категория</span>
                                         </button>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
            
            <AddCategoryModal 
                isOpen={isAddCategoryModalOpen}
                onClose={() => setAddCategoryModalOpen(false)}
                onSave={handleSaveCategory}
                initialGroupId={initialGroupIdForModal}
            />

            <EditCategoryGroupModal 
                isOpen={isGroupModalOpen}
                onClose={() => setIsGroupModalOpen(false)}
                onSave={handleSaveGroup}
                group={editingGroup}
            />

            {isCategoryActionModalOpen && selectedCategory && (
                <div 
                    className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
                    onClick={() => setCategoryActionModalOpen(false)}
                >
                    <div 
                        className="w-full max-w-sm bg-gray-800 rounded-2xl shadow-lg p-3 space-y-2"
                        onClick={e => e.stopPropagation()}
                    >
                        <button className="w-full py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors">
                            Изменить категорию
                        </button>
                        <button className="w-full py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors">
                            Показать операции
                        </button>
                         <button onClick={() => setCategoryActionModalOpen(false)} className="w-full py-3 mt-4 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors">
                            Отмена
                        </button>
                    </div>
                </div>
            )}

            {isSelectMode && selectedCategories.size > 0 && (
                <div className="fixed bottom-0 left-0 right-0 bg-gray-800/80 backdrop-blur-sm border-t border-gray-700 p-4 flex justify-center z-20">
                    <button className="text-blue-400 text-lg font-semibold">Переместить</button>
                </div>
            )}
        </div>
    );
};

export default CategoriesPage;