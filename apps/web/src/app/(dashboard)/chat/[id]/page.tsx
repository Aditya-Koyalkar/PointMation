import { getAllMessages } from "@/lib/actions/message";
import Messages from "./_components/Messages";

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
      <div className="flex-1">
        <Messages messages={messages} />
      </div>
      <div className="flex justify-center"></div>
    </div>
  );
}
