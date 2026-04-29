"use client";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { TMyUIMessage } from "./types/type";
import TextareaAutosize from "react-textarea-autosize";
import ReactMarkdown from "react-markdown";
import { BiAddToQueue } from "react-icons/bi";
import { FaStop } from "react-icons/fa";
import { LuRefreshCcw } from "react-icons/lu";
import { GiAbstract021 } from "react-icons/gi";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const MainPage = () => {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  /* eslint-disable @next/next/no-img-element */

  const [input, setInput] = useState("");

  const {
    messages,
    sendMessage,
    stop,
    status,
    resumeStream,
    regenerate,
    error,
    id,
  } = useChat<TMyUIMessage>({
    experimental_throttle: 50,
    transport: new DefaultChatTransport({
      api: `/api/chat`,
    }),
    onData: (data) => {
      console.log("Received data part from server:", data);
    },
  });

  return (
    <div className="flex flex-col mx-auto sm:w-1/2 h-full w-full items-center justify-between">
      <div className="w-full overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-2 flex w-full ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-2 rounded-md ${
                message.role === "user"
                  ? "justify-end items-end bg-message"
                  : "w-full justify-start"
              }`}
            >
              {message.metadata?.status && (
                <div className="flex items-center gap-2">
                  <GiAbstract021 className="animate-spin" />
                  <span>{message.metadata.status}</span>
                </div>
              )}

              {message.parts.map((part, index) => {
                if (part.type === "text") {
                  return (
                    <div key={index}>
                      <ReactMarkdown>{part.text}</ReactMarkdown>
                    </div>
                  );
                }

                if (part.type === "reasoning") {
                  return (
                    <div
                      key={index}
                      className="text-gray-500 italic text-sm border-l-2 rounded-sm mb-2  border-red-500 p-2"
                    >
                      <Accordion
                        type="single"
                        collapsible
                        key={`accordion-${message.id}-${index}`} // ← Add stable key
                        defaultValue="item-1"
                      >
                        <AccordionItem value="item-1">
                          <AccordionTrigger className="">
                            Thinking
                          </AccordionTrigger>
                          <AccordionContent className="h-full">
                            <ReactMarkdown>{part.text}</ReactMarkdown>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  );
                }
              })}
              {message.metadata?.totalTokens && (
                <span className="text-xs text-red-500 font-bold border p-1 rounded-md border-gray-900 bg-gray-800">
                  {message.metadata.totalTokens} tokens
                </span>
              )}
            </div>
          </div>
        ))}
        {messages.length > 1 ? (
          status === "error" ||
          (status === "ready" && (
            <div className=" flex w-full justify-start">
              <div className="px-5 rounded-xl w-fit flex items-center">
                <button type="button" onClick={() => regenerate()}>
                  <LuRefreshCcw size={"26"} className="btn-icon" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div></div>
        )}
      </div>

      <form
        className="w-full sm:w-full p-5 sticky bottom-0 "
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(
            { text: input },
            {
              body: {
                test: "test_01",
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
              <InputGroupButton
                onClick={(e) => e.currentTarget.form?.requestSubmit()}
                className="ml-0"
                size="sm"
              >
                <BiAddToQueue />
              </InputGroupButton>
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
                  onClick={(e) => e.currentTarget.form?.requestSubmit()}
                  className="ml-0 disabled:bg-gray-100 border border-gray-200 bg-white text-black"
                  size="sm"
                >
                  <ArrowRight />
                </InputGroupButton>
              )}
            </InputGroupAddon>
            <InputGroupAddon
              align="block-start"
              className="flex"
            ></InputGroupAddon>
          </InputGroup>
        </div>
      </form>
    </div>
  );
};

export default MainPage;
