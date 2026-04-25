import { groq } from "@ai-sdk/groq";
import { generateText, tool } from "ai";
import { NextResponse } from "next/server";
import z from "zod";

export async function POST(req: Request) {
  try {
    const { input }: { input: string } = await req.json();

    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      maxOutputTokens: 10,
      temperature: 1,
      prompt: `create a  3-4 word creative title for chat based on input : ${input}. no preamble`,
    });

    return NextResponse.json({
      title: text,
    });
  } catch (e) {
    console.log(e instanceof Error ? e.message : "error while calling model");
  }
}
