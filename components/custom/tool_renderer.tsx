/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChatAddToolApproveResponseFunction,
  ChatStatus,
  UIDataTypes,
  UIMessagePart,
  UITools,
} from "ai";
import Chart from "./ai-components/chart";
import GenFile from "./ai-components/generated_file";
import { Weather } from "./ai-components/weather";
import { useDashboardContext } from "@/app/api/context/dashboard_context";
import { memo } from "react";
import { TAddToOutput } from "@/app/types/type";
import { ApprovalUI_Simple } from "./ai-components/approval";

export const ToolRenderer = memo(
  ({
    part,
    status,
    addToolApprovalResponse,
  }: {
    status: ChatStatus;
    addToolApprovalResponse: ChatAddToolApproveResponseFunction;
    part: UIMessagePart<UIDataTypes, UITools>;
  }) => {
    switch (part.type) {
      case "tool-weatherTool":
        if (part.state === "output-available") {
          //@ts-expect-error: ts error can ignore with -D
          return <Weather {...part.output} />;
        }
        if (part.state === "output-error") {
          return (
            <div className="p-4 bg-red-100 text-red-800 rounded">
              Failed to fetch weather data. Please try again.
            </div>
          );
        }
        if (part.state === "approval-requested") {
          if (part.state === "approval-requested") {
            const input = part.input as { location?: string };
            return (
              <ApprovalUI_Simple
                title="Weather Data Approval"
                subTitle={`Do you want to proceed with the weather data for ${input.location}?`}
                onApprove={() =>
                  addToolApprovalResponse({
                    id: part.approval.id,
                    approved: true,
                  })
                }
                onDeny={() =>
                  addToolApprovalResponse({
                    id: part.approval.id,
                    approved: false,
                  })
                }
              />
            );
          }
        }
        return;

      case "tool-createFileTool":
        if (part.state === "output-available") {
          //@ts-expect-error: ts error can ignore with -D
          return <GenFile {...part.output} />;
        }
        if (part.state === "output-error") {
          return (
            <div className="p-4 bg-red-100 text-red-800 rounded">
              Failed to fetch weather data. Please try again.
            </div>
          );
        }
        return;
      case "tool-ragTool":
        return;

      case "tool-imageRecognitionTool":
        if (part.state === "output-error") {
          return (
            <div className="p-4 bg-red-100 text-red-800 rounded">
              Failed to analyze the image. Please try again
            </div>
          );
        }
        return;

      case "tool-webSearchTool":
        if (part.state === "output-error") {
          return (
            <div className="p-4 bg-red-100 text-red-800 rounded">
              Failed to execute web search. Please try again
            </div>
          );
        }
        if (part.state === "approval-requested") {
          return (
            <ApprovalUI_Simple
              title="Web Search Approval"
              subTitle="Want me to use web search for a better answer?"
              onApprove={() =>
                addToolApprovalResponse({
                  id: part.approval.id,
                  approved: true,
                })
              }
              onDeny={() =>
                addToolApprovalResponse({
                  id: part.approval.id,
                  approved: false,
                })
              }
            />
          );
        }
        return;
      case "tool-createChartTool":
        if (part.state === "output-error") {
          return (
            <div className="p-4 bg-red-100 text-red-800 rounded">
              Failed to execute create chart tool. Please try again
            </div>
          );
        }
        if (part.state === "output-available") {
          if (status === "ready") {
            //@ts-expect-error: ts error can ignore with -D
            return <Chart data={part.output} />;
          }
        }
        return;
      default:
        return null;
    }
  },
);
ToolRenderer.displayName = "ToolRenderer";
