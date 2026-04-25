/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useChat } from "@ai-sdk/react";
import { ChangeEvent, memo, useEffect, useMemo, useRef, useState } from "react";
import { DefaultChatTransport } from "ai";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";
import TextareaAutosize from "react-textarea-autosize";
import { CloudinaryUpload } from "@/app/helpers/cloudinary";
import { FileType, MyUIMessage } from "@/app/types/type";
import { ArrowRight, Plus } from "lucide-react";
import Spinner from "./spinner";
const ChatMessages = dynamic(() => import("./chat_messages"), {
  loading: () => <Spinner text="Loading...Please Wait...!" />,
});
import Image from "next/image";
import { TiDelete } from "react-icons/ti";
import { SiFiles } from "react-icons/si";
import { useDashboardContext } from "@/app/api/context/dashboard_context";
import { FaStop } from "react-icons/fa";
import { generateTitle } from "@/app/helpers/tool_helpers";
import dynamic from "next/dynamic";
import { createClient } from "@/app/utils/supabase/client";
import { snapshot } from "@/app/utils/supabase/action_client";

const ChatInterface = memo(
  ({
    initialMessages,
    chatId,
  }: {
    initialMessages: MyUIMessage[];
    chatId: string;
  }) => {
    console.log("Render: ChatInterface Component");

    const [input, setInput] = useState("");

    const [loading, setLoading] = useState<boolean>(false);
    const [file, setFile] = useState<FileType | null>(null);

    const inputRef = useRef<HTMLInputElement | null>(null);
    const {
      setGalleryOpen,
      selectedResource,
      setSelectedResource,
      setChats,
      reasoningEffort,
    } = useDashboardContext();
    const {
      messages,
      sendMessage,
      stop,
      status,
      resumeStream,
      regenerate,
      error,
      id,
    } = useChat<MyUIMessage>({
      id: chatId,
      experimental_throttle: 50,
      messages: initialMessages,
      transport: new DefaultChatTransport({
        api: `/api/chat`,
      }),
      onData: (data) => {
        console.log("Received data part from server:", data);
      },
    });

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

    const generateTitleFn = async () => {
      const title = await generateTitle(input);
      setChats((prev) => [...prev, { title, chat_id: chatId }]);

      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("chats")
          .insert({ chat_id: chatId, title })
          .select()
          .single();

        if (error) {
          console.log("Supabase error:", error.message);
          return;
        }
      } catch (e) {
        console.log(e instanceof Error ? e.message : "error while insertion");
      }
    };

    const metadata = useMemo(() => {
      return messages.at(-1)?.metadata;
    }, [messages]);

    useEffect(() => {
      if (status === "ready") {
        if (!metadata) return;
        const supabaseAction = async () => {
          await snapshot({ messages: messages, chatId }); // name must change
        };
        supabaseAction();
      }
    }, [status, chatId, metadata]);

    const formRef = useRef<HTMLFormElement>(null);
    return (
      <div className="flex flex-col mx-auto sm:w-1/2 h-full w-full items-center  justify-between">
        <div className="w-full ">
          {messages && messages.length > 0 && (
            <ChatMessages
              messages={messages}
              regenerate={regenerate}
              status={status}
            />
          )}
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
          className="w-full sm:w-full p-5 sticky bottom-0 "
          onSubmit={async (e) => {
            e.preventDefault();
            if (messages.length == 0 || messages.length == 1) {
              await generateTitleFn();
            }
            sendMessage(
              { text: input },
              {
                body: {
                  reasoningEffort,
                  chatId,
                },
              },
            );
            setInput("");
            return;
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
                <div className="flex w-full">
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
                      if (typeof window === "undefined") return;

                      setGalleryOpen((prev) => !prev);
                      window.location.hash = "gallery";
                    }}
                  >
                    <SiFiles />
                  </InputGroupButton>
                </div>

                {status === "submitted" || status === "streaming" ? (
                  <InputGroupButton
                    onClick={() => stop()}
                    className="ml-0 disabled:bg-gray-100 border border-gray-200 bg-white text-black"
                    size="sm"
                  >
                    <FaStop />
                  </InputGroupButton>
                ) : (
                  <InputGroupButton
                    disabled={status !== "ready"}
                    onClick={(e) => {
                      e.currentTarget.form?.requestSubmit();
                    }}
                    className="ml-0 disabled:bg-gray-100 border border-gray-200 bg-white text-black"
                    size="sm"
                  >
                    <ArrowRight />
                  </InputGroupButton>
                )}
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
  },
);
ChatInterface.displayName = "ChatInterface";

export default ChatInterface;
