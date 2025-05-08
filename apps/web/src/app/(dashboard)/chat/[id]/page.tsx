import { getAllMessages } from "@/lib/actions/message";
import Messages from "./_components/Messages";
import PromptBox from "./_components/ChatInput";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ChatPage({ params }: Props) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    redirect("/auth/signin");
  }
  const messages = await getAllMessages(id);
  if (!messages) {
    return "There was an error.";
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex-1 overflow-y-auto">
        <Messages messages={messages} chatId={id} />
      </div>
      <div className="sticky bottom-0 z-20 bg-muted">
        <PromptBox generating={messages.length > 0 && messages[messages.length - 1]?.videoLoading == true} chatId={id} />
      </div>
    </div>
  );
}
