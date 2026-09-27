import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, LogOut, Settings } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { findDashboardNavItem } from "@/components/dashboard/dashboard-nav";
import { useAuth } from "@/auth/AuthProvider";

const initialOf = (name: string) => name.trim().charAt(0).toUpperCase() || "?";

const DashboardHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentItem = findDashboardNavItem(location.pathname);
  const { user, logout } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await logout();
    } finally {
      // Always leave the dashboard, even if the logout request itself
      // failed (e.g. offline) — local auth state is cleared either way.
      navigate("/login", { replace: true });
    }
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/75 md:px-6">
      <SidebarTrigger />
      <Separator orientation="vertical" className="h-5" />

      <p className="min-w-0 truncate text-sm text-muted-foreground">
        Dashboard
        {currentItem && currentItem.path !== "" && (
          <>
            <span className="mx-1.5 text-border">/</span>
            <span className="text-foreground">{currentItem.title}</span>
          </>
        )}
      </p>

      <div className="ml-auto flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 text-sm outline-none ring-offset-background transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring">
            <Avatar className="h-7 w-7">
              <AvatarFallback className="bg-primary/10 text-primary">
                {initialOf(user?.name ?? "")}
              </AvatarFallback>
            </Avatar>
            <span className="hidden text-foreground sm:inline">{user?.name ?? "Administrator"}</span>
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
              Signed in as
              <br />
              <span className="text-foreground">{user?.email}</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/dashboard/settings")}>
              <Settings className="mr-2 h-4 w-4" />
              Account settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut} disabled={isSigningOut}>
              <LogOut className="mr-2 h-4 w-4" />
              {isSigningOut ? "Signing out…" : "Sign out"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;
