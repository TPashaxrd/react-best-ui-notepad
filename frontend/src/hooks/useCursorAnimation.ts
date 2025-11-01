import { useEffect, useState } from "react";

export const useCursorAnimation = (isFocused: boolean, input: string) => {
  const [cursorPulse, setCursorPulse] = useState(false);

  useEffect(() => {
    if (!isFocused || !input) return;
    const interval = setInterval(() => {
      setCursorPulse(prev => !prev);
    }, 600);
    return () => clearInterval(interval);
  }, [isFocused, input]);

  return cursorPulse;
};