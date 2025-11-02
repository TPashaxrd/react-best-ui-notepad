import { useEffect, useState } from "react";
import { CiSettings } from "react-icons/ci";

export default function Settings({ onClose }: { onClose?: () => void }) {
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [isAutoSave, setIsAutoSave] = useState<boolean | null>(null);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedAutoSave = localStorage.getItem("autoSave");

    if (storedUsername) setUsername(storedUsername);
    if (storedAutoSave !== null) {
      setIsAutoSave(storedAutoSave === "true");
    } else {
      setIsAutoSave(null);
    }
  }, []);

  useEffect(() => {
    if (isAutoSave !== null) {
      localStorage.setItem("autoSave", String(isAutoSave));
    }
  }, [isAutoSave]);

  const handleSave = () => {
    setLoading(true);
    localStorage.setItem("username", username);
    setTimeout(() => {
      setLoading(false);
    }, 600);
  };

  return (
    <div className="bg-[#262626] border border-[#3a3a3a] rounded-2xl shadow-2xl p-5 w-72 text-gray-200 z-[9999]">
      <h2 className="text-lg font-semibold mb-3 text-[#B07C49] text-center flex items-center justify-center gap-1">
        <CiSettings /> Settings
      </h2>

      <div className="space-y-4 text-sm">
        <div className="flex flex-col gap-1">
          <label className="text-gray-400 text-xs">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-[#1f1f1f] border border-[#3a3a3a] rounded-lg px-2 py-1 text-gray-200 focus:outline-none focus:border-[#B07C49]"
            placeholder="Enter username"
          />
        </div>

        <div className="flex justify-between items-center">
          <span>
            Auto-save{" "}
            {isAutoSave === null && (
              <span className="text-xs text-gray-500">(not set)</span>
            )}
          </span>
          <input
            type="checkbox" title="Checkbox"
            checked={isAutoSave ?? false}
            onChange={(e) => setIsAutoSave(e.target.checked)}
            className="accent-[#B07C49]"
          />
        </div>

        <div className="flex justify-between items-center">
          <span>Dark Mode</span>
          <input
            type="checkbox" title="Chexkbox"
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
            className="accent-[#B07C49]"
          />
        </div>
      </div>

      <div className="mt-5 flex gap-2">
        <button
          onClick={handleSave}
          disabled={loading}
          className="flex-1 bg-[#B07C49] text-white rounded-lg py-1.5 text-sm hover:bg-[#D4A16A] transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>

        <button
          onClick={onClose}
          className="flex-1 bg-[#333] text-gray-300 rounded-lg py-1.5 text-sm hover:bg-[#444] transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
