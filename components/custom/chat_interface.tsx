/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useChat } from "@ai-sdk/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { DefaultChatTransport } from "ai";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";
import TextareaAutosize from "react-textarea-autosize";
import { CloudinaryUpload } from "@/app/helpers/cloudinary";
import { FileType } from "@/app/types/type";
import { ArrowRight, Plus } from "lucide-react";
import ChatMessages from "./chat_messages";
import Image from "next/image";
import { TiDelete } from "react-icons/ti";
import { SiFiles, SiLoop } from "react-icons/si";
import { useDashboardContext } from "@/app/api/context/dashboard_context";

const ChatInterface = () => {
  const {
    messages,
    sendMessage,
    stop,
    status,
    resumeStream,
    regenerate,
    error,
  } = useChat({
    experimental_throttle: 20,
    transport: new DefaultChatTransport({
      api: `${process.env.NEXT_PUBLIC_API_URL!}/api/chat`,
      // api: `https://vecel-ai-sdk-server.vercel.app/api/chat`,
      headers: { "Content-Type": "application/json" },
    }),
  });
  const [input, setInput] = useState("");

  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<FileType | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleFileupload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
    if (file) {
      setLoading(true);
      const payload = await CloudinaryUpload(file);
      setFile(payload);
      e.target.value = "";
      setLoading(false);
    }
  };

  const [loop, setLoop] = useState<boolean>(false);
  const { setGalleryOpen, selectedResource, setSelectedResource } =
    useDashboardContext();

  const formRef = useRef<HTMLFormElement>(null);
  return (
    <div className="flex flex-col mx-auto sm:w-1/2 h-full w-full items-center justify-between">
      <ChatMessages status={status} messages={messages} />
      <input
        ref={inputRef}
        type="file"
        aria-label="file_upload"
        className="hidden"
        onChange={(e) => {
          handleFileupload(e);
        }}
      ></input>
      <form
        className="bottom-0 w-[300px] sm:w-full p-5 sticky bg-transparent"
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          const url = file?.url ?? selectedResource?.url;

          const payload = url
            ? JSON.stringify({ url, input })
            : JSON.stringify({ input });

          sendMessage({ text: payload });
          setInput("");
          setSelectedResource(null);
          setFile(null);
          return;
        }}
      >
        <div className=" grid w-full gap-6 rounded-md bg-textarea">
          <InputGroup>
            <TextareaAutosize
              minRows={1}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  e.currentTarget.form?.requestSubmit();
                }
              }}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              maxRows={5}
              data-slot="input-group-control"
              className="flex field-sizing-content min-h-2 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm placeholder:text-gray-400"
              placeholder="What's on your mind..."
            />

            <InputGroupAddon
              align="block-end"
              className="flex justify-between items-center"
            >
              <div className="flex">
                <InputGroupButton
                  size="sm"
                  onClick={() => {
                    if (inputRef.current) {
                      inputRef.current.click();
                    }
                  }}
                >
                  <Plus />
                </InputGroupButton>
                <InputGroupButton
                  size="sm"
                  onClick={() => {
                    setLoop((prev) => !prev);
                  }}
                >
                  <SiLoop
                    className={`transition-all ${loop ? "scale-120 " : "scale-100"}`}
                  />
                </InputGroupButton>

                <InputGroupButton
                  size="sm"
                  onClick={() => {
                    setGalleryOpen((prev) => !prev);
                  }}
                >
                  <SiFiles />
                </InputGroupButton>
              </div>

              <InputGroupButton
                onClick={(e) => e.currentTarget.form?.requestSubmit()}
                className="ml-0"
                size="sm"
              >
                <ArrowRight />
              </InputGroupButton>
            </InputGroupAddon>
            <InputGroupAddon align="block-start" className="flex">
              {loading ? (
                <div className=" relative w-[80px] h-[80px] bg-gray-600 rounded-xl animate-pulse"></div>
              ) : (
                (file ?? selectedResource) && (
                  <div className="relative rounded-xl border">
                    {(file?.format.includes("pdf") ??
                    selectedResource?.format.includes("pdf")) ? (
                      <Image
                        src={"/pdf.png"}
                        width={80}
                        height={80}
                        alt="uploaded image"
                      />
                    ) : (
                      <Image
                        src={file?.url ?? selectedResource?.secure_url ?? ""}
                        width={80}
                        height={80}
                        alt="uploaded image"
                      />
                    )}
                    <TiDelete
                      className="absolute top-0 right-0 cursor-pointer"
                      size={25}
                      onClick={() => {
                        setSelectedResource(null);
                        setFile(null);
                      }}
                    />
                  </div>
                )
              )}
            </InputGroupAddon>
          </InputGroup>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
