/* eslint-disable @typescript-eslint/no-explicit-any */
import { streamText, UIMessage, convertToModelMessages, stepCountIs } from "ai";
import { groq } from "@ai-sdk/groq";
import { tools } from "@/app/helpers/tools";

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
          reasoningEffort: "high",
        },
      },
      // timeout: 60000,
      // temperature: 0,
      // toolChoice: "auto",
      messages: await convertToModelMessages(messages),
      stopWhen: stepCountIs(2),
    });

    return result.toUIMessageStreamResponse({
      messageMetadata: ({ part }) => {
        if (part.type === "start") {
          return {
            status: "Starting..",
          };
        }
        if (part.type === "reasoning-delta") {
          return {
            status: "Thinking...",
            reasoning: part.text,
          };
        }
        // if (part.type === "start-step") {
        //   return {
        //     status: "Going on..",
        //     reasoning: reasoning,
        //   };
        // }
        // if (part.type === "tool-call") {
        //   return {
        //     status: `Calling ${part.toolName}`,
        //     reasoning: reasoning,
        //   };
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
