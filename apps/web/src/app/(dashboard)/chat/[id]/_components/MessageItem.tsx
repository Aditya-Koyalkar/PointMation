import { MessageType } from "../../../../../../types/chat";

type Props = {
  message: MessageType;
};

const MessageItem = ({ message }: Props) => {
  return (
    <>
      {message.role == "user" ? "User" : "Ai"}
      {/* {message.role == "ai" ? (message.codeLoading ? "Loading" : message.codeOutput) : message.prompt} */}
      {message.videoUrl}
    </>
  );
};

export default MessageItem;
