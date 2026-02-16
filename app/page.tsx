"use client";
import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";

const ChatArea = () => {
  const { messages, sendMessage } = useChat({
    transport: new DefaultChatTransport({
      //   api: "http://localhost:3000/api/chat",
      api: `${process.env.NEXT_API_URL!}/api/chat`,
      headers: { "Content-Type": "application/json" },
    }),
  });
  const [input, setInput] = useState("");
  return (
    <div className="flex flex-col  w-full max-w-md p-5  mx-auto ">
      <div className="overflow-y-auto h-[800px]">
        {messages?.map((message: UIMessage) => (
          <div
            key={message.id}
            className={`flex flex-col w-full p-2  custom-scrollbar   ${
              message.role === "user" ? "items-end " : "items-start "
            }`}
          >
            {/* <p className="text-[10px] flex w-fit">
            {message.role === "user" ? "You" : "AI"}
          </p> */}
            <div
              className={` custom-scrollbar ${
                message.role === "user" ? "bg-gray-900 p-2 rounded-xl " : " "
              }`}
            >
              {message.parts.map((part, i) => {
                switch (part.type) {
                  case "text":
                    return (
                      <div
                        key={`${message.id}-${i}`}
                        className="custom-scrollbar"
                      >
                        <ReactMarkdown
                          components={{
                            h1: ({ children, ...props }) => (
                              <h1
                                className="text-white text-2xl font-bold"
                                {...props}
                              >
                                {children}
                              </h1>
                            ),
                            h2: ({ children, ...props }) => (
                              <h2
                                className="text-white text-xl font-semibold"
                                {...props}
                              >
                                {children}
                              </h2>
                            ),
                            p: ({ children, ...props }) => (
                              <p className="text-white" {...props}>
                                {children}
                              </p>
                            ),
                            ul: ({ children, ...props }) => (
                              <ul
                                className="text-white list-disc ml-5"
                                {...props}
                              >
                                {children}
                              </ul>
                            ),
                            ol: ({ children, ...props }) => (
                              <ol
                                className="text-white list-decimal"
                                {...props}
                              >
                                {children}
                              </ol>
                            ),
                            li: ({ children, ...props }) => (
                              <li className="text-white" {...props}>
                                {children}
                              </li>
                            ),
                            code({ className, children }) {
                              const match = /language-(\w+)/.exec(
                                className || ""
                              );

                              if (match) {
                                return (
                                  <SyntaxHighlighter
                                    style={vscDarkPlus}
                                    language={match[1]}
                                    PreTag="div"
                                  >
                                    {String(children).replace(/\n$/, "")}
                                  </SyntaxHighlighter>
                                );
                              }
                              return (
                                <code className="bg-zinc-600 px-1 rounded">
                                  {children}
                                </code>
                              );
                            },
                          }}
                        >
                          {part.text}
                        </ReactMarkdown>
                      </div>
                    );
                  case "tool-weatherTool":
                    return <p>{JSON.stringify(part.output)}</p>;
                }
              })}
            </div>
          </div>
        ))}
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage({ text: input });
              setInput("");
            }}
          >
            {/* <div className="fixed bottom-0 w-full p-2 rounded shadow-xl">
          <AskAI />
        </div> */}
            <input
              className="fixed  dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
              value={input}
              placeholder="Say something..."
              onChange={(e) => setInput(e.currentTarget.value)}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
