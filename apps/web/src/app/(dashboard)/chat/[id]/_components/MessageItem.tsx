"use client";

import { MessageType } from "../../../../../../types/chat";
import { Button } from "@/components/ui/button";
import { Copy, Loader2, User2 } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
  message: MessageType;
};

const MessageItem = ({ message }: Props) => {
  const handleCopy = () => {
    if (message.codeOutput) {
      navigator.clipboard.writeText(message.codeOutput);
      toast("Copied!", {
        position: "bottom-right",
        description: "code copied to clipboard",
      });
    }
  };

  return (
    <div className="my-6 mx-2">
      {/* User Message */}
      {message.role === "user" && (
        <div className="justify-self-end bg-secondary p-2 rounded-xl">
          <div className="flex gap-2 items-center">
            {message.prompt}
            <Button variant={"ghost"} size={"icon"}>
              <User2 className="text-primary" />
            </Button>
          </div>
        </div>
      )}

      {/* AI Response */}
      {message.role === "ai" && (
        <div className="justify-self-start">
          <div>
            {message.codeLoading ? (
              <div className="flex flex-col gap-10 pt-3 max-w-2xl">
                <Skeleton className="w-full h-[30px] rounded-full" />
                <Skeleton className="w-full h-[30px] rounded-full" />
                <Skeleton className="w-full h-[30px] rounded-full" />
              </div>
            ) : (
              <div className="max-w-4xl">
                <div className="flex justify-end">
                  <Button onClick={handleCopy} size={"icon"} disabled={message.codeLoading}>
                    <Copy />
                  </Button>
                </div>
                <SyntaxHighlighter
                  customStyle={{
                    maxHeight: "350px",
                    overflowX: "auto",
                    overflowY: "auto",
                    borderRadius: "8px",
                    backgroundColor: "",
                    width: "100%",
                  }}
                  language="python"
                  style={atomDark}
                >
                  {message.codeOutput!}
                </SyntaxHighlighter>
              </div>
            )}
          </div>
          <div className="w-4xl">
            {message.videoLoading ? (
              <div className="flex flex-col items-center gap-2 pt-10">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Generating animation...</p>
              </div>
            ) : message.error ? (
              <div className="flex flex-col items-center gap-2 pt-10">
                <div className="w-1/2 text-center border-1 border-red-400 p-2 rounded-md text-red-500">Error Generating animation</div>
              </div>
            ) : (
              message.videoUrl && <video className="w-full" src={message.videoUrl!} controls />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageItem;
