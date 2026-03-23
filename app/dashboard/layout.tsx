import { AppSidebar } from "@/components/custom/app_side_bar";
import InputArea from "@/components/custom/input_area";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React, { ReactNode } from "react";
const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full h-screen flex ">
      {/* <div className="w-0  sm:w-[200px] h-screen bg-yellow-500"> */}
      <div className="">
        <SidebarProvider>
          <AppSidebar />
          <main>
            <SidebarTrigger />
          </main>
        </SidebarProvider>
      </div>
      <div className="relative w-full flex flex-col">
        <div className="p-5 bg-blue-500">TOP</div>
        <div className="flex w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
