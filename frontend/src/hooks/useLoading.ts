import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function useLoading(delay = 2000) {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), delay);

    const storedValue = localStorage.getItem("isOkey");

    if (storedValue === null && location.pathname === "/") {
      navigate("/start", { replace: true });
    }

    return () => clearTimeout(timer);
  }, [delay, location, navigate]);

  return loading;
}
