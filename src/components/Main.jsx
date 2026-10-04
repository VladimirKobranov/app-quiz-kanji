import NavBar from "@/components/NavBar";
import ContentField from "@/components/ContentField";
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar";

function Main() {
  return (
    <SidebarProvider
      className="h-screen overflow-hidden"
      style={{ "--sidebar-width": "300px", "--sidebar-width-icon": "3rem" }}
    >
      <Sidebar collapsible="icon">
        <div className="h-full min-w-[300px] overflow-hidden group-data-[collapsible=icon]:hidden">
          <NavBar />
        </div>
        <div className="hidden h-full flex-col items-center justify-start gap-2 pt-6 text-2xl font-semibold text-sidebar-foreground group-data-[collapsible=icon]:flex">
          <span>漢</span>
          <span>字</span>
          <div className="mt-auto flex flex-col items-center gap-1 pb-4 text-[10px] font-light uppercase text-sidebar-foreground/50">
            <span>vk</span>
            <span>2026</span>
          </div>
        </div>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <ContentField />
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Main;
