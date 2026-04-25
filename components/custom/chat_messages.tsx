import { ChatStatus } from "ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import * as prismaStyles from "react-syntax-highlighter/dist/esm/styles/prism";
import { ToolRenderer } from "./tool_renderer";
import { memo } from "react";
import { GiAbstract021 } from "react-icons/gi";
import { LuRefreshCcw } from "react-icons/lu";
import { MyUIMessage } from "@/app/types/type";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const ChatMessages = memo(
  ({
    messages,
    regenerate,
    status,
  }: {
    status: ChatStatus;
    messages: MyUIMessage[];
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
                if (part?.type === "text") {
                  return (
                    <div key={index}>
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({ children }) => (
                            <p className="leading-relaxed">{children}</p>
                          ),

                          h1: ({ children }) => (
                            <h1 className="text-2xl font-bold">{children}</h1>
                          ),

                          h2: ({ children }) => (
                            <h2 className="text-xl font-semibold">
                              {children}
                            </h2>
                          ),

                          h3: ({ children }) => (
                            <h3 className="text-lg font-semibold mt-2">
                              {children}
                            </h3>
                          ),
                          h4: ({ children }) => (
                            <h4 className="text-lg font-semibold mt-2">
                              {children}
                            </h4>
                          ),

                          strong: ({ children }) => (
                            <strong className="font-bold ">{children}</strong>
                          ),
                          // em: ({ children }) => (
                          //   <div className="border-l-4 rounded-md px-2 mt-2 bg-textarea">
                          //     <em className="italic text-blue-500">{children}</em>
                          //   </div>
                          // ),
                          table: ({ children }) => (
                            <table className=" mt-2">{children}</table>
                          ),
                          th: ({ children }) => (
                            <th className="border px-0 md:p-3 mt-3">
                              {children}
                            </th>
                          ),
                          tr: ({ children }) => (
                            <tr className="border px-0 md:p-3mt-3">
                              {children}
                            </tr>
                          ),
                          td: ({ children }) => (
                            <td className="border px-0 md:p-3 mt-3">
                              {children}
                            </td>
                          ),

                          a: ({ href, children }) => (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 underline hover:text-blue-300"
                            >
                              {children}
                            </a>
                          ),

                          ul: ({ children }) => (
                            <ul className="list-disc ">{children}</ul>
                          ),

                          ol: ({ children }) => (
                            <ol className="list-decimal">{children}</ol>
                          ),

                          li: ({ children }) => (
                            <li className="ml-5 ">{children}</li>
                          ),

                          blockquote: ({ children }) => (
                            <blockquote className="">{children}</blockquote>
                          ),

                          br: ({ children }) => (
                            <br className="">{children}</br>
                          ),

                          hr: () => <hr className="border-gray-600 my-4" />,

                          pre: ({ children }) => (
                            <pre className="bg-black/80  rounded-lg overflow-x-auto my-3 text-sm">
                              {children}
                            </pre>
                          ),
                          code: ({ className, children }) => {
                            const isBlock = className?.includes("language-");
                            return isBlock ? (
                              //@ts-expect-error:ts error
                              <SyntaxHighlighter
                                language="javascript"
                                style={prismaStyles.atomDark}
                              >
                                {children}
                              </SyntaxHighlighter>
                            ) : (
                              <code className="bg-gray-800 rounded custom-scrollbar text-red-400 text-sm">
                                {children}
                              </code>
                            );
                          },
                        }}
                      >
                        {part?.text}
                      </ReactMarkdown>
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
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  );
                }
                if (part?.type.startsWith("tool")) {
                  return (
                    <ToolRenderer part={part} status={status} key={index} />
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
