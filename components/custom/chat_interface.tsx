/* eslint-disable @next/next/no-img-element */
"use client";
import { useChat } from "@ai-sdk/react";
import { ChangeEvent, useRef, useState } from "react";
import { DefaultChatTransport } from "ai";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";
import TextareaAutosize from "react-textarea-autosize";
import { CloudinaryUpload } from "@/app/helpers/cloudinary";
import { FileType } from "@/app/types/type";
import { ArrowRight, Delete, Plus } from "lucide-react";
import ChatMessages from "./chat_messages";
import Image from "next/image";
import { TiDelete } from "react-icons/ti";

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
    transport: new DefaultChatTransport({
      api: `${process.env.NEXT_PUBLIC_API_URL!}/api/chat`,
      // api: `https://vecel-ai-sdk-server.vercel.app/api/chat`,
      headers: { "Content-Type": "application/json" },
    }),
  });
  const [input, setInput] = useState("");
  const [url, setUrl] = useState<string>("");
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

  console.log("status", status);
  return (
    <div className="flex flex-col w-full items-center justify-start">
      <div className="flex h-[550px] custom-scrollbar w-full bg-transparent">
        <ChatMessages status={status} messages={messages} />
      </div>
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
        className="sm:w-1/2 w-full bottom-0 p-5 absolute bg-transparent"
        onSubmit={(e) => {
          e.preventDefault();
          if (file?.url) {
            const message = `{"url": "${file?.url}", "input" :"${input}"}`;
            sendMessage({ text: message });
            setInput("");
            setFile(null);
            return;
          }
          sendMessage({
            text: `{"input" :"${input}"}`,
          });
          setInput("");
          setFile(null);
        }}
      >
        <div className="grid w-full gap-6 rounded-md bg-textarea">
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
                setInput(e.currentTarget.value);
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

              <InputGroupButton type="submit" className="ml-0" size="sm">
                <ArrowRight />
              </InputGroupButton>
            </InputGroupAddon>
            <InputGroupAddon align="block-start" className="flex">
              {loading ? (
                <div className=" relative w-[80px] h-[80px] bg-gray-600 rounded-xl animate-pulse"></div>
              ) : (
                file && (
                  <div className="relative rounded-xl border">
                    <Image
                      src={file?.url}
                      width={80}
                      height={80}
                      alt="uploaded image"
                    />
                    <TiDelete
                      className="absolute top-0 right-0"
                      size={25}
                      onClick={() => setFile(null)}
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
