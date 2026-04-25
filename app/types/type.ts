import { UIMessage } from "ai";
import z from "zod";

export type ChatAreaType = {
  id: string;
  role: "user" | "assistant";
  message: string;
};
export type FileType = {
  public_id?: string;
  name?: string;
  url: string;
  format: string;
};
export type RequestPayload = {
  prompt: string;
  url?: string;
};

export type GalleryItem = {
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

export type MessageMetadataT = {
  totalTokens?: string;
  remainTokens?: string;
  remainRequests?: string;
  status: string;
  reasoning?: string;
  start?: number;
  end?: number;
  reasoning_status?: string;
};
export type MyUIMessage = UIMessage<MessageMetadataT>;

//settings
export type ReasoningEffort = {
  effort: "low" | "medium" | "high" | "none";
};

export type ChatsListType = {
  id?: string;
  title: string;
  chat_id: string;
};
