import {
  ChatAddToolApproveResponseFunction,
  ChatRequestOptions,
  ChatStatus,
} from "ai";
import ReactMarkdown from "react-markdown";

import { ToolRenderer } from "./tool_renderer";
import { memo } from "react";
import { GiAbstract021 } from "react-icons/gi";
import { LuRefreshCcw } from "react-icons/lu";
import { TAddToOutput, TMyUIMessage } from "@/app/types/type";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaFilePdf } from "react-icons/fa";
import Markdown from "react-markdown";
import MarkDown from "./react_markdown";
const ChatMessages = memo(
  ({
    messages,
    regenerate,
    addToolApprovalResponse,
    status,
  }: {
    status: ChatStatus;
    addToolApprovalResponse: ChatAddToolApproveResponseFunction;
    messages: TMyUIMessage[];
    regenerate: () => Promise<void>;
  }) => {
    return (
      <>
        {messages?.map((message) => (
          <div
            key={message?.id}
            className={`p-2 flex w-full ${
              message?.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-2 rounded-md ${
                message?.role === "user"
                  ? "justify-end items-end bg-message"
                  : "w-full justify-start"
              }`}
            >
              {message?.metadata?.status && (
                <div className="flex items-center gap-2">
                  <GiAbstract021 className="animate-spin" />
                  <span>{message?.metadata?.status}</span>
                </div>
              )}

              {message?.parts?.map((part, index) => {
                // const latestReasoning = [...(message.parts || [])]
                //   .reverse()
                //   .find((p) => p.type === "reasoning");
                // console.log("reasoningText", latestReasoning?.text);
                if (part?.type === "text") {
                  return (
                    <div key={index}>
                      <MarkDown part={part} />
                    </div>
                  );
                }

                if (part?.type === "reasoning") {
                  return (
                    <div
                      key={index}
                      className="text-gray-500 italic text-sm border-l-2 rounded-sm mb-2  border border-l-red-500 p-2"
                    >
                      <Accordion
                        type="single"
                        collapsible
                        defaultValue="item-1"
                      >
                        <AccordionItem value="item-1">
                          <AccordionTrigger className="font-bold ">
                            {message?.metadata?.reasoning_status &&
                              message?.metadata?.reasoning_status}
                          </AccordionTrigger>
                          <AccordionContent className="h-full">
                            <ReactMarkdown>{part.text}</ReactMarkdown>
                            {/* <ReactMarkdown>
                              {latestReasoning?.text}
                            </ReactMarkdown> */}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  );
                }
                if (part?.type.startsWith("tool")) {
                  return (
                    <ToolRenderer
                      part={part}
                      status={status}
                      key={index}
                      addToolApprovalResponse={addToolApprovalResponse}
                    />
                  );
                }
              })}
              {/* totalTokens */}
              {/* reasoning_status */}
              {/* status */}
              {message?.metadata?.totalTokens && (
                <span className="text-xs text-red-500 font-bold border p-1 rounded-md border-gray-900 bg-gray-800">
                  {message?.metadata?.totalTokens} tokens
                </span>
              )}
              {/* {message?.metadata?.totalTokens && contextWindow && (
                <span className="text-xs text-red-500 font-bold border p-1 rounded-md border-gray-900 bg-gray-800">
                  {contextWindow} Content Window
                </span>
              )} */}
            </div>
          </div>
        ))}
        {messages?.length > 1 ? (
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
      </>
    );
  },
);
ChatMessages.displayName = "ChatMessages";

export default ChatMessages;
