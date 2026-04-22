"use client";
import { GalleryItem } from "@/app/types/type";
import { createContext, useContext, useState } from "react";
import { multipleOf } from "zod";

export type DashboardContextType = {
  galleryOpen: boolean;
  setGalleryOpen: React.Dispatch<React.SetStateAction<boolean>>;
  settingOpen: boolean;
  setSettingOpen: React.Dispatch<React.SetStateAction<boolean>>;

  selectedResource: GalleryItem | null;
  setSelectedResource: React.Dispatch<React.SetStateAction<GalleryItem | null>>;
};
const DashboardContext = createContext<DashboardContextType | null>(null);

export const DashboardWrapperContext = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<GalleryItem | null>(
    null,
  );

  return (
    <DashboardContext.Provider
      value={{
        galleryOpen,
        setGalleryOpen,
        selectedResource,
        setSelectedResource,
        settingOpen,
        setSettingOpen,
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
