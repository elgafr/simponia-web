import React from "react";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 bg-opacity-50 z-50">
      <div className="bg-gray-900 text-white p-6 rounded-3xl shadow-lg w-120">
        <p className="text-xl text-center">Are you sure you want to delete this Event?</p>
        <div className="flex justify-end mt-6 space-x-3">
          <button onClick={onClose} className="px-4 py-2 border rounded-2xl text-blue-400 hover:bg-blue-700 hover:text-white">
            Batal
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-blue-600 text-white rounded-2xl hover:bg-red-500">
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
