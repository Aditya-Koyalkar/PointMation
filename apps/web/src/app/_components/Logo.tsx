// components/Logo.tsx

import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";

interface LogoProps {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
}

export function Logo({ className, iconClassName, textClassName }: LogoProps) {
  return (
    <div onClick={() => redirect("/")} className={cn("flex items-center gap-2 cursor-pointer", className)}>
      <MessageCircle fill="#fffff" className={cn("h-6 w-6 text-primary", iconClassName)} />
      <span className={cn("text-xl font-bold tracking-tight text-primary", textClassName)}>Pointmation</span>
    </div>
  );
}
