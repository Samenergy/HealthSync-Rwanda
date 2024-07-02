import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 overflow-auto">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-lg md:max-w-2xl relative mx-4 sm:mx-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="overflow-auto max-h-[calc(100vh-3rem)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
