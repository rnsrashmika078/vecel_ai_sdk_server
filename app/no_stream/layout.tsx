import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return <div className="p-5 w-full h-screen flex">{children}</div>;
};

export default layout;
