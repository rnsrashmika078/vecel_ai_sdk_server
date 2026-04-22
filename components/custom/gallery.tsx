/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { GalleryItem } from "@/app/types/type";
import { useDashboardContext } from "@/app/api/context/dashboard_context";
import { AnimatePresence, motion } from "framer-motion";
import Spinner from "./spinner";
const Gallery = () => {
  const { galleryOpen, setGalleryOpen, selectedResource, setSelectedResource } =
    useDashboardContext();
  useEffect(() => {
    const hashing = () => {
      setGalleryOpen(window.location.hash === "#gallery");
    };
    hashing();
    window.addEventListener("hashchange", hashing);

    return () => window.removeEventListener("hashchange", hashing);
  }, []);
  const [store, setStore] = useState<GalleryItem[]>([]);
  const [selection, setSelection] = useState<string>("Images");
  const [loading, setLoading] = useState<boolean>(false);

  async function getResources() {
    setLoading(true);
    const res = await fetch("/api/gallery", {
      method: "GET",
    });
    const result = await res.json();

    setStore(result.resources);
    console.log("resource", result.resources);
    setLoading(false);
  }

  useEffect(() => {
    if (galleryOpen) {
      const setupGallery = () => {
        getResources();
      };
      setupGallery();
    }
  }, [galleryOpen]);

  const typeMap: Record<string, string[]> = {
    Images: ["png", "jpg"],
    Documents: ["pdf"],
  };

  const clickRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickFocus = (e: MouseEvent) => {
      if (clickRef.current && !clickRef.current.contains(e.target as Node)) {
        setGalleryOpen(false);
        window.history.pushState(null, document.title, window.location.pathname);
      }
    };
    document.addEventListener("mousedown", handleClickFocus);

    return () => document.removeEventListener("mousedown", handleClickFocus);
  }, []);

  useEffect(() => {
    const resetSelection = () => setSelection("Images");
    resetSelection();
  }, []);
  return (
    <AnimatePresence>
      {galleryOpen && (
        <motion.div
          ref={clickRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 100 }}
          exit={{ opacity: 0 }}
          className="border pointer-events-auto shadow-md bg-textarea z-[50] p-2 h-100 rounded-xl absolute w-100  m-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <ComboboxBasic setSelection={setSelection} />
          <div
            className={` grid custom-scrollbar h-[350px]  ${store.length > 0 ? "grid-cols-4" : " grid-cols-1"} gap-2`}
          >
            {store.length > 0 ? (
              store
                .filter((res) => typeMap[selection].includes(res.format))
                .map((item) => (
                  <div
                    key={item.asset_id}
                    onClick={() => setSelectedResource(item)}
                  >
                    {item.format.includes("pdf") ? (
                      <>
                        <Image
                          className=" p-2 mt-2 h-[100px] w-[100px] rounded-xl cursor-pointer border hover:scale-105 transition-all"
                          width={150}
                          height={150}
                          loading="lazy"
                          src={"/pdf.png"}
                          key={item.asset_id}
                          alt={item.display_name}
                        ></Image>
                        <span className="text-start truncate  items-center justify-center flex mt-1 text-xs">
                          {item.display_name}
                        </span>
                      </>
                    ) : (
                      <>
                        <Image
                          className=" p-2 mt-2 h-[100px] w-[100px] rounded-xl cursor-pointer border hover:scale-105 transition-all"
                          width={150}
                          height={150}
                          loading="lazy"
                          src={item.secure_url}
                          key={item.asset_id}
                          alt={item.display_name}
                        ></Image>
                        <span className="text-center flex items-center justify-center mt-1 text-xs">
                          {item.display_name}
                        </span>
                      </>
                    )}
                  </div>
                ))
            ) : loading ? (
              <div
                className="flex mt-5 justify-center items-center 
          top-1/2 left-1/2 w-full h-full "
              >
                <Spinner text="Loading...Please Wait..!" />
              </div>
            ) : (
              <div
                className="flex mt-5 justify-center items-center 
          top-1/2 left-1/2 w-full h-full"
              >
                Empty
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Gallery;

const frameworks = ["Images", "Documents"] as const;

export function ComboboxBasic({
  setSelection,
}: {
  setSelection: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { selectedResource } = useDashboardContext();
  return (
    <div className="sticky top-0 rounded-xl">
      <Combobox items={frameworks}>
        <ComboboxInput
          placeholder={selectedResource?.display_name ?? "Images"}
        />
        <ComboboxContent className="">
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem
                key={item}
                value={item}
                onClick={() => setSelection(item)}
              >
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}
