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
        if (part.state === "approval-requested") {
          if (part.state === "approval-requested") {
            const input = part.input as { location?: string };
            return (
              <ApprovalUI_Simple
                location={input.location}
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

      case "tool-createFileTool":
        if (part.state === "output-available") {
          //@ts-expect-error: ts error can ignore with -D
          return <GenFile {...part.output} />;
        }
        return;
      case "tool-ragTool":
        return;

      case "tool-imageRecognitionTool":
        return;

      case "tool-webSearchTool":
        if (part.state === "approval-requested") {
          return (
            <div key={part?.toolCallId}>
              {/* <p>Get weather for {part?.input?.location}?</p> */}
              <button
                onClick={() =>
                  addToolApprovalResponse({
                    id: part?.approval.id,
                    approved: true,
                  })
                }
              >
                Approve
              </button>
              <button
                onClick={() =>
                  addToolApprovalResponse({
                    id: part?.approval.id,
                    approved: false,
                  })
                }
              >
                Deny
              </button>
            </div>
          );
        }
        return;
      case "tool-createChartTool":
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
