"use client";
import { Logo } from "@/app/_components/Logo";
import { buttonVariants } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ChevronUp, User2 } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { ChatType } from "../../../../types/chat";
import { redirect } from "next/navigation";

export const AppSidebar = ({ chats }: { chats: ChatType[] }) => {
  const { data, status } = useSession();

  return (
    <Sidebar className="w-64 h-screen bg-background border-r flex flex-col border-none">
      <SidebarContent className="flex-1 overflow-y-auto">
        <SidebarGroup>
          <SidebarGroupLabel>
            <Logo />
          </SidebarGroupLabel>
          <SidebarMenu className="space-y-1 px-2 py-5">
            <SidebarMenuButton className={buttonVariants()}>New Chat</SidebarMenuButton>
            {chats.map((chat) => (
              <SidebarMenuItem
                key={chat.id}
                className={cn(
                  buttonVariants({
                    variant: "secondary",
                  }),
                  "text-start justify-start bg-input/0"
                )}
                onClick={() => redirect(`/chat/${chat.id}`)}
              >
                {chat.name}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      {status == "authenticated" && (
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 /> {data.user.email}
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="top">
                  <DropdownMenuItem onClick={() => signOut()}>
                    <User2 />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>{" "}
        </SidebarFooter>
      )}
    </Sidebar>
  );
};
