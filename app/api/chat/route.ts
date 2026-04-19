/* eslint-disable @typescript-eslint/no-explicit-any */
import { streamText, UIMessage, convertToModelMessages, stepCountIs } from "ai";
import { groq } from "@ai-sdk/groq";
import { tools } from "@/app/helpers/tools";

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();
    let meta: any = null;
    const result = streamText({
      model: groq("openai/gpt-oss-20b"),
      // model: groq("llama-3.3-70b-versatile"),
      system: `You are a helpful assistant. use tool if user ask only`,
      tools,
      timeout: 60000,
      temperature: 0,
      toolChoice: "auto",
      messages: await convertToModelMessages(messages),
      stopWhen: stepCountIs(2),
      onFinish: (e) => {
        meta = {
          usage: e.totalUsage,
          remainingTokens:
            e.response?.headers?.["x-ratelimit-remaining-tokens"],
          remainingRequests:
            e.response?.headers?.["x-ratelimit-remaining-requests"],
        };

        console.log("META:", meta);
      },
    });

    // const response = await result.response;
    // console.log(`result : ${JSON.stringify(response)}`);
    // const stream = result.toUIMessageStreamResponse();

    // return new Response(stream.body, {
    //   headers: {
    //     "x-meta": JSON.stringify(meta),
    //   },
    // });

    return result.toUIMessageStreamResponse();
  } catch (err) {
    console.log(err);
  }
}
