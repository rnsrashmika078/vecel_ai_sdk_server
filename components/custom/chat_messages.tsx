import { fileFormat } from "@/app/helpers/format";
import { UIMessage, UIDataTypes, UITools, ChatStatus } from "ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import * as prismaStyles from "react-syntax-highlighter/dist/esm/styles/prism";
import { inputParser } from "@/app/helpers/parser";
import { ToolRenderer } from "./tool_renderer";
const ChatMessages = ({
  messages,
  status,
}: {
  status: ChatStatus;
  messages: UIMessage<unknown, UIDataTypes, UITools>[];
}) => {
  return (
    <div className="w-full m-auto ">
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
                ? "justify-end items-end bg-message"
                : "w-full justify-start "
            }`}
          >
            {message.parts.map((part, index) => {
              const parse = inputParser(part, message);

              if (part.type === "text") {
                return (
                  <div key={index}>
                    {parse?.url && fileFormat(parse?.url)}

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
                          <h2 className="text-xl font-semibold">{children}</h2>
                        ),

                        h3: ({ children }) => (
                          <h3 className="text-lg font-semibold mt-2">
                            {children}
                          </h3>
                        ),

                        strong: ({ children }) => (
                          <strong className="font-bold ">{children}</strong>
                        ),

                        em: ({ children }) => (
                          <div className="border-l-4 rounded-md px-2 mt-2 bg-textarea">
                            <em className="italic text-blue-500">{children}</em>
                          </div>
                        ),
                        table: ({ children }) => (
                          <table className=" mt-3">{children}</table>
                        ),
                        th: ({ children }) => (
                          <th className="border px-0 md:p-3 mt-3">
                            {children}
                          </th>
                        ),
                        tr: ({ children }) => (
                          <tr className="border px-0 md:p-3mt-3">{children}</tr>
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

                        hr: () => <hr className="border-gray-600 my-4" />,

                        pre: ({ children }) => (
                          <pre className="bg-black/80  rounded-lg overflow-x-auto my-3 text-sm">
                            {children}
                          </pre>
                        ),
                        code: ({ className, children, ...props }) => {
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
                            <code className="bg-gray-800 px-1.5 py-0.5 rounded text-red-400 text-sm">
                              {children}
                            </code>
                          );
                        },
                      }}
                    >
                      {message.role === "assistant" ? part.text : parse?.input}
                    </ReactMarkdown>
                  </div>
                );
              }
              return <ToolRenderer part={part} status={status} key={index} />;
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
