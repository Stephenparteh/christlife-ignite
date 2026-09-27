import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { findDashboardNavItem } from "@/components/dashboard/dashboard-nav";
import { useNoIndex } from "@/hooks/useNoIndex";

/**
 * Layout for every /dashboard/* route. This is intentionally separate from
 * the public site's Navigation/Footer (see App.tsx) — the admin area is not
 * part of the public website's visual chrome, even though it reuses the
 * same design tokens and components.
 *
 * The admin area is not meant to be indexed by search engines (useNoIndex)
 * and manages its own <title> here, rather than reusing the public SEO
 * pipeline from src/config/seo.ts, which is out of scope for the dashboard.
 *
 * Route-level protection lives one level up, where this component is used
 * as the child of <RequireAuth> (see App.tsx) — by the time this renders,
 * an authenticated session has already been confirmed.
 */
const DashboardLayout = () => {
  const location = useLocation();
  const currentItem = findDashboardNavItem(location.pathname);

  useNoIndex();

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
