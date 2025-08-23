import React from "react";

export default function ConfirmModal({ message="You Want to delete ?"}) 
{

  const onCancel=()=>
  {
    return false;
  }

  const onConfirm=()=>
  {
    return true;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-sm text-white">
        <p className="text-lg mb-6">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
