"use client";
import { ChatsListType, GalleryItem, ReasoningEffort } from "@/app/types/type";
import { createContext, useContext, useState } from "react";

export type DashboardContextType = {
  galleryOpen: boolean;
  setGalleryOpen: React.Dispatch<React.SetStateAction<boolean>>;
  settingOpen: boolean;
  setSettingOpen: React.Dispatch<React.SetStateAction<boolean>>;

  selectedResource: GalleryItem | null;
  setSelectedResource: React.Dispatch<React.SetStateAction<GalleryItem | null>>;

  chats: ChatsListType[];
  setChats: React.Dispatch<React.SetStateAction<ChatsListType[]>>;

  activeChat: string;
  setActiveChat: React.Dispatch<React.SetStateAction<string>>;

  reasoningEffort: ReasoningEffort;
  setReasoningEffort: React.Dispatch<React.SetStateAction<ReasoningEffort>>;
};
const DashboardContext = createContext<DashboardContextType | null>(null);

export const DashboardWrapperContext = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);
  const [activeChat, setActiveChat] = useState("");
  const [reasoningEffort, setReasoningEffort] = useState<ReasoningEffort>({
    effort: "medium",
  });
  const [selectedResource, setSelectedResource] = useState<GalleryItem | null>(
    null,
  );
  const [chats, setChats] = useState<ChatsListType[]>([]);

  return (
    <DashboardContext.Provider
      value={{
        galleryOpen,
        setGalleryOpen,
        selectedResource,
        setSelectedResource,
        settingOpen,
        setSettingOpen,

        chats,
        setChats,

        reasoningEffort,
        setReasoningEffort,

        activeChat,
        setActiveChat,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error("useDashboard must be used inside DashboardWrapperContext");
  }

  return context;
};
