/* eslint-disable @typescript-eslint/no-explicit-any */
import { streamText, UIMessage, convertToModelMessages, stepCountIs } from "ai";
import { groq } from "@ai-sdk/groq";
import { tools } from "@/app/helpers/tools";
import { deltaTime } from "@/app/helpers/format";

export async function POST(req: Request) {
  try {
    const { messages, test }: { messages: UIMessage[]; test: string } =
      await req.json();

    console.log(`custom values ${test}`);
    const result = streamText({
      model: groq("openai/gpt-oss-20b"),
      // model: groq("llama-3.3-70b-versatile"),
      system: `You are a helpful assistant. use tool if user ask only`,
      tools,
      providerOptions: {
        groq: {
          reasoningFormat: "parsed",
          reasoningEffort: "medium",
        },
      },
      // timeout: 60000,
      // temperature: 0,
      // toolChoice: "auto",
      messages: await convertToModelMessages(messages),
      stopWhen: stepCountIs(2),
    });

    let reasoningStart: number | null = null;
    return result.toUIMessageStreamResponse({
      messageMetadata: ({ part }) => {
        if (part.type === "start") {
          return {
            status: "Requesting...",
          };
        }
        if (part.type === "reasoning-start") {
          reasoningStart = Date.now();

          return {
            status: "Thinking...",
            start: new Date().getTime(),
            reasoning_status: "reasoning...",
          };
        }
        if (part.type === "reasoning-delta") {
          return {
            status: "Still thinking...",
            reasoning: part.text,
            reasoning_status: "reasoning...",
          };
        }
        if (part.type === "reasoning-end") {
          const end = Date.now();
          return {
            reasoning_status: `Thought for ${deltaTime(reasoningStart!, end)} seconds`,
          };
        }
        if (part.type === "start-step") {
          return {
            status: "Working on it...",
          };
        }
        // if (part.type === "tool-call") {
        //   if (part.toolName.startsWith("tool-imageRecognitionTool"))
        //     return {
        //       status: `Analyzing image...!`,
        //     };
        //   if (part.toolName.startsWith("tool-createChartTool"))
        //     return {
        //       status: `Generating Chart UI`,
        //     };
        //   if (part.toolName.startsWith("tool-displayWeather"))
        //     return {
        //       status: `Requesting Weather API...!`,
        //     };
        //   if (part.toolName.startsWith("tool-webSearchTool"))
        //     return {
        //       status: `Searching internet...!`,
        //     };
        // }
        if (part.type === "finish") {
          return {
            status: "",
            totalTokens: part.totalUsage.totalTokens,
          };
        }
      },
    });
  } catch (err) {
    console.log(err);
  }
}
