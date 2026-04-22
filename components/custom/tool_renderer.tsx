/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChatStatus, UIDataTypes, UIMessagePart, UITools } from "ai";
import Chart from "./ai-components/chart";
import GenFile from "./ai-components/generated_file";
import { Weather } from "./ai-components/weather";
import Spinner from "./spinner";

export const ToolRenderer = ({
  part,
  status,
}: {
  status: ChatStatus;
  part: UIMessagePart<UIDataTypes, UITools>;
}) => {
  switch (part.type) {
    case "tool-displayWeather":
      // if (part.state === "input-available") {
      //   return <Spinner text="Requesting Weather API...!" />;
      // }
      if (part.state === "output-available") {
        //@ts-expect-error: ts error can ignore with -D
        return <Weather {...part.output} />;
      }
    // return <div>Error: {part.errorText}</div>;

    case "tool-createFileTool":
      // if (part.state === "input-available") {
      //   return <Spinner text="Generating File...!" />;
      // }
      if (part.state === "output-available") {
        //@ts-expect-error: ts error can ignore with -D
        return <GenFile {...part.output} />;
      }
    // return <div>Error: {part.errorText}</div>;
    case "tool-ragTool":
      // if (part.state === "input-available") {
      //   return <Spinner text="Reading a file...!" />;
      // }
    case "tool-imageRecognitionTool":
      // if (part.state === "input-available") {
      //   return <Spinner text="Analyzing image...!" />;
      // }
    case "tool-webSearchTool":
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
    // return <div>Error: {part.errorText}</div>;

    default:
      return null;
  }
};
