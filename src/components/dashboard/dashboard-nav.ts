import {
  LayoutDashboard,
  CalendarDays,
  BookOpen,
  Images,
  MessageSquareQuote,
  Mail,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface DashboardNavItem {
  title: string;
  /** Short line shown under the H1 on the page itself (PageHeader). */
  description: string;
  /** Relative to /dashboard. "" means the index route. */
  path: string;
  icon: LucideIcon;
}

export const DASHBOARD_ROOT = "/dashboard";

export const dashboardNavItems: DashboardNavItem[] = [
  {
    title: "Overview",
    description: "A quick look at your Christ Life website content.",
    path: "",
    icon: LayoutDashboard,
  },
  {
    title: "Events",
    description: "Manage the events shown on the public Events page.",
    path: "events",
    icon: CalendarDays,
  },
  {
    title: "Bible Study",
    description: "Manage the weekly Bible study schedule and meeting links.",
    path: "bible-study",
    icon: BookOpen,
  },
  {
    title: "Gallery",
    description: "Manage the photos and videos shown on the public Gallery page.",
    path: "gallery",
    icon: Images,
  },
  {
    title: "Testimonials",
    description: "Manage the testimonials shown on the homepage.",
    path: "testimonials",
    icon: MessageSquareQuote,
  },
  {
    title: "Contact",
    description: "Manage the official contact and social details shown on the site.",
    path: "contact",
    icon: Mail,
  },
  {
    title: "Settings",
    description: "Organization identity and site-level settings.",
    path: "settings",
    icon: Settings,
  },
];

export const dashboardPath = (path: string) =>
  path ? `${DASHBOARD_ROOT}/${path}` : DASHBOARD_ROOT;

/** Exact match for the overview index route, prefix match for the rest. */
export const isDashboardNavItemActive = (pathname: string, item: DashboardNavItem) => {
  const target = dashboardPath(item.path);
  return item.path === "" ? pathname === target : pathname.startsWith(target);
};

export const findDashboardNavItem = (pathname: string) =>
  dashboardNavItems.find((item) => isDashboardNavItemActive(pathname, item));
