/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useDashboardContext } from "@/app/api/context/dashboard_context";
import { deleteChat, getChats } from "@/app/utils/supabase/server_actions";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { Edit, Plus, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { memo, useEffect, useState } from "react";

export const AppSidebar = memo(() => {
  console.log("AppSidebar Component Rendered! ");
  const router = useRouter();
  const { setSettingOpen, chats, setChats, activeChat, setActiveChat } =
    useDashboardContext();
  const { toggleSidebar } = useSidebar();
  const [visibility, setVisibility] = useState<string | null>(null);
  const createNewChat = () => {
    router.push(`/chat/`);
  };

  useEffect(() => {
    const receiveChats = async () => {
      const allchats = await getChats({ table: "chats" });
      setChats(allchats);
    };

    receiveChats();
  }, []);

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>

          <SidebarGroupAction>
            <Plus />
            <span className="sr-only">Add Project</span>
          </SidebarGroupAction>

          <SidebarGroupContent className="flex flex-col gap-1">
            <button
              className="flex items-center gap-2 p-2 rounded-md hover:bg-accent"
              onClick={() => createNewChat()}
            >
              <Edit size={16} />
              <span>New chat</span>
            </button>

            <button
              className="flex items-center gap-2 p-2 rounded-md hover:bg-accent"
              onClick={() => {
                if (typeof window === "undefined") return;
                setSettingOpen((pre) => !pre);
                window.location.hash = "settings";
                toggleSidebar();
              }}
            >
              <Settings size={16} />
              <span>Settings</span>
            </button>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Recent</SidebarGroupLabel>
          <SidebarGroupContent className="flex flex-col gap-1 custom-scrollbar h-100">
            {chats.map((c) => (
              <div
                key={c.chat_id}
                onClick={() => {
                  router.push(`/chat/${c.chat_id}`);
                  setActiveChat(c.chat_id);
                }}
                onMouseEnter={() => setVisibility(c.chat_id)}
                onMouseLeave={() => setVisibility(null)}
                className={`p-2 flex justify-between items-center rounded-md hover:text-muted-foreground text-sm ${c.chat_id === activeChat ? "bg-accent" : "bg-transparent"}`}
              >
                {c.title}
                <MdOutlineDeleteOutline
                  size={18}
                  onClick={async (e) => {
                    e.stopPropagation();
                    const delId = c.chat_id;
                    await deleteChat({ chat_id: delId, table: "chats" });
                    setChats((prev) => prev.filter((c) => c.chat_id != delId));
                    if (activeChat === delId) {
                      router.push("/chat/");
                    }
                  }}
                  className={`${visibility === c.chat_id ? "block" : "hidden"}`}
                />
              </div>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
});

AppSidebar.displayName = "AppSidebar";
