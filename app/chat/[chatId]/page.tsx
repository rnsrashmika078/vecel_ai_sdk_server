import { getMessages } from "@/app/utils/supabase/server_actions";
import ChatInterface from "@/components/custom/chat_interface";

const page = async ({ params }: { params: Promise<{ chatId: string }> }) => {
  const id = (await params).chatId;
  const messages = await getMessages({ id, table: "messages" });

  return <ChatInterface chatId={id} initialMessages={messages} />;
};

export default page;
