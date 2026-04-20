import { z } from "zod";
import { tool as createTool } from "ai";
import { createFile } from "./file_operation";
import { groq } from "../libs/groqClient";
import { storeEmbeddings } from "../actions/store";
import { retriveEmbeddings } from "../actions/retrive";
import { requestWeatherAPI } from "./tool_helpers";

export const weatherTool = createTool({
  description: "weather for user given location",
  inputSchema: z.object({
    location: z.string().describe(""),
  }),
  execute: async function ({ location }) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const result = await requestWeatherAPI(location);
    return {
      weather: result.condition.text,
      temperature: result.temp_c,
      location,
      icon: result.condition.icon,
      wind: result.wind_kph,
    };
  },
});

// create a file ( just for testing )
export const createFileTool = createTool({
  description: "create a file",
  inputSchema: z.object({
    name: z.string().describe("name with extension"),
    content: z.string().describe("file content"),
  }),
  execute: async ({ name, content }) => {
    await createFile(name, content);
    return { name };
  },
});
export const createChartTool = createTool({
  description: "display chart about user given topic.dont generate any image",
  inputSchema: z.object({
    data: z.array(z.any()).describe("chat data"),
    type: z.union([z.literal("pie"), z.literal("line")]),
    xKey: z.string().describe("X axis key"),
    yKey: z.string().describe("Y axis key"),
  }),
  execute: async ({ data, type, xKey, yKey }) => {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return { data, type, xKey, yKey };
  },
});
export const imageRecognitionTool = createTool({
  description: "ask questions related to the image url",
  inputSchema: z.object({
    url: z.string().describe("user given image url"),
  }),
  execute: async ({ url }) => {
    const groqResult = await groq.chat.completions.create({
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      stream: false,
      max_completion_tokens: 50,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Describe this image in short" },
            { type: "image_url", image_url: { url } },
          ],
        },
      ],
    });

    return groqResult.choices[0].message.content;
  },
});
export const webSearchTool = createTool({
  description: "web search tool",
  inputSchema: z.object({
    user_prompt: z.string().describe("prompt"),
  }),
  execute: async ({ user_prompt }) => {
    const groqResult = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: user_prompt,
        },
      ],
      model: "groq/compound-mini",
      temperature: 1,
      max_completion_tokens: 50,
      top_p: 1,
      stream: false,
      stop: null,
      compound_custom: {
        tools: {
          enabled_tools: ["web_search", "visit_website"],
        },
      },
    });

    return `Web search result: ${groqResult.choices[0].message.content}`;
  },
});
export const ragTool = createTool({
  description:
    "provide answer based only on pdf content.dont use webSearch tool at all",
  inputSchema: z.object({
    url: z.string(),
    input: z.string(),
  }),
  execute: async ({ url, input }) => {
    const result_of_store = await storeEmbeddings({ url });
    const result_of_retrive = await retriveEmbeddings({ input });
    return result_of_retrive;
  },
});

export const tools = {
  weatherTool,
  createFileTool,
  createChartTool,
  imageRecognitionTool,
  webSearchTool,
  ragTool,
};
