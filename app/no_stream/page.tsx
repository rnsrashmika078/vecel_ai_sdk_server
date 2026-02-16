"use client";
import { use, useState } from "react";
import { ChatAreaType } from "../types/type";
import { v4 as uuid } from "uuid";

const ChatArea = () => {
  const [message, setMessage] = useState<ChatAreaType[]>([]);
  const [prompt, setPrompt] = useState<string>("");

  const handleQuery = async (prompt: string) => {
    const id = uuid();
    const assistId = uuid();

    setMessage((prev) => [...prev, { id, message: prompt, role: "user" }]);
    const res = await fetch("http://localhost:3000/api/generate/chat", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });
    const result = await res.json();
    setMessage((prev) => [
      ...prev,
      { id: assistId, message: result.reply, role: "assistant" },
    ]);

    console.log(result);
  };
  return (
    <div className="flex justify-between flex-col w-full h-[calc(100%-2rem)]">
      <div>
        {message.map((msg) => (
          <div key={msg.id} className="flex flex-col space-5">
            <p>{msg.role}:</p>
            <p className="italic">{msg.message}</p>
          </div>
        ))}
      </div>

      <div>
        <input
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              handleQuery(prompt);
            }
          }}
          value={prompt}
          onChange={(e) => setPrompt(e.currentTarget.value)}
          aria-label="input"
          className="bg-black p-2 w-full border rounded-2xl"
        ></input>
      </div>
    </div>
  );
};

export default ChatArea;
