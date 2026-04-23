import { AppSidebar } from "@/components/custom/app_side_bar";
import Gallery from "@/components/custom/gallery";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React, { ReactNode } from "react";
import { DashboardWrapperContext } from "../api/context/dashboard_context";
import Settings from "@/components/custom/settings/settings";
const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full h-screen flex ">
      <DashboardWrapperContext>
        <Gallery />
        <Settings />
        <div className="">
          <SidebarProvider>
            <AppSidebar />
            <main>
              <SidebarTrigger />
            </main>
          </SidebarProvider>
        </div>
        <div className="relative w-full flex flex-col  overflow-x-hidden">
          <div className="p-0 sticky top-0">TOP</div>
          <div className="flex w-full h-full ">{children}</div>
        </div>
      </DashboardWrapperContext>
    </div>
  );
};

export default DashboardLayout;
