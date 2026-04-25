"use client";
import { useDashboardContext } from "@/app/api/context/dashboard_context";
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
import { memo, useEffect } from "react";
import { getChats } from "@/app/utils/supabase/action_client";
export const AppSidebar = memo(() => {
  const router = useRouter();
  const { setSettingOpen, chats, setChats } = useDashboardContext();
  const { toggleSidebar } = useSidebar();
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
    <>
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
              {/* <button className="flex items-center gap-2 p-2 rounded-md hover:bg-accent">
                <Home size={16} />
                <span>Dashboard</span>
              </button>

              <button className="flex items-center gap-2 p-2 rounded-md hover:bg-accent">
                <MessageSquare size={16} />
                <span>Chats</span>
              </button>

              <button className="flex items-center gap-2 p-2 rounded-md hover:bg-accent">
                <Folder size={16} />
                <span>Projects</span>
              </button> */}

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
            <SidebarGroupContent className="flex flex-col gap-1">
              {/* <button className="p-2 rounded-md hover:bg-accent text-sm text-muted-foreground">
                AI Chat App
              </button>

              <button className="p-2 rounded-md hover:bg-accent text-sm text-muted-foreground">
                Dashboard UI
              </button> */}
              {chats.map((c) => (
                <span
                  key={c.chat_id}
                  onClick={() => {
                    router.push(`/chat/${c.chat_id}`);
                  }}
                  className="p-2 rounded-md hover:bg-accent text-sm text-muted-foreground"
                >
                  {c.title}
                </span>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter />
      </Sidebar>
    </>
  );
});

AppSidebar.displayName = "AppSidebar";
