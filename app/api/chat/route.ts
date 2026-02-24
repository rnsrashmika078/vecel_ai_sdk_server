import { streamText, UIMessage, convertToModelMessages, stepCountIs } from "ai";
import { groq } from "@ai-sdk/groq";
import { tools } from "@/app/helpers/tools";
export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const result = streamText({
      model: groq("openai/gpt-oss-20b"),
      // model: groq("llama-3.3-70b-versatile"),
      system: `You are a helpful assistant. use tool if user ask only`,
      tools,
      messages: await convertToModelMessages(messages),
      stopWhen: stepCountIs(5),
    });

    return result.toUIMessageStreamResponse();
  } catch (err) {
    console.log(err);
  }
}
