"use client";

import { useDashboardContext } from "@/app/context/dashboard_context";

const TopBar = () => {
  const { activeChat, setChats, chats } = useDashboardContext();

  return (
    <div className="p-2">{}</div>
  );
};

export default TopBar;
