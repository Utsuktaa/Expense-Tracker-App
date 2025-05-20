import React from "react";

export default function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-lg shadow-xl p-6 w-80"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-gray-800 mb-4">{message}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-1 bg-gray-300 hover:bg-gray-400 text-black rounded"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
