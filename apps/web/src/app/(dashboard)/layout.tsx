import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/Sidebar";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
        </div>
        <main className="p-4 bg-input/50 h-full w-full">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
