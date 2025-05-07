"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Logo } from "./Logo";

export default function Navbar() {
  const isMobile = useIsMobile();
  const { status } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full    dark:bg-input/30 dark:border-input ">
      <div className="container flex h-16 items-center justify-between px-2">
        <Logo />
        <div className="flex gap-3 items-center">
          {status == "authenticated" ? (
            <>
              <Button
                size={"sm"}
                onClick={() => {
                  redirect("/chat");
                }}
              >
                Dashboard
              </Button>
              <Button onClick={() => signOut()} variant={"secondary"} size={"sm"}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button size={"default"} onClick={() => redirect("/auth/login")}>
                Login
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
