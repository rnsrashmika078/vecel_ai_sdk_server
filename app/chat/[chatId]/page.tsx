import { getMessages } from "@/app/utils/supabase/server_actions";
import ChatInterface from "@/components/custom/chat_interface";
import { Metadata } from "next";
type Props = {
  params: Promise<{ chatId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).chatId;

  return {
    title: `Chat ${id}`,
  };
}

const page = async ({ params }: Props) => {
  const id = (await params).chatId;
  const messages = await getMessages({ id, table: "messages" });

  return <ChatInterface chatId={id} initialMessages={messages} />;
};

export default page;
