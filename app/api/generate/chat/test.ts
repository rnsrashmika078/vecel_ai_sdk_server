import { createFile } from "@/app/helpers/tools";
import { ChatAreaType } from "@/app/types/type";
import { NextResponse } from "next/server";

type History = {
  role: "assistant" | "user";
  message: string;
};
export async function POST(req: Request) {
  try {
    const { prompt, system, history } = await req.json();
    console.log("prompt", prompt);
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `${system}.chatName tool call only in initial phase of the chat.chat history: ${JSON.stringify(
              history
            )}`,
          },
          { role: "user", content: prompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "chatName",
              description:
                "short descriptive title for the chat only in initial state of the chat",
              parameters: {
                type: "object",
                properties: {
                  isInInitial: { type: "boolean" },
                  title: { type: "string" },
                },
                required: ["isInInitial", "title"],
              },
            },
          },
        ],
        tool_choice: "auto",
        temperature: 0.7,
      }),
    });
    const data = await res.json();
    let title = null;

    const toolCalls = data.choices?.[0]?.message?.tool_calls;
    if (toolCalls) {
      const toolCall = toolCalls[0];
      const functionName = toolCall.function.name;
      const args = JSON.parse(toolCall.function.arguments);

      console.log("Tool requested:", functionName);
      console.log("Arguments:", args.title);
      title = args.title;
    }
    console.log(data);
    console.log("Title", title);
    return NextResponse.json({
      message: "Request Succeed!",
      success: true,
      reply: data.choices?.[0]?.message?.content ?? "No response",
      title,
    });
  } catch (e) {
    return NextResponse.json({
      message: `failed ${e instanceof Error ? e.message : ""}`,
      success: false,
      reply: null,
      title: null,
    });
  }
}
