import { useState, useEffect } from "react";

export function useLocalUsername() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("username");
    if (stored) setUsername(stored);
  }, []);

  const saveUsername = (name: string) => {
    localStorage.setItem("username", name);
    setUsername(name);
  };

  return { username, saveUsername };
}
