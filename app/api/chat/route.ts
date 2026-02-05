import { streamText, UIMessage, convertToModelMessages, tool } from "ai";
import { groq } from "@ai-sdk/groq";
import { createFile, weatherTool } from "@/app/helpers/tools";

export async function POST(req: Request) {
    const { messages }: { messages: UIMessage[] } = await req.json();

    console.log("messages", messages);
    const result = streamText({
        // model: groq("openai/gpt-oss-20b"),
        model: groq("llama-3.3-70b-versatile"),
        system: "When you call a tool, you MUST answer the user using the tool result.",
        tools: {
            weatherTool,
            createFile,
        },
        messages: await convertToModelMessages(messages),
    });
    console.log("result", result);

    return result.toUIMessageStreamResponse();
}
