"use client";
import ChatInput from "@/app/_components/PromptBox";
import { createChat } from "@/lib/actions/chat";
import { createMessage } from "@/lib/actions/message";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const prompts = ["Create a Animation of a cylinder rotating.", "Create a animation of a Circle rotating."];

const MainChatPage = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  async function handleCreateChatwithMessage() {
    setLoading(true);
    const chat = await createChat(prompt);
    if (!chat) {
      setLoading(false);
      toast("Error while creating chat");
      return;
    }
    await createMessage(prompt, chat.id);
    setLoading(false);
    redirect(`/chat/${chat.id}`);
  }
  return (
    <>
      <div className="flex-1 flex flex-col items-center mt-10">
        <h1 className="text-3xl font-semibold mb-6">How can I help you?</h1>
        <div className="w-full max-w-xl gap-3 flex flex-col">
          {prompts.map((text, idx) => (
            <div key={idx} className="w-full bg-muted p-2 rounded-xl cursor-pointer hover:bg-input" onClick={() => setPrompt(text)}>
              {text}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <ChatInput loading={loading} prompt={prompt} setPrompt={setPrompt} onSubmit={handleCreateChatwithMessage} />
      </div>
    </>
  );
};

export default MainChatPage;
