"use client";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectLabel } from "@/components/ui/select";
import { ArrowUp, Loader2 } from "lucide-react";
type ChatInputProps = {
  onSubmit: () => void;
  prompt: string;
  setPrompt: (prompt: string) => void;
  loading: boolean;
};
export default function ChatInput({ onSubmit, prompt, setPrompt, loading }: ChatInputProps) {
  return (
    <div className="w-full p-4 rounded-xl shadow-md flex flex-col gap-3">
      <Textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        autoFocus
        placeholder="Type your message here..."
        className="bg-transparent text-white border border-gray-600"
      />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Select>
            <SelectTrigger className="w-fit border-none px-3 py-1 rounded-md text-sm">
              <SelectValue placeholder="Gemini 2.5 Flash" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Model</SelectLabel>
                <SelectItem value="gemini-2.5">Gemini 2.5 Flash</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={() => onSubmit()} className=" p-2 rounded-md" disabled={prompt.trim().length < 2 || loading}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowUp className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
