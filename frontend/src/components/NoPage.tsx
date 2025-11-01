import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function NoPage() {
  const navigate = useNavigate()
  const [fadeIn, setFadeIn] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] text-white text-center transition-all duration-700 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <h1 className="text-[120px] font-bold text-[#B07C49] drop-shadow-lg mb-2 select-none">
        404
      </h1>

      <p className="text-2xl mb-6 opacity-90 font-light">
        Oops... looks like you're lost.
      </p>

      <p className="text-sm text-gray-400 mb-8">
        The page you’re looking for doesn’t exist or was moved.
      </p>

      <button
        onClick={() => navigate("/")}
        className="px-8 py-3 bg-[#B07C49] hover:bg-[#D4A16A] transition-all duration-300 rounded-xl text-white font-semibold shadow-lg hover:scale-105"
      >
        Go Back Home
      </button>

      <style>
        {`
          @keyframes pulseGlow {
            0%, 100% { text-shadow: 0 0 10px #b07c49, 0 0 20px #b07c49; }
            50% { text-shadow: 0 0 25px #d4a16a, 0 0 50px #d4a16a; }
          }
          h1 {
            animation: pulseGlow 3s infinite ease-in-out;
          }
        `}
      </style>
    </div>
  )
}