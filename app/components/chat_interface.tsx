/* eslint-disable @next/next/no-img-element */
"use client";
import { useChat } from "@ai-sdk/react";
import { ChangeEvent, useRef, useState } from "react";
import { DefaultChatTransport } from "ai";

import { v4 as uuid } from "uuid";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Spinner from "./spinner";
import { Weather } from "./ai-components/weather";
import GenFile from "./ai-components/generated_file";
import Chart from "./ai-components/chart";

import { FileType } from "../types/type";
import { CloudinaryUpload } from "../helpers/cloudinary";
import InputArea from "./input";
import { BiPlus, BiSend, BiStop } from "react-icons/bi";
import { FcDocument } from "react-icons/fc";
import Skeleton from "./skeleton";
import { GrResume } from "react-icons/gr";

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
      console.log("still inside");
      setLoading(true);
      const payload = await CloudinaryUpload(file);
      console.log("payload", payload);
      setFile(payload);
      e.target.value = "";
      setLoading(false);
    }
  };
  const fileTypes = ["png", "jpg"];
  console.log("status", status);

  return (
    <div className="flex custom-scrollbar p-5 relative h-full">
      <div className="flex  px-5 flex-col sm:max-w-xl w-full mx-auto h-full flex-shrink justify-between">
        {/* <Chart  /> */}
        <div className="custom-scroll-bar py-5">
          <input
            ref={inputRef}
            type="file"
            aria-label="file_upload"
            className="hidden"
            onChange={(e) => {
              handleFileupload(e);
            }}
          ></input>

          <div>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`p-2 flex w-full  ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-2 rounded-xl ${
                    message.role === "user"
                      ? "justify-end items-end bg-gray-900"
                      : " w-full justify-start"
                  }`}
                >
                  {message.parts.map((part, index) => {
                    let parse = null;
                    if (part.type === "text" && message.role === "user") {
                      try {
                        parse =
                          message.role === "user"
                            ? JSON.parse(part.text)
                            : part;
                      } catch (e) {
                        console.log("parse error", e);
                      }
                    }

                    if (part.type === "text") {
                      return (
                        <div key={index}>
                          {parse?.url && (
                            <img
                              src={parse?.url ?? "./image.png"}
                              width={150}
                              height={150}
                              alt="upload file"
                              className="w-[150px] h-[150px] object-contain rounded-2xl mb-2"
                            />
                          )}

                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              p: ({ children }) => (
                                <p className="leading-relaxed py-1 text-white">
                                  {children}
                                </p>
                              ),

                              h1: ({ children }) => (
                                <h1 className="text-2xl font-bold my-3 text-purple-400">
                                  {children}
                                </h1>
                              ),

                              h2: ({ children }) => (
                                <h2 className="text-xl font-semibold my-2 text-purple-300">
                                  {children}
                                </h2>
                              ),

                              h3: ({ children }) => (
                                <h3 className="text-lg font-semibold my-2 text-purple-200">
                                  {children}
                                </h3>
                              ),

                              strong: ({ children }) => (
                                <strong className="font-bold text-white">
                                  {children}
                                </strong>
                              ),

                              em: ({ children }) => (
                                <em className="italic text-green-400">
                                  {children}
                                </em>
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
                                <ul className="list-disc pl-6 my-2 text-white space-y-1">
                                  {children}
                                </ul>
                              ),

                              ol: ({ children }) => (
                                <ol className="list-decimal pl-6 my-2 text-white space-y-1">
                                  {children}
                                </ol>
                              ),

                              li: ({ children }) => (
                                <li className="ml-5 text-white">{children}</li>
                              ),

                              blockquote: ({ children }) => (
                                <blockquote className="border-l-4 border-purple-500 pl-4 italic text-gray-300 my-3">
                                  {children}
                                </blockquote>
                              ),

                              hr: () => <hr className="border-gray-600 my-4" />,

                              pre: ({ children }) => (
                                <pre className="bg-black/80 p-4 rounded-lg overflow-x-auto my-3 text-sm">
                                  {children}
                                </pre>
                              ),

                              code: ({ className, children, ...props }) => {
                                const codeId = uuid();
                                const isBlock =
                                  className?.includes("language-");

                                return isBlock ? (
                                  <pre className="relative ebg-black/80 p-4 rounded-lg overflow-x-auto my-3 text-sm">
                                    <span className="absolute top-0 right-0">
                                      {/* <BiCopy
                                  size={20}
                                  onClick={() => {
                                    const text =
                                      codeRefs.current[codeId]?.textContent ||
                                      "";
                                    navigator.clipboard.writeText(text);
                                  }}
                                /> */}
                                    </span>
                                    <code
                                      className="text-blue-400"
                                      // ref={(el) => {
                                      //   if (el) codeRefs.current[codeId] = el;
                                      // }}
                                    >
                                      {children}
                                    </code>
                                  </pre>
                                ) : (
                                  <code className="bg-gray-800 px-1.5 py-0.5 rounded text-red-400 text-sm">
                                    {children}
                                  </code>
                                );
                              },
                            }}
                          >
                            {message.role === "assistant"
                              ? part.text
                              : parse.input}
                          </ReactMarkdown>
                        </div>
                      );
                    }

                    if (part.type === "tool-displayWeather") {
                      switch (part.state) {
                        case "input-available":
                          return (
                            <div key={index}>
                              <Spinner text="Requesting Weather API...!" />
                            </div>
                          );
                        case "output-available":
                          return (
                            <div key={index} className="w-full">
                              {/*@ts-expect-error: ignore error for now (Ts error) */}
                              <Weather {...part.output} />
                            </div>
                          );
                        case "output-error":
                          return <div key={index}>Error: {part.errorText}</div>;
                        default:
                          return null;
                      }
                    }
                    if (part.type === "tool-createFileTool") {
                      switch (part.state) {
                        case "input-available":
                          return (
                            <div key={index}>
                              <Spinner text="Generating File...!" />
                            </div>
                          );
                        case "output-available":
                          return (
                            <div key={index} className="w-full">
                              {/*@ts-expect-error: ignore error for now (Ts error) */}
                              <GenFile {...part.output} />
                            </div>
                          );
                        case "output-error":
                          return <div key={index}>Error: {part.errorText}</div>;
                        default:
                          return null;
                      }
                    }

                    if (part.type === "tool-imageRecognitionTool") {
                      switch (part.state) {
                        case "input-available":
                          return (
                            <div key={index}>
                              <Spinner text="Analyzing image...!" />
                            </div>
                          );
                        case "output-error":
                          return <div key={index}>Error: {part.errorText}</div>;
                        default:
                          return null;
                      }
                    }
                    if (part.type === "tool-createChartTool") {
                      switch (part.state) {
                        case "input-available":
                          return (
                            <div key={index}>
                              <Spinner text="Generating Charts data...!" />
                            </div>
                          );
                        case "output-available":
                          if (status === "ready") {
                            return (
                              <div key={index} className="w-full">
                                {/* @ts-expect-error:data shape mismatch */}
                                <Chart data={part.output} />
                              </div>
                            );
                          } else {
                            return (
                              <Spinner key={0} text="Finalizing Chat..!" />
                            );
                          }
                        case "output-error":
                          return <div key={index}>Error: {part.errorText}</div>;
                        default:
                          return null;
                      }
                    }
                    return null;
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
        <form
          className="sticky  -bottom-0 sm:max-w-xl w-full"
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
          <InputArea input={input} setInput={setInput}>
            <div className="absolute top-1/2 left-5 -translate-x-1/2  -translate-y-1/2 hover:border-[#3e3e3e] p-2">
              <BiPlus size={20} onClick={() => inputRef.current?.click()} />
            </div>
            <div className="absolute top-1/2 right-0  -translate-y-1/2 hover:border-[#3e3e3e] p-2">
              {status === "streaming" && (
                <BiStop size={20} onClick={() => stop()} />
              )}
            </div>
            {/* <div className="absolute top-1/2 right-15  -translate-y-1/2 hover:border-[#3e3e3e] p-2">
              <GrResume size={20} onClick={() => regenerate()} />
            </div> */}
            <div
              className={`absolute  left-2 ${
                file?.format === "pdf" ? "-top-15" : "-top-28"
              }`}
            >
              <Skeleton isLoading={loading}>
                <div
                  className={`${
                    file?.format === "pdf"
                      ? "h-auto w-full"
                      : "h-[100px] w-full"
                  }`}
                >
                  {fileTypes.includes(file?.format ?? "") && (
                    <>
                      <img
                        src={file?.url}
                        width={100}
                        height={100}
                        alt="upload file"
                        className="w-full h-full object-contain rounded-2xl border"
                      />
                    </>
                  )}
                  {file?.format === "pdf" && (
                    // <iframe
                    //     aria-label="pdf viewer"
                    //     src={file.url}
                    //     width={100}
                    //     height={100}
                    //     className="w-full"
                    // ></iframe>
                    <FcDocument size={50} className="border rounded-xl p-2" />
                  )}
                </div>
              </Skeleton>
            </div>
          </InputArea>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
