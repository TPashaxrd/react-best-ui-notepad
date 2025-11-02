import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { BiMoon, BiSun, BiCheck, BiX, BiHistory, BiFont, BiTimer, BiTrash, BiEdit, BiChevronDown, BiTrashAlt } from "react-icons/bi"
import type { FontKey } from "./components/fonts";
import { FONTS } from "./components/fonts";
import { useLoading } from "./hooks/useLoading";
import { useSaveShortcut } from "./hooks/useSaveShortcut";
import { useLocalUsername } from "./hooks/useLocalUsername";
import { CiSettings } from "react-icons/ci";
import Settings from "./components/Settings";

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  const [stories, setStories] = useState<string[]>([])
  const [input, setInput] = useState("")
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null)
  const [showHistory, setShowHistory] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editValue, setEditValue] = useState("")
  const [font, setFont] = useState<FontKey>("font-space-grotesk")
  const [showFontMenu, setShowFontMenu] = useState(false)
  const loading = useLoading(2000);
  const [showSettings, setShowSettings] = useState(false)
  const { username } = useLocalUsername();

  useEffect(() => {
    const storedFont = localStorage.getItem("font") as FontKey
    if (storedFont && FONTS.some(f => f.class === storedFont)) {
      setFont(storedFont)
    }
  }, [])
  
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme")
    if (storedTheme === "dark" || storedTheme === "light") {
      setTheme(storedTheme)
      document.documentElement.classList.toggle("dark", storedTheme === "dark")
    }

    const stored = localStorage.getItem("stories")
    if (stored) setStories(JSON.parse(stored))
  }, [])

  useEffect(() => {
    const autoSaveEnabled = localStorage.getItem("autoSave") === "true";
    if (!autoSaveEnabled) return; 

    if (input.trim() === "") return;

    const delay = setTimeout(() => {
      let updated = [...stories];

      if (activeStoryIndex !== null) {
        updated[activeStoryIndex] = input.trim();
      } else {
        updated.push(input.trim());
        setActiveStoryIndex(updated.length - 1);
      }

      setStories(updated);
      localStorage.setItem("stories", JSON.stringify(updated));

      // toast("Auto-saved!", {
      //   icon: <BiSave />,
      //   style: { background: "#654321", color: "white" },
      // });
    }, 800);

    return () => clearTimeout(delay);
  }, [input, activeStoryIndex, stories]);


  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  const selectStory = (story: string, index: number) => {
    setInput(story)
    setActiveStoryIndex(index)
    setShowHistory(false)
  }

  const startEdit = (index: number, story: string) => {
    setEditingIndex(index)
    setEditValue(story)
  }

  const saveEdit = () => {
    if (editingIndex === null || !editValue.trim()) return
    const updated = [...stories]
    updated[editingIndex] = editValue.trim()
    setStories(updated)
    localStorage.setItem("stories", JSON.stringify(updated))
    setEditingIndex(null)
    setEditValue("")
    if (activeStoryIndex === editingIndex) setInput(editValue.trim())
  }

  const cancelEdit = () => {
    setEditingIndex(null)
    setEditValue("")
  }

  const deleteStory = (index: number) => {
    const updated = stories.filter((_, i) => i !== index)
    setStories(updated)
    localStorage.setItem("stories", JSON.stringify(updated))
    if (activeStoryIndex === index) {
      setInput("")
      setActiveStoryIndex(null)
    } else if (activeStoryIndex !== null && activeStoryIndex > index) {
      setActiveStoryIndex(activeStoryIndex - 1)
    }
  }

  useSaveShortcut({
    input,
    stories,
    activeStoryIndex,
    setStories,
    setActiveStoryIndex
  });

  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0

  const currentFontName = FONTS.find(f => f.class === font)?.name || "Font"
  if(loading) return <div className="min-h-screen items-center bg-[#1a1a1a] justify-center flex"><span className="loader"></span></div>
  
  return (
    <div className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-[#1a1a1a] text-gray-100" : "bg-white text-gray-900"}`}>
      
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-sm text-gray-500 dark:text-gray-400 font-medium">
        {wordCount} word{wordCount !== 1 ? "s" : ""}
      </div>
      {showSettings && (
        <div className="fixed bottom-20 right-10 z-[9999]">
          <Settings />
        </div>

        )}
      <div onClick={() => {
          const newStory = ""
          setInput(newStory)
          setActiveStoryIndex(null)
          setShowHistory(false)
          const updated = [...stories, newStory]
          setStories(updated)
          localStorage.setItem("stories", JSON.stringify(updated))
        }}
        className="absolute top-6 left-6 text-[#B07C49] hover:text-[#D4A16A] font-semibold cursor-pointer transition">+ Create new</div>
      <div className="flex-1 flex items-center -mt-44 justify-center p-8">
        <textarea
          placeholder={`${username}, Start writing your story...`}
          value={input}
          autoFocus
          onChange={(e) => setInput(e.target.value)}
          className={`
            w-full max-w-4xl min-h-[700px] h-full min-h-96 p-22 text-lg leading-relaxed
            bg-transparent resize-none outline-none
            placeholder-gray-500 dark:placeholder-gray-600
            tracking-wide ${font}
          `}
          style={{ caretColor: "#B07C49" }}
        />
      </div>

      <div className="fixed bottom-6 select-none left-1/2 transform -translate-x-1/2">
        <div className="flex items-center gap-4 px-6 py-3 bg-[#2a2a2a]/80 backdrop-blur-xl rounded-xl shadow-2xl border border-[#3a3a3a]">
          <button className="text-sm text-gray-400 hover:text-[#B07C49] transition">18px</button>
          <span className="text-gray-600">•</span>

          <div className="relative">
            <button
              onClick={() => setShowFontMenu(prev => !prev)}
              className="text-sm text-gray-400 hover:text-[#B07C49] transition flex items-center gap-1"
            >
              <BiFont size={14} /> {currentFontName} <BiChevronDown size={12} className={`ml-1 transition-transform ${showFontMenu ? "rotate-180" : ""}`} />
            </button>

            {showFontMenu && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-[#262626] border border-[#3a3a3a] rounded-xl shadow-2xl overflow-hidden z-50">
                {FONTS.map((f) => (
                  <button
                    key={f.class}
                    onClick={() => {
                      setFont(f.class)
                      localStorage.setItem("font", f.class)
                      setShowFontMenu(false)
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-[#3a3a3a] transition flex items-center justify-between ${font === f.class ? "text-[#B07C49]" : "text-gray-300"} ${f.class}`}
                  >
                    {f.name}
                    {font === f.class && <BiCheck size={14} />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <span className="text-gray-600">•</span>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="text-sm text-gray-400 hover:text-[#B07C49] transition flex items-center gap-1"
          >
            <CiSettings size={14} /> Settings
          </button>
          <span className="text-gray-600">•</span>
          <button className="text-sm text-gray-400 hover:text-[#B07C49] transition flex items-center gap-1">
            <BiTimer size={14} /> 15m
          </button>
          <span className="text-gray-600">•</span>
          <button
            onClick={() => setShowHistory(prev => !prev)}
            className="text-sm text-gray-400 hover:text-[#B07C49] transition flex items-center gap-1"
          >
            <BiHistory size={14} /> History
          </button>
          <span className="text-gray-600">•</span>
          <button
            onClick={toggleTheme}
            className="text-sm text-gray-400 hover:text-[#B07C49] transition flex items-center gap-1"
          >
            {theme === "light" ? <BiMoon size={14} /> : <BiSun size={14} />} Dark
          </button>
          <span className="text-gray-600">•</span>
          <button className="text-sm text-[#B07C49] font-medium hover:text-[#D4A16A] transition flex items-center gap-1">
            Save
          </button>
        </div>
      </div>

      <div
        className={`
          fixed top-0 right-0 h-full w-80
          bg-[#121212] backdrop-blur-2xl
          border-l border-[#3a3a3a] p-6 overflow-y-auto
          transform transition-transform duration-300 ease-out z-50
          ${showHistory ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-200">Saved</h2>
          <button title="Show History" onClick={() => setShowHistory(false)} className="p-1.5 rounded hover:bg-[#2a2a2a] transition">
            <BiX size={22} />
          </button>
        </div>

        {stories.length === 0 ? (
          <p className="text-center text-gray-500 italic mt-12">No stories yet.</p>
        ) : (
          <ul className="space-y-3">
            {stories.map((story, i) => (
              <li
                key={i}
                className={`group rounded-xl p-4 border transition-all
                  ${activeStoryIndex === i 
                    ? "bg-[#2b1a2b]/30 border-[#B07C49]" 
                    : "bg-[#1f1f1f]/50 border-[#3a3a3a] hover:border-[#555555]"
                  }`}
              >
                {editingIndex === i ? (
                  <div className="space-y-3">
                    <textarea
                      value={editValue} title="Edit"
                      onChange={(e) => setEditValue(e.target.value)}
                      className={`w-full p-3 rounded-lg bg-[#262626] text-sm resize-none focus:ring-1 focus:ring-[#B07C49] outline-none text-gray-200 ${font}`}
                      rows={3}
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <button onClick={saveEdit} className="flex-1 py-2 bg-[#388038] text-white text-xs font-medium rounded-lg hover:bg-[#4a9e4a] transition flex items-center justify-center gap-1">
                        <BiCheck size={14} /> Save
                      </button>
                      <button onClick={cancelEdit} className="flex-1 py-2 bg-[#3a3a3a] text-white text-xs font-medium rounded-lg hover:bg-[#555555] transition flex items-center justify-center gap-1">
                        <BiX size={14} /> Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p
                      onClick={() => selectStory(story, i)}
                      className="cursor-pointer text-gray-200 font-medium hover:text-[#B07C49] transition line-clamp-2 text-sm"
                    >
                      {story.length > 100 ? story.slice(0, 100) + "..." : story}
                    </p>
                    <div className="flex justify-end gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => startEdit(i, story)} className="p-1.5 rounded bg-[#B07C49] hover:bg-[#D4A16A] transition" title="Edit">
                        <BiEdit size={15} />
                      </button>
                      <button onClick={() => deleteStory(i)} className="p-1.5 rounded bg-[#9e2b2b] hover:bg-[#c33b3b] transition" title="Delete">
                        <BiTrash size={15} />
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
          
        )}
         {stories.length > 0 && (
        <div className="bg-[#1a1a1a] px-3 py-3 flex-none mt-4">
          <span className="block w-full h-0.5 bg-[#B07C49]/40 my-2"></span>
          <button
            onClick={() => {
              setStories([])
              localStorage.removeItem("stories")
              setActiveStoryIndex(null)
              toast('All stories cleared!', { style: { background: "#654321", color: "white" }, icon: <BiTrash /> })
            }}
            className="w-full flex text-center items-center justify-center gap-2 py-2 text-gray-500 bg-[#2a2a2a] text-white duration-300 rounded hover:bg-[#1a1a1a] transition"
          >
            <BiTrashAlt /> Clear All
          </button>
        </div>
      )}
      </div>
      <Toaster position="top-right" toastOptions={{ style: { zIndex: 99999 }, success: { duration: 2000 } }} />
    </div>
  )
}