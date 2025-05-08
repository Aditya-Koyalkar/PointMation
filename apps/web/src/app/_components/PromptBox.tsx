import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectLabel } from "@/components/ui/select";
import { ArrowUp } from "lucide-react";

export default function ChatInput() {
  return (
    <div className="w-full p-4 rounded-xl shadow-md flex flex-col gap-3">
      <Textarea autoFocus placeholder="Type your message here..." className="bg-transparent text-white border border-gray-600 " />
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
          <Button className=" p-2 rounded-md">
            <ArrowUp className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
