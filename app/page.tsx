"use client";

import { useChat } from "@ai-sdk/react";
import {
  DefaultChatTransport,
  lastAssistantMessageIsCompleteWithApprovalResponses,
} from "ai";
import { TMyUIMessage } from "./types/type";
import { useState } from "react";

export default function Chat() {
  const [input, setInput] = useState<string>("");
  const { messages, addToolApprovalResponse, sendMessage } = useChat({
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithApprovalResponses,

    transport: new DefaultChatTransport({
      api: `/api/experimental_chat`,
    }),
  });
  return (
    <div className="border w-full h-full items-center justify-between flex flex-col">
      <div className="text-white p-5">
        {messages.map((message) => (
          <div key={message.id}>
            {message.parts.map((part, idx) => {
              if (part.type === "text") {
                return <div key={idx}>{part.text}</div>;
              }
              if (part.type === "tool-getWeather") {
                switch (part.state) {
                  case "approval-requested":
                    return (
                      <div key={part.toolCallId}>
                        <p>Get weather for {part.input.city}?</p>
                        <button
                          onClick={() =>
                            addToolApprovalResponse({
                              id: part.approval.id,
                              approved: true,
                            })
                          }
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            addToolApprovalResponse({
                              id: part.approval.id,
                              approved: false,
                            })
                          }
                        >
                          Deny
                        </button>
                      </div>
                    );
                  // case "output-available":
                  //   return (
                  //     <div key={part.toolCallId}>
                  //       Weather in {part.input.city}: {part.output}
                  //     </div>
                  //   );
                }
              }
            })}
          </div>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim()) {
            sendMessage({ text: input });
            setInput("");
          }
        }}
      >
        <input
          className="border"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
    </div>
  );
}
