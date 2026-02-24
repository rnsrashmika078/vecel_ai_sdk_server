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
