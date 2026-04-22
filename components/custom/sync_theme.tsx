"use client";
import { useEffect } from "react";

const SyncTheme = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const theme = localStorage.getItem("theme");
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, []);
  return null;
};

export default SyncTheme;
