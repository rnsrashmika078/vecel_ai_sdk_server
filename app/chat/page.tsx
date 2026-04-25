import { redirect } from "next/navigation";
import { generateId } from "ai";

const page = () => {
  const id = generateId();
  redirect(`/chat/${id}`);
};

export default page;
