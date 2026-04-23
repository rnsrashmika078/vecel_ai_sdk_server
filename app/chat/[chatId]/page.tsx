import ChatInterface from "@/components/custom/chat_interface";

const page = async ({ params }: { params: Promise<{ chatId: string }> }) => {
  const id = (await params).chatId;
  return <ChatInterface chatId={id} />;
};

export default page;
