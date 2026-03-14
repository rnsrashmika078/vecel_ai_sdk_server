import { promise, z } from "zod";
import { tool as createTool } from "ai";
import { createFile } from "./file_operation";
import { groq } from "../libs/groqClient";

//request weather info ( just for testing )
export const weatherTool = createTool({
  description:
    "Display the weather for a location if user give location.otherwise return null",
  inputSchema: z.object({
    location: z.string().describe("The location to get the weather for"),
  }),
  execute: async function ({ location }) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return { weather: "Sunny", temperature: 75, location };
  },
});

//create a file ( just for testing )
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
  description: "display chart about user given topic",
  inputSchema: z.object({
    data: z.array(z.any()).describe("chat data"),
    xKey: z.string().describe("X axis key"),
    yKey: z.string().describe("Y axis key"),
  }),
  execute: async ({ data, xKey, yKey }) => {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return { data, xKey, yKey };
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
      max_completion_tokens: 500,
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
    user_prompt: z
      .string()
      .describe("prompt"),
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
      max_completion_tokens: 200,
      top_p: 1,
      stream: false,
      stop: null,
      compound_custom: {
        tools: {
          enabled_tools: ["web_search", "visit_website"],
        },
      },
    });

    return groqResult.choices[0].message.content;
  },
});
export const tools = {
  displayWeather: weatherTool,
  createFileTool,
  createChartTool,
  imageRecognitionTool,
  webSearchTool,
};
