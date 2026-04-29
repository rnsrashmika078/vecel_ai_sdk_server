import { UIMessage } from "ai";
import z from "zod";

export type ChatAreaType = {
  id: string;
  role: "user" | "assistant";
  message: string;
};
export type TFileType = {
  public_id?: string;
  name?: string;
  url: string;
  format: string;
};

export type TGalleryItem = {
  asset_folder: string;
  asset_id: string;
  bytes: number;
  created_at: Date;
  display_name: string;
  format: string;
  height: number;
  public_id: string;
  resource_type: string;
  secure_url: string;
  type: string;
  url: string;
  version: number;
  width: number;
};

export type TMessageMetadata = {
  totalTokens?: string;
  remainTokens?: string;
  remainRequests?: string;
  status: string;
  start?: number;
  end?: number;
  reasoning_status?: string;
  rateLimit?: any;
};
export type TMyUIMessage = UIMessage<TMessageMetadata>;

//settings
export type TReasoningEffort = {
  effort?: "low" | "medium" | "high" | "none";
  contextWindow?: 500 | 1000 | 2000 | 5000;
  model:
    // | "llama-3.1-8b-instant"
    // | "meta-llama/llama-4-scout-17b-16e-instruct"
    | "openai/gpt-oss-20b";
};

export type TChatsList = {
  id?: string;
  title: string;
  chat_id: string;
};

export type TSettings = {
  agentSettings: Record<string, string>;
};
