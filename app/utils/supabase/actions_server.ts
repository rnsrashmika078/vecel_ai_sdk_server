import { cookies } from "next/headers";
import { createClient } from "./server";
export const getMessages = async ({
  table = "testTable",
  id,
}: {
  table: string;
  id: string;
}) => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: initialMessages } = await supabase
    .from(table)
    .select("messages")
    .eq("chat_id", id);

  if (initialMessages && initialMessages.length > 0) {
    return initialMessages[0].messages;
  }
  return [];
};
