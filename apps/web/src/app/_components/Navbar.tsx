"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Logo } from "./Logo";

export default function Navbar() {
  const { status } = useSession();

  return (
    <header className=" w-full    dark:bg-input/30 dark:border-input ">
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
              <Button size={"default"} onClick={() => redirect("/auth/signin")}>
                Login
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
