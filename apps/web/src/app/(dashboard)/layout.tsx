import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/Sidebar";
import { getUserChats } from "@/lib/actions/chat";
import { Toaster } from "@/components/ui/sonner";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";

type Props = {
  children: React.ReactNode;
};

export default async function Layout({ children }: Props) {
  const chats = await getUserChats();
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/signin");
  }
  return (
    <SidebarProvider>
      <AppSidebar chats={chats} />
      <SidebarInset>
        <div className="flex h-16 shrink-0 items-center gap-2 px-4 sticky top-0 bg-sidebar">
          <SidebarTrigger className="-ml-1" />
        </div>
        <main className="bg-input/50 h-full w-full">{children}</main>
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  );
}
