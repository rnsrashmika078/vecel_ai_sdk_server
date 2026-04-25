/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChatStatus, UIDataTypes, UIMessagePart, UITools } from "ai";
import Chart from "./ai-components/chart";
import GenFile from "./ai-components/generated_file";
import { Weather } from "./ai-components/weather";
import { useDashboardContext } from "@/app/api/context/dashboard_context";

export const ToolRenderer = ({
  part,
  status,
}: {
  status: ChatStatus;
  part: UIMessagePart<UIDataTypes, UITools>;
}) => {
  const { setChats } = useDashboardContext();

  switch (part.type) {
    case "tool-weatherTool":
      // if (part.state === "input-available") {
      //   return <Spinner text="Requesting Weather API...!" />;
      // }
      if (part.state === "output-available") {
        //@ts-expect-error: ts error can ignore with -D
        return <Weather {...part.output} />;
      }
    // case "tool-chatTitle":
    //   if (part.state === "output-available") {
    //     console.log(`output avaiable: ${part.state}`);
    //     console.log(`output avaiable: ${part.output}`);
    //     setChats((prev) => [...prev, part.output as string]);
    //     return;
    //   }
    // return <div>Error: {part.errorText}</div>;

    case "tool-createFileTool":
      // if (part.state === "input-available") {
      //   return <Spinner text="Generating File...!" />;
      // }
      if (part.state === "output-available") {
        //@ts-expect-error: ts error can ignore with -D
        return <GenFile {...part.output} />;
      }
      return;
    // return <div>Error: {part.errorText}</div>;
    case "tool-ragTool":
      // if (part.state === "input-available") {
      //   return <Spinner text="Reading a file...!" />;
      // }
      return;

    case "tool-imageRecognitionTool":
      return;

    // if (part.state === "input-available") {
    //   return <Spinner text="Analyzing image...!" />;
    // }
    case "tool-webSearchTool":
      return;

    // if (part.state === "input-available") {
    //   return <Spinner text="Searching internet!" />;
    // }

    case "tool-createChartTool":
      // if (part.state === "input-available") {
      //   return <Spinner text="Generating Charts data...!" />;
      // }
      if (part.state === "output-available") {
        if (status === "ready") {
          //@ts-expect-error: ts error can ignore with -D
          return <Chart data={part.output} />;
        }
        // else {
        //   return <Spinner text="Refreshing...." />;
        // }
      }
      return;

    // return <div>Error: {part.errorText}</div>;

    default:
      return null;
  }
};
