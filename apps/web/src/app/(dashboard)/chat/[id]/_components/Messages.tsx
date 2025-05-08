"use client";
import { useEffect, useRef } from "react";
import { MessageType } from "../../../../../../types/chat";
import MessageItem from "./MessageItem";

type Props = {
  messages: MessageType[];
};

const Messages = ({ messages }: Props) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
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
