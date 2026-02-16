"use client";
import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import { DefaultChatTransport, type UIMessage } from "ai";
const ChatArea = () => {
  const { messages, sendMessage } = useChat({
    transport: new DefaultChatTransport({
      //   api: "http://localhost:3000/api/chat",
      api: `${process.env.NEXT_API_URL!}/api/chat`,
      headers: { "Content-Type": "application/json" },
    }),
  });
  const [input, setInput] = useState("");
  console.log("messages" , messages)
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
                        {part.text}
                      </div>
                    );
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
