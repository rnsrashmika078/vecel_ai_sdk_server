"use client";
import React, { useEffect, useState } from "react";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";

const Theame = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [dark]);
  return (
    <button
      className="z-[99999] pointer-events-auto absolute bottom-2 left-2 hover:bg-textarea hover:border transition-all hover:border-dark rounded-2xl p-2"
      onClick={() => setDark(!dark)}
    >
      {dark ? <MdDarkMode size={20} /> : <MdLightMode size={20} />}
    </button>
  );
};

export default Theame;
