import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "@/modules/dashboard/ui/Sidebar";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <SidebarProvider defaultOpen>
      <Sidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
};

export default layout;
