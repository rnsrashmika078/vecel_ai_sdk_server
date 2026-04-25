import { getMessages } from "@/app/utils/supabase/actions_server";
import ChatInterface from "@/components/custom/chat_interface";

const page = async ({ params }: { params: Promise<{ chatId: string }> }) => {
  const id = (await params).chatId;
  const messages = await getMessages({ id, table: "testTable" });

  return <ChatInterface chatId={id} initialMessages={messages} />;
};

export default page;
