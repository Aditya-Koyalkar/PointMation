"use client";
import { Logo } from "@/app/_components/Logo";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { ChevronUp, Loader2, Trash2, User2 } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { ChatType } from "../../../../types/chat";
import { usePathname, useRouter } from "next/navigation";
import { deleteChat } from "@/lib/actions/chat";
import { useState } from "react";

export const AppSidebar = ({ chats }: { chats: ChatType[] }) => {
  const { data, status } = useSession();
  const pathname = usePathname();
  const [loadingChatId, setLoadingChatId] = useState<string | null>(null);
  const router = useRouter();

  const handleDeleteChat = async (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation(); // Prevent the click from bubbling to the parent element

    try {
      setLoadingChatId(chatId);
      await deleteChat(chatId);

      if (pathname === `/chat/${chatId}`) {
        router.push("/chat");
      }
    } catch (error) {
      console.error("Failed to delete chat:", error);
    } finally {
      setLoadingChatId(null);
    }
  };
  return (
    <Sidebar className="w-64 h-screen border-r flex flex-col border-none">
      <SidebarContent className="flex-1 overflow-y-auto">
        <SidebarGroup>
          <SidebarGroupLabel>
            <Logo />
          </SidebarGroupLabel>
          <SidebarMenu className="space-y-1 px-2 py-5">
            <SidebarMenuButton className={buttonVariants()} onClick={() => router.push("/chat")}>
              New Chat
            </SidebarMenuButton>
            {chats.map((chat) => (
              <SidebarMenuItem
                key={chat.id}
                className={cn(
                  buttonVariants({
                    variant: "secondary",
                  }),
                  "text-start justify-start bg-input/0 group",
                  pathname === `/chat/${chat.id}` && "bg-accent"
                )}
                onClick={() => router.push(`/chat/${chat.id}`)}
              >
                <div className="flex justify-between w-full">
                  <div>{chat.name && chat.name.length > 20 ? chat.name.slice(0, 20) + "..." : chat.name}</div>
                  <Button
                    disabled={loadingChatId === chat.id}
                    onClick={(e) => handleDeleteChat(e, chat.id)}
                    className="w-5 h-5 opacity-SW transition-opacity"
                    variant={"ghost"}
                  >
                    {loadingChatId === chat.id ? <Loader2 className="animate-spin" /> : <Trash2 className="w-5 h-5" />}
                  </Button>
                </div>
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
