"use client";
import { ReactNode } from "react";
import { useDashboardContext } from "../api/context/dashboard_context";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/custom/app_side_bar";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
const Settings = dynamic(() => import("@/components/custom/settings/settings"));
const Gallery = dynamic(() => import("@/components/custom/gallery"));

const DashboardClient = ({ children }: { children: ReactNode }) => {
  const { settingOpen, galleryOpen } = useDashboardContext();
  return (
    <div className="w-full h-screen flex ">
      <AnimatePresence>{settingOpen && <Settings />}</AnimatePresence>
      <AnimatePresence> {galleryOpen && <Gallery />}</AnimatePresence>
      <div className="">
        <SidebarProvider>
          <AppSidebar />
          <main>
            <SidebarTrigger />
          </main>
        </SidebarProvider>
      </div>
      <div className="relative w-full flex flex-col  overflow-x-hidden ">
        <div className="p-0 sticky top-0">TOP</div>
        <div className="flex w-full h-full custom-scrollbar">{children}</div>
      </div>
    </div>
  );
};

export default DashboardClient;
