import { MessageType } from "../../../../../../types/chat";
import MessageItem from "./MessageItem";

type Props = {
  messages: MessageType[];
};

const Messages = ({ messages }: Props) => {
  return (
    <div>
      {messages.map((message) => (
        <MessageItem message={message} />
      ))}
    </div>
  );
};

export default Messages;
