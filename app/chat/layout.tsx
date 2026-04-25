import React, { ReactNode } from "react";
import { DashboardWrapperContext } from "../api/context/dashboard_context";
import DashboardClient from "./DashboardClient";
const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <DashboardWrapperContext>
      <DashboardClient>{children}</DashboardClient>;
    </DashboardWrapperContext>
  );
};

export default DashboardLayout;
