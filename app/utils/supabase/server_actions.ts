"use server";
import { MessageMetadataT, MyUIMessage } from "@/app/types/type";
import { createClient as c } from "./client";
import { createClient as s } from "./server";
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
  const supabase = c();
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
  const supabase = c();
  const { error } = await supabase
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
export const upsertMessage = async ({
  messages,
  chatId,
}: {
  chatId: string;
  messages: MyUIMessage[];
}) => {
  const supabase = c();
  const { error } = await supabase.from("messages").upsert(
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
  const supabase = c();
  const { data: allChats } = await supabase.from(table).select("*").select();

  if (allChats && allChats.length > 0) {
    return allChats;
  }
  return [];
};
import { cookies } from "next/headers";

export const getMessages = async ({
  table = "testTable",
  id,
}: {
  table: string;
  id: string;
}) => {
  const cookieStore = await cookies();
  const supabase = s(cookieStore);
  const { data: initialMessages } = await supabase
    .from(table)
    .select("messages")
    .eq("chat_id", id);

  if (initialMessages && initialMessages.length > 0) {
    return initialMessages[0].messages;
  }
  return [];
};
export const deleteChat = async ({
  table = "chats",
  chat_id,
}: {
  table: string;
  chat_id: string;
}) => {
  try {
    console.log(`delete chat get called with id: ${chat_id}`);
    const supabase = c();
    const { error } = await supabase
      .from(table)
      .delete()
      .eq("chat_id", chat_id);
    if (error) {
      console.log("Supabase error:", error.message);
      return;
    }
    return;
  } catch (e) {
    console.log(e);
  }
};
