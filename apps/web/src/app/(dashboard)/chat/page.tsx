import { getServerSession } from "next-auth";
import MainChatPage from "./_components/MainChatPage";
import { redirect } from "next/navigation";

export default async function ChatPage() {
  const session = await getServerSession();
  if (!session?.user.id) {
    redirect("/auth/signin");
  }
  return (
    <div className="flex flex-col w-full h-full">
      <MainChatPage />
    </div>
  );
}
