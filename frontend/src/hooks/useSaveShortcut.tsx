import { useEffect } from "react";
import toast from "react-hot-toast";
import { BiSave } from "react-icons/bi";

interface UseSaveShortcutProps {
  input: string;
  stories: string[];
  activeStoryIndex: number | null;
  setStories: (stories: string[]) => void;
  setActiveStoryIndex: (index: number | null) => void;
}

export function useSaveShortcut({
  input,
  stories,
  activeStoryIndex,
  setStories,
  setActiveStoryIndex
}: UseSaveShortcutProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        if (!input.trim()) return;

        let updated: string[] = [];
        if (activeStoryIndex !== null) {
          updated = [...stories];
          updated[activeStoryIndex] = input.trim();
        } else {
          updated = [...stories, input.trim()];
        }

        setStories(updated);
        localStorage.setItem("stories", JSON.stringify(updated));

        if (activeStoryIndex === null) setActiveStoryIndex(updated.length - 1);

        toast("Has been saved!", {
          icon: <BiSave />,
          iconTheme: { primary: "#fff", secondary: "#B07C49" },
          style: { background: "#654321", color: "white" },
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [input, stories, activeStoryIndex, setStories, setActiveStoryIndex]);
}