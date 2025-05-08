import { MessageType } from "../../../../../../types/chat";
import MessageItem from "./MessageItem";

type Props = {
  messages: MessageType[];
};

const Messages = ({ messages }: Props) => {
  return (
    <>
      {messages.map((message) => (
        <MessageItem message={message} />
      ))}
    </>
  );
};

export default Messages;
