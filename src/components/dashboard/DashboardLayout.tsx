import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { findDashboardNavItem } from "@/components/dashboard/dashboard-nav";

/**
 * Layout for every /dashboard/* route. This is intentionally separate from
 * the public site's Navigation/Footer (see App.tsx) — the admin area is not
 * part of the public website's visual chrome, even though it reuses the
 * same design tokens and components.
 *
 * The admin area is not meant to be indexed by search engines; it manages
 * its own <title>/robots tag here rather than reusing the public SEO
 * pipeline from src/config/seo.ts, which is out of scope for this
 * milestone.
 */
const DashboardLayout = () => {
  const location = useLocation();
  const currentItem = findDashboardNavItem(location.pathname);

  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => {
      meta.remove();
    };
  }, []);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = currentItem
      ? `${currentItem.title} | Christ Life Admin`
      : "Christ Life Admin";
    return () => {
      document.title = previousTitle;
    };
  }, [currentItem]);

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <DashboardHeader />
        <div className="flex-1 p-4 md:p-8">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
