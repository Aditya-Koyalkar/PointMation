import { getAllMessages } from "@/lib/actions/message";
import Messages from "./_components/Messages";
import PromptBox from "./_components/ChatInput";
import useWebsocket from "@/hooks/use-websocket";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ChatPage({ params }: Props) {
  const { id } = await params;
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
