import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Start() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showInput, setShowInput] = useState(false);
  const [username, setUsername] = useState("");
  const [typedText, setTypedText] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener("ended", () => {
        setShowInput(true);
      });
    }
    return () => {
      if (video) {
        video.removeEventListener("ended", () => setShowInput(true));
      }
    };
  }, []);

  useEffect(() => {
    if (showInput) {
      const text = "USERNAME";
      let i = 0;
      const interval = setInterval(() => {
        setTypedText(text.slice(0, i + 1));
        i++;
        if (i === text.length) clearInterval(interval);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [showInput]);

  const handleSubmit = () => {
    if (!username.trim()) return alert("Lütfen kullanıcı adını gir ✍️");
    localStorage.setItem("username", username.trim());
    localStorage.setItem("isOkey", "true");
    navigate("/")
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* https://raw.githubusercontent.com/TPashaxrd/react-best-ui-notepad/main/frontend/public/Notepad.mp4 */}
      <video
        ref={videoRef}
        src="https://raw.githubusercontent.com/TPashaxrd/react-best-ui-notepad/main/frontend/public/Notepad.mp4"
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/40" />

      {showInput && (
        <div className="absolute bottom-16 right-16 text-white animate-fadeIn flex flex-col gap-3 items-start bg-black/60 backdrop-blur-md rounded-2xl p-6 shadow-[0_0_30px_rgba(176,124,73,0.3)] border border-[#b07c49]/30">
          <h2 className="text-xl font-mono tracking-widest text-[#D4A16A]">
            {typedText}
            <span className="blinking-cursor">|</span>
          </h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Type your name..."
            className="w-64 px-4 py-2 mt-1 rounded-md bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B07C49] transition-all duration-300"
          />
          <button
            onClick={handleSubmit}
            className="mt-3 w-full py-2 rounded-md bg-[#B07C49] hover:bg-[#D4A16A] font-semibold tracking-wide shadow-lg transition-all duration-300"
          >
            Continue →
          </button>
        </div>
      )}

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 1.2s ease-out forwards;
          }

          .blinking-cursor {
            display: inline-block;
            width: 8px;
            margin-left: 2px;
            background-color: #D4A16A;
            animation: blink 1s infinite;
          }

          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }
        `}
      </style>
    </div>
  );
}
