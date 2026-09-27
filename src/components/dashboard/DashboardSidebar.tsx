import { Link, useLocation } from "react-router-dom";
import { Home } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  dashboardNavItems,
  dashboardPath,
  isDashboardNavItemActive,
} from "@/components/dashboard/dashboard-nav";
import Logo from "@/assets/logo.jpeg";

const DashboardSidebar = () => {
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link
          to="/dashboard"
          className="flex items-center gap-3 px-2 py-1.5"
        >
          <img
            src={Logo}
            alt=""
            className="h-9 w-9 shrink-0 rounded-full object-cover"
          />
          <div className="flex min-w-0 flex-col group-data-[collapsible=icon]:hidden">
            <span className="truncate font-heading text-sm font-bold text-foreground">
              Christ Life
            </span>
            <span className="truncate text-xs text-muted-foreground">
              Admin Dashboard
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Manage</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {dashboardNavItems.map((item) => {
                const active = isDashboardNavItemActive(location.pathname, item);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      tooltip={item.title}
                    >
                      <Link
                        to={dashboardPath(item.path)}
                        aria-current={active ? "page" : undefined}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Back to website">
              <Link to="/">
                <Home />
                <span>Back to website</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
};

export default DashboardSidebar;
