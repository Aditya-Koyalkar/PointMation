"use client";
import { useEffect, useRef } from "react";
import { MessageType } from "../../../../../../types/chat";
import MessageItem from "./MessageItem";
import useWebsocket from "@/hooks/use-websocket";
import { useSession } from "next-auth/react";
import { revalidateMessages } from "@/lib/actions/message";

type Props = {
  messages: MessageType[];
};

const Messages = ({ messages }: Props) => {
  const { data } = useSession();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  useWebsocket(() => {
    revalidateMessages();
  }, data?.user.id);
  return (
    <>
      {messages.map((message) => (
        <MessageItem message={message} />
      ))}
      <div ref={messagesEndRef}></div>
    </>
  );
};

export default Messages;
