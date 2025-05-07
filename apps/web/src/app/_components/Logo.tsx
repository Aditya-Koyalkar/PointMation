// components/Logo.tsx

import { Bot } from "lucide-react"; // swap this icon if you prefer another
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";

interface LogoProps {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
}

export function Logo({ className, iconClassName, textClassName }: LogoProps) {
  return (
    <div onClick={() => redirect("/")} className={cn("flex items-center gap-2 cursor-pointer hover:opacity-80 transition-all", className)}>
      <Bot className={cn("h-6 w-6 text-primary drop-shadow-md", iconClassName)} strokeWidth={2} />
      <span className={cn("text-lg font-semibold tracking-tight text-white", textClassName)}>Pointmation</span>
    </div>
  );
}
