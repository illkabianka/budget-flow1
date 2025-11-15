import React from 'react';
import InputArea from './InputArea';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black/70 z-40 flex flex-col justify-end"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="w-full"
        onClick={e => e.stopPropagation()} // Prevent closing modal when clicking on the content
      >
        <InputArea onTransactionAdded={onClose} />
      </div>
    </div>
  );
};

export default AddTransactionModal;