import { tool } from "ai";
import { z } from "zod";

export const weatherTool = tool({
    description: "Get the weather in a location",
    inputSchema: z.object({
        location: z.string().describe("The location to get the weather for"),
    }),
    execute: async ({ location }) => {
        console.log("✅ TOOL CALLED with:", location);
        return { temperature: 72, conditions: `sunny for ${location}` };
    },
});
export const createFile = tool({
    description: "create a file in desktop",
    inputSchema: z.object({
        location: z
            .string()
            .describe(
                "<users desktop>/src/{better name for the file}.{extension of the file}"
            ),
    }),
    execute: async ({ location }) => {
        console.log("✅ TOOL CALLED with ( file create tool ):", location);
        return { location };
    },
});

