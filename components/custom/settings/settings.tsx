"use client";
import React, { useEffect, useRef, useState } from "react";
import { useDashboardContext } from "@/app/api/context/dashboard_context";
import { AnimatePresence, motion } from "framer-motion";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import Theme from "../theme";
import { Button } from "@/components/ui/button";
import { ReasoningEffort } from "@/app/types/type";
const Settings = () => {
  const { settingOpen, setSettingOpen, setReasoningEffort, reasoningEffort } =
    useDashboardContext();
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
                <h1 className="text-xl p-2 border-b-2 mb-2">Agent Settings</h1>
                <div className="flex items-center justify-between px-2"></div>
                <DropdownMenu>
                  <div className="flex items-center justify-between px-2">
                    <span>Reasoning Effort</span>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        {reasoningEffort.effort.toUpperCase()}
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                      <DropdownMenuGroup>
                        <DropdownMenuLabel>Reasoning effort</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => setReasoningEffort({ effort: "none" })}
                        >
                          None
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setReasoningEffort({ effort: "low" })}
                        >
                          Low
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            setReasoningEffort({ effort: "medium" })
                          }
                        >
                          Medium
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setReasoningEffort({ effort: "high" })}
                        >
                          High
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </div>
                </DropdownMenu>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Settings;
