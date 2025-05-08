"use client";

import { MessageType } from "../../../../../../types/chat";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Loader2, User2 } from "lucide-react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

type Props = {
  message: MessageType;
};

const MessageItem = ({ message }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (message.codeOutput) {
      navigator.clipboard.writeText(message.codeOutput);
      setCopied(true);
      toast.success("Code copied to clipboard!");
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="mb-6">
      {/* User Message */}
      {message.role === "user" && (
        <div className="justify-self-end">
          <div className="flex gap-2 items-center">
            {message.prompt}
            <Button variant={"ghost"} size={"icon"}>
              <User2 />
            </Button>
          </div>
        </div>
      )}

      {/* AI Response */}
      {message.role === "ai" && (
        <div className="justify-self-start">
          <div className="bg-muted p-2 ">
            <div className="flex justify-end">
              <Button size={"icon"} disabled={message.codeLoading}>
                <Copy />
              </Button>
            </div>
            <pre className="min-w-xl min-h-52">
              <code>
                {message.codeLoading ? (
                  <div className="flex flex-col gap-10 pt-3">
                    <Skeleton className="w-full h-[30px] rounded-full" />
                    <Skeleton className="w-full h-[30px] rounded-full" />
                    <Skeleton className="w-full h-[30px] rounded-full" />
                  </div>
                ) : (
                  <>{message.codeOutput}</>
                )}
              </code>
            </pre>
          </div>
          <div className="min-w-xl">
            {message.videoLoading ? (
              <div className="flex flex-col items-center gap-2 pt-10">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Generating animation...</p>
              </div>
            ) : (
              message.videoUrl && <video src={message.videoUrl!} controls />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageItem;
