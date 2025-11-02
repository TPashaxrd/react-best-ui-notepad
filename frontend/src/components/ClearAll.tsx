import { useState } from "react";
import { BiTrash } from "react-icons/bi";

export default function ClearAllButton({ onConfirm }: { onConfirm: () => void }) {
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="flex flex-col items-center">
      {!confirming ? (
        <button
          onClick={() => setConfirming(true)}
          className="flex items-center justify-center gap-2 px-3 py-2 text-sm rounded bg-gradient-to-r from-[#B07C49] to-[#D4A16A] text-white hover:opacity-90 transition-all duration-300 shadow-lg"
        >
          <BiTrash /> Clear all
        </button>
      ) : (
        <div className="flex flex-col items-center gap-2 bg-[#1f1f1f] border border-[#3a3a3a] rounded p-3 shadow-lg transition-all duration-300">
          <span className="text-sm text-gray-300">Are you sure?</span>
          <div className="flex gap-2">
            <button
              onClick={() => {
                onConfirm();
                setConfirming(false);
              }}
              className="px-3 py-1 text-sm rounded bg-red-600 text-white hover:bg-red-700 transition"
            >
              Yes, clear
            </button>
            <button
              onClick={() => setConfirming(false)}
              className="px-3 py-1 text-sm rounded-lg bg-[#333] text-gray-300 hover:bg-[#444] transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
