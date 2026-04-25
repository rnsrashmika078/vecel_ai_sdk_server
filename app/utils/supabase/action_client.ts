import { MessageMetadataT, MyUIMessage } from "@/app/types/type";
import { createClient } from "./client";

export const saveChatClient = async ({
  table = "messages",
  role = "user",
  metadata,
  id,
}: {
  table: string;
  role: "user" | "assistant";
  metadata?: MessageMetadataT;
  id: string;
}) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from(table)
    .insert({
      chat_id: id,
      metadata: metadata,
      role: role,
    })
    .select()
    .single();

  if (error) {
    console.log("Supabase error:", error.message);

    return;
  }
};
export const saveMessagePartClient = async ({
  table = "messages",
  role = "user",
  metadata,
  id,
}: {
  table: string;
  role: "user" | "assistant";
  metadata?: MessageMetadataT;
  id: string;
}) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from(table)
    .insert({
      chat_id: id,
      metadata: metadata,
      role: role,
    })
    .select()
    .single();

  if (error) {
    console.log("Supabase error:", error.message);

    return;
  }
};
export const snapshot = async ({
  messages,
  chatId,
}: {
  chatId: string;
  messages: MyUIMessage[];
}) => {
  const supabase = createClient();
  const { data, error } = await supabase.from("testTable").upsert(
    {
      messages,
      chat_id: chatId,
    },
    { onConflict: "chat_id" },
  );

  if (error) {
    console.log("Supabase error:", error.message);

    return;
  }
};
export const getChats = async ({ table = "chats" }: { table: string }) => {
  const supabase = createClient();
  const { data: allChats } = await supabase.from(table).select("*").select();

  if (allChats && allChats.length > 0) {
    return allChats;
  }
  return [];
};
