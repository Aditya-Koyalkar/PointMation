// components/Logo.tsx

import { cn } from "@/lib/utils";
import Link from "next/link";

interface LogoProps {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
}

export function Logo({ className, iconClassName, textClassName }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 cursor-pointer hover:opacity-80 transition-all", className)}>
      <LogoIcon />
      <span className={cn("text-lg font-semibold tracking-tight text-white", textClassName)}>Pointmation</span>
    </Link>
  );
}

export const LogoIcon = () => {
  return (
    <svg width="36" height="36" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
      <circle cx="120" cy="120" r="110" fill="#1F1F1F" />

      <circle cx="120" cy="120" r="90" fill="none" stroke="#3ECF8E" strokeWidth="4" strokeDasharray="16,8" />

      <rect x="85" y="80" width="70" height="15" rx="3" fill="#3ECF8E" />
      <rect x="85" y="100" width="50" height="5" rx="2" fill="#3ECF8E" />
      <rect x="85" y="110" width="40" height="5" rx="2" fill="#3ECF8E" />

      <path d="M120 130 L145 150 L120 170 L95 150 Z" fill="none" stroke="#3ECF8E" strokeWidth="4" />

      <path d="M120 120 L120 130" stroke="#3ECF8E" strokeWidth="4" strokeLinecap="round" />
      <path d="M115 125 L120 130 L125 125" stroke="#3ECF8E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

      <path
        d="M85 150 Q95 140, 105 150 Q115 160, 125 150 Q135 140, 145 150 Q155 160, 165 150"
        fill="none"
        stroke="#3ECF8E"
        strokeWidth="3"
        strokeLinecap="round"
      />

      <circle cx="120" cy="120" r="105" fill="none" stroke="#3ECF8E" strokeWidth="1" strokeOpacity="0.3" />
    </svg>
  );
};
