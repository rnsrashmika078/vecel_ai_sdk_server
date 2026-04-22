"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { GalleryItem } from "@/app/types/type";
import { useDashboardContext } from "@/app/api/context/dashboard_context";
import { AnimatePresence, motion } from "framer-motion";
import Spinner from "./spinner";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Theme from "./theme";
const Settings = () => {
  const { settingOpen, setSettingOpen } = useDashboardContext();
  const clickRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickFocus = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (clickRef.current?.contains(target)) return;
      if (target.closest("[data-radix-popper-content-wrapper]")) return;

      setSettingOpen(false);
      window.history.pushState(null, document.title, window.location.pathname);
    };
    document.addEventListener("pointerdown", handleClickFocus);

    return () => document.removeEventListener("pointerdown", handleClickFocus);
  }, [setSettingOpen]);


  return (
    <AnimatePresence>
      {settingOpen && (
        <motion.div
          ref={clickRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 100 }}
          exit={{ opacity: 0 }}
          className="border pointer-events-auto shadow-md bg-textarea z-[50] p-2 h-100 rounded-xl absolute w-120  m-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="sticky top-0 rounded-xl">
            <Tabs defaultValue="genaral" className="w-full">
              <TabsList>
                <TabsTrigger value="genaral">General</TabsTrigger>
                <TabsTrigger value="agent_settings">Agent Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="genaral">
                <h1 className="text-xl p-2 border-b-2 mb-2">General</h1>
                <div className="flex items-center justify-between px-2"></div>
                <Theme />
              </TabsContent>
              <TabsContent value="agent_settings">
                Agent settings goes here
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Settings;

