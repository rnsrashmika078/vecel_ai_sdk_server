"use client";
import { TChatsList, TGalleryItem, TReasoningEffort } from "@/app/types/type";
import { createContext, useContext, useMemo, useState } from "react";

export type DashboardContextType = {
  galleryOpen: boolean;
  setGalleryOpen: React.Dispatch<React.SetStateAction<boolean>>;
  settingOpen: boolean;
  setSettingOpen: React.Dispatch<React.SetStateAction<boolean>>;

  selectedResource: TGalleryItem | null;
  setSelectedResource: React.Dispatch<
    React.SetStateAction<TGalleryItem | null>
  >;

  chats: TChatsList[];
  setChats: React.Dispatch<React.SetStateAction<TChatsList[]>>;

  activeChat: string;
  setActiveChat: React.Dispatch<React.SetStateAction<string>>;

  TReasoningEffort: TReasoningEffort; // naming must change
  setTReasoningEffort: React.Dispatch<React.SetStateAction<TReasoningEffort>>; // naming must change
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
  const [TReasoningEffort, setTReasoningEffort] = useState<TReasoningEffort>({
    effort: "medium",
    contextWindow: 1000,
    model: "openai/gpt-oss-20b",
  });
  //naming must change
  const [selectedResource, setSelectedResource] = useState<TGalleryItem | null>(
    null,
  );
  const [chats, setChats] = useState<TChatsList[]>([]);
  const value = useMemo(
    () => ({
      galleryOpen,
      setGalleryOpen,
      selectedResource,
      setSelectedResource,
      settingOpen,
      setSettingOpen,
      chats,
      setChats,
      TReasoningEffort, // naming must change
      setTReasoningEffort, // naming must change
      activeChat,
      setActiveChat,
    }),
    [
      galleryOpen,
      selectedResource,
      settingOpen,
      chats,
      TReasoningEffort, // naming must change
      activeChat,
    ],
  );
  return (
    <DashboardContext.Provider value={value}>
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
