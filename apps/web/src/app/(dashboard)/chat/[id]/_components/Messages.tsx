"use client";
import { useEffect, useRef } from "react";
import { MessageType } from "../../../../../../types/chat";
import MessageItem from "./MessageItem";
import useWebsocket from "@/hooks/use-websocket";
import { useSession } from "next-auth/react";
import { revalidateMessages } from "@/lib/actions/message";

type Props = {
  messages: MessageType[];
  chatId: string;
};

const Messages = ({ messages, chatId }: Props) => {
  const { data } = useSession();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  useWebsocket(() => {
    revalidateMessages(chatId);
  }, data?.user.id);
  return (
    <div>
      {messages.map((message) => (
        <MessageItem message={message} />
      ))}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default Messages;
