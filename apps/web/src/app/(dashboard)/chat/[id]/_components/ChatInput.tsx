"use client";

import ChatInput from "@/app/_components/PromptBox";
import { createMessage, revalidateMessages } from "@/lib/actions/message";
import { useState } from "react";

const PromptBox = ({ chatId }: { chatId: string }) => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  async function handleCreateMessage() {
    setLoading(true);
    await createMessage(prompt, chatId);
    await revalidateMessages(chatId);
    setPrompt("");
    setLoading(false);
  }
  return <ChatInput loading={loading} onSubmit={handleCreateMessage} prompt={prompt} setPrompt={setPrompt} />;
};

export default PromptBox;
