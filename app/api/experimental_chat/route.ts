import { requestWeatherAPI } from "@/app/helpers/tool_helpers";
import { TReasoningEffort } from "@/app/types/type";
import { groq } from "@ai-sdk/groq";
import { convertToModelMessages, streamText, tool, UIMessage } from "ai";
import { z } from "zod";


export async function POST(req: Request) {
  const {
    messages,
  }: {
    messages: UIMessage[];
  } = await req.json();
  const modelMessages = await convertToModelMessages(messages);
  const result = streamText({
    model: groq("openai/gpt-oss-20b"),
    messages: modelMessages,
    system: `You are a helpful assistant. use tool if user ask only. `,
    tools: allTools,
  });

  return result.toUIMessageStreamResponse();
}

// const weatherTool = createTool({
//   description: "weather for user given location",
//   inputSchema: z.object({
//     location: z.string().describe(""),
//   }),
//   // needsApproval: true,

//   execute: async function ({ location }) {
//     // await new Promise((resolve) => setTimeout(resolve, 2000));
//     const result = await requestWeatherAPI(location);
//     return {
//       weather: result.condition.text,
//       temperature: result.temp_c,
//       location,
//       icon: result.condition.icon,
//       wind: result.wind_kph,
//     };
//   },
// });

const weatherTool = tool({
  description: "Get the weather in a location",
  inputSchema: z.object({
    city: z.string(),
  }),
  needsApproval: true,
  execute: async ({ city }) => {
    const weather = "Weather is sunny ";
    return weather;
  },
});
export const allTools = {
  weatherTool,
};
