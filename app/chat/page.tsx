import ChatInterface from "@/components/custom/chat_interface";
import { redirect } from "next/navigation";

const page = () => {
  redirect(`/chat/welcome`);
};

export default page;
