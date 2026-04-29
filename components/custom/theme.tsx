"use client";
import React, { memo, useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TSettings } from "@/app/types/type";

const Theme = memo(() => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const asyncFn = () => {
      const savedTheme = localStorage.getItem("theme");
      setDark(savedTheme === "dark");
    };
    asyncFn();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <DropdownMenu>
      <div className="flex items-center justify-between px-2">
        <span>Appearance</span>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{dark ? "Dark" : "Light"}</Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Theme Selection</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setDark(true)}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDark(false)}>
              Light
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </div>
    </DropdownMenu>
  );
});
Theme.displayName = "Theme";

export default Theme;
