import axios from "axios";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ConfirmModal({ message="You Want to delete ?"}) 
{

  const onConfirm=()=>
  {
    // toast.success("click");

    axios.get("http://localhost:8083/").en(()=>{ toast.success("Done") }).catch((error)=>{ toast.error("ddonme"); console.log(error)})
    

  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <Toaster/>
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-sm text-white">
        <p className="text-lg mb-6">{message}</p>
        <div className="flex justify-end gap-4">
        
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded active:scale-95"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}




