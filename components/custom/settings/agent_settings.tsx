import { useDashboardContext } from "@/app/api/context/dashboard_context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { memo, useEffect } from "react";

const AgentSettings = memo(() => {
  const { setTReasoningEffort, TReasoningEffort } = useDashboardContext();
  const text = TReasoningEffort.effort ?? "medium";
  const formatted = text[0].toUpperCase() + text.slice(1);

  return (
    <div className="flex w-full justify-between flex-col">
      <div className="w-full flex justify-between items-center p-2">
        <span>Reasoning Effort</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{formatted}</Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Reasoning effort</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  if (
                    typeof window === "undefined" ||
                    TReasoningEffort === null
                  )
                    return;

                  const settings = {
                    effort: "none",
                    contextWindow: TReasoningEffort.contextWindow,
                  };
                  localStorage.setItem("settings", JSON.stringify(settings));
                  setTReasoningEffort((prev) => ({
                    ...prev,
                    effort: "none",
                  }));
                }}
              >
                None
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  const settings = {
                    effort: "low",
                    contextWindow: TReasoningEffort.contextWindow,
                  };
                  localStorage.setItem("settings", JSON.stringify(settings));
                  setTReasoningEffort((prev) => ({
                    ...prev,
                    effort: "low",
                  }));
                }}
              >
                Low
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  const settings = {
                    effort: "medium",
                    contextWindow: TReasoningEffort.contextWindow,
                  };
                  localStorage.setItem("settings", JSON.stringify(settings));
                  setTReasoningEffort((prev) => ({
                    ...prev,
                    effort: "medium",
                  }));
                }}
              >
                Medium
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  const settings = {
                    effort: "high",
                    contextWindow: TReasoningEffort.contextWindow,
                  };
                  localStorage.setItem("settings", JSON.stringify(settings));
                  setTReasoningEffort((prev) => ({
                    ...prev,
                    effort: "high",
                  }));
                }}
              >
                High
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="w-full flex justify-between items-center p-2">
        <span>Context Window</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{TReasoningEffort.contextWindow}</Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Context Window</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  const settings = {
                    effort: TReasoningEffort.effort,
                    contextWindow: "500",
                  };
                  localStorage.setItem("settings", JSON.stringify(settings));
                  setTReasoningEffort((prev) => ({
                    ...prev,
                    contextWindow: 500,
                  }));
                }}
              >
                500
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  const settings = {
                    effort: TReasoningEffort.effort,
                    contextWindow: "1000",
                  };
                  localStorage.setItem("settings", JSON.stringify(settings));
                  setTReasoningEffort((prev) => ({
                    ...prev,
                    contextWindow: 1000,
                  }));
                }}
              >
                1K
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  const settings = {
                    effort: TReasoningEffort.effort,
                    contextWindow: "2000",
                  };
                  localStorage.setItem("settings", JSON.stringify(settings));
                  setTReasoningEffort((prev) => ({
                    ...prev,
                    contextWindow: 2000,
                  }));
                }}
              >
                2K
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  const settings = {
                    effort: TReasoningEffort.effort,
                    contextWindow: "5000",
                  };
                  localStorage.setItem("settings", JSON.stringify(settings));
                  setTReasoningEffort((prev) => ({
                    ...prev,
                    contextWindow: 5000,
                  }));
                }}
              >
                5K
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="w-full flex justify-between items-center p-2">
        <span>Model</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{TReasoningEffort.model}</Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Model</DropdownMenuLabel>
              {/* <DropdownMenuItem
                onClick={() => {
                  const settings = {
                    effort: TReasoningEffort.effort,
                    contextWindow: TReasoningEffort.contextWindow,
                    model: "meta-llama/llama-4-scout-17b-16e-instruct",
                  };
                  localStorage.setItem("settings", JSON.stringify(settings));
                  setTReasoningEffort((prev) => ({
                    ...prev,
                    model: "meta-llama/llama-4-scout-17b-16e-instruct",
                  }));
                }}
              >
                meta-llama/llama-4-scout-17b-16e-instruct
              </DropdownMenuItem> */}
              {/* <DropdownMenuItem
                onClick={() => {
                  const settings = {
                    effort: TReasoningEffort.effort,
                    contextWindow: TReasoningEffort.contextWindow,
                    model: "llama-3.1-8b-instant",
                  };
                  localStorage.setItem("settings", JSON.stringify(settings));
                  setTReasoningEffort((prev) => ({
                    ...prev,
                    model: "llama-3.1-8b-instant",
                  }));
                }}
              >
                llama-3.1-8b-instant
              </DropdownMenuItem> */}
              <DropdownMenuItem
                onClick={() => {
                  const settings = {
                    effort: TReasoningEffort.effort,
                    contextWindow: TReasoningEffort.contextWindow,
                    model: "openai/gpt-oss-20b",
                  };
                  localStorage.setItem("settings", JSON.stringify(settings));
                  setTReasoningEffort((prev) => ({
                    ...prev,
                    model: "openai/gpt-oss-20b",
                  }));
                }}
              >
                openai/gpt-oss-20b
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
});
AgentSettings.displayName = "AgentSettings";

export default AgentSettings;
