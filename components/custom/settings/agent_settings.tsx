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
import React, { memo } from "react";

const AgentSettings = memo(() => {
  const { setReasoningEffort, reasoningEffort } = useDashboardContext();
  const text = reasoningEffort.effort;
  const formatted = text[0].toUpperCase() + text.slice(1);
  return (
    <div className="flex items-center justify-between px-2">
      <span>Reasoning Effort</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{formatted}</Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Reasoning effort</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => setReasoningEffort({ effort: "none" })}
            >
              None
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setReasoningEffort({ effort: "low" })}
            >
              Low
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setReasoningEffort({ effort: "medium" })}
            >
              Medium
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setReasoningEffort({ effort: "high" })}
            >
              High
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
});
AgentSettings.displayName = "AgentSettings";

export default AgentSettings;
