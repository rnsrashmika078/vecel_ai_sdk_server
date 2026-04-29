"use client";
import React, { memo, useEffect, useRef, useState } from "react";
import { useDashboardContext } from "@/app/api/context/dashboard_context";
import { AnimatePresence, motion } from "framer-motion";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Theme from "../theme";
import AgentSettings from "./agent_settings";
import { TSettings } from "@/app/types/type";

const Settings = memo(() => {
  console.log("render: Settings Component");

  const { setSettingOpen,} =
    useDashboardContext(); // naming must change
  const clickRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleClickFocus = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (clickRef.current?.contains(target)) return;
      if (target.closest("[data-radix-popper-content-wrapper]")) return;

      setSettingOpen(false);
      window.history.pushState(null, document.title, window.location.pathname);
    };
    document.addEventListener("pointerdown", handleClickFocus);

    return () => document.removeEventListener("pointerdown", handleClickFocus);
  }, []);

  // useEffect(() => {
  //   if (typeof window === "undefined" || TReasoningEffort === null) return;
  //   const settings = localStorage.getItem("settings");
  //   let parsed;
  //   if (settings === null) return;
  //   parsed = JSON.parse(settings);

  //   setTReasoningEffort({
  //     effort: parsed.effort,
  //     contextWindow: parsed.contextWindow,
  //   }); // naming must change
  // }, []); // naming must change

  return (
    <motion.div
      ref={clickRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 100 }}
      exit={{ opacity: 0 }}
      className="border pointer-events-auto shadow-md bg-textarea z-[50] p-2 h-100 rounded-xl absolute w-120  m-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <div className="sticky top-0 rounded-xl w-full">
        <Tabs defaultValue="genaral" className="w-full">
          <TabsList>
            <TabsTrigger value="genaral">General</TabsTrigger>
            <TabsTrigger value="agent_settings">Agent Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="genaral">
            <h1 className="text-xl p-2 border-b-2 mb-2">General</h1>
            <Theme />
          </TabsContent>
          <TabsContent value="agent_settings" className="w-full">
            <h1 className="text-xl p-2 border-b-2 mb-2">Agent Settings</h1>
            <AgentSettings />
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
});
Settings.displayName = "Settings";

export default Settings;
