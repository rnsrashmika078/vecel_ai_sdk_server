import { streamText, UIMessage, convertToModelMessages, tool } from "ai";
import { groq } from "@ai-sdk/groq";
import { createFile, weatherTool } from "@/app/helpers/tools";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.VITE_GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: message }],
        temperature: 0.7,
      }),
    });

    const data = await res.json();
    console.log("message", data.choices?.[0]?.message?.content);
    return NextResponse.json({
      message: "Request Succeed!",
      success: true,
      reply: data.choices?.[0]?.message?.content ?? "No response",
    });
  } catch (e) {
    return NextResponse.json({
      message: `failed ${e instanceof Error ? e.message : ""}`,
      success: false,
      reply: null,
    });
  }
}
