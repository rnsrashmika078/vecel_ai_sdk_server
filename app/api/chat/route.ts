import {
  streamText,
  UIMessage,
  convertToModelMessages,
  stepCountIs,
  pruneMessages,
} from "ai";
import { groq } from "@ai-sdk/groq";
import { tools } from "@/app/helpers/tools";
import { deltaTime } from "@/app/helpers/format";
import { TReasoningEffort } from "@/app/types/type";

export async function POST(req: Request) {
  try {
    const {
      messages,
      settings,
    }: {
      messages: UIMessage[];
      settings: TReasoningEffort;
    } = await req.json();

    const modelMessages = await convertToModelMessages(messages);

    const pruned = pruneMessages({
      messages: modelMessages,
      reasoning: "all",
    });

    let responseHeaders: any;
    const result = streamText({
      model: groq("openai/gpt-oss-20b"),
      // model: groq(settings?.model),
      // maxOutputTokens: 300,
      // model: groq("llama-3.3-70b-versatile"),
      system: `You are a helpful assistant. use tool if user ask only. You can call multiple tools in sequence if required. `,
      tools,
      providerOptions: {
        groq: {
          reasoningFormat: settings?.effort === "none" ? "hidden" : "parsed",
          ...(settings?.effort !== "none" && {
            settings: settings?.effort,
          }),
        },
      },
      // timeout: 20000,
      // temperature: 0,
      messages: pruned,
      stopWhen: stepCountIs(5),
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
            reasoning_status: "reasoning",
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
          const delta = deltaTime(reasoningStart!, end);
      

          reasoningStart = null;

          return {
            reasoning_status: `Thought for ${delta} seconds`,
          };
        }
        if (part.type === "start-step") {
          return {
            status: "Working on it...",
          };
        }
        if (part.type === "tool-call") {
          if (part.toolName.startsWith("tool-imageRecognitionTool"))
            return {
              status: `Analyzing image...!`,
            };
          if (part.toolName.startsWith("tool-createChartTool"))
            return {
              status: `Generating Chart UI`,
            };
          if (part.toolName.startsWith("tool-displayWeather"))
            return {
              status: `Requesting Weather API...!`,
            };
          if (part.toolName.startsWith("tool-webSearchTool"))
            return {
              status: `Searching internet...!`,
            };
        }
        if (part.type === "finish") {
          const totalTokens = part.totalUsage.totalTokens?.toString();

          return {
            status: "",
            totalTokens: totalTokens,
            rateLimit: {
              remainingRequests: responseHeaders?.get(
                "x-ratelimit-remaining-requests",
              ),
              remainingTokens: responseHeaders?.get(
                "x-ratelimit-remaining-tokens",
              ),
              limitRequests: responseHeaders?.get("x-ratelimit-limit-requests"),
              limitTokens: responseHeaders?.get("x-ratelimit-limit-tokens"),
              resetRequests: responseHeaders?.get("x-ratelimit-reset-requests"),
              resetTokens: responseHeaders?.get("x-ratelimit-reset-tokens"),
            },
          };
        }
      },
    });
  } catch (err) {

    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error(JSON.stringify(err));
  }
}
