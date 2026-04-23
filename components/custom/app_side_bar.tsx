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
import {
  Edit,
  Folder,
  Home,
  MessageSquare,
  Plus,
  Settings,
} from "lucide-react";
import { generateId } from "ai";
import { useRouter } from "next/navigation";
export function AppSidebar() {
  const router = useRouter();
  const { setSettingOpen, setChats, chats } = useDashboardContext();
  const { toggleSidebar } = useSidebar();
  const createNewChat = () => {
    const id = generateId();
    setChats((prev) => [...prev, id]);
    router.push(`/chat/${id}`);
  };

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
                <p
                  key={c}
                  className="px-4 rounded-md hover:bg-accent text-sm text-muted-foreground"
                >
                  {c}
                </p>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter />
      </Sidebar>
    </>
  );
}
