import React from 'react';

interface DeleteConfirmationModalProps {
  open: boolean;
  onDelete: () => void;
  onCancel: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ open, onDelete, onCancel }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
        <p className="mb-4 text-lg">Are you sure you want to delete this API key?</p>
        <div className="flex gap-4">
          <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={onDelete}>Delete</button>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;