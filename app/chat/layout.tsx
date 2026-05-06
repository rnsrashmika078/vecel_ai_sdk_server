import React, { ReactNode } from "react";
import DashboardClient from "./DashboardClient";
import { Metadata } from "next";
import { DashboardWrapperContext } from "../context/dashboard_context";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <DashboardWrapperContext>
      <DashboardClient>{children}</DashboardClient>;
    </DashboardWrapperContext>
  );
};

export default DashboardLayout;
