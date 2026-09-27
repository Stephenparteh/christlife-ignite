import { useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, LogOut, Settings, UserCircle } from "lucide-react";
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

/**
 * The account menu below is a structural placeholder only — there is no
 * signed-in administrator yet. Milestone 2 (authentication) replaces the
 * generic icon + "Administrator" label with the real signed-in user, and
 * wires up "Sign out".
 */
const DashboardHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentItem = findDashboardNavItem(location.pathname);

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
                <UserCircle className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <span className="hidden text-foreground sm:inline">Administrator</span>
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
              Signed in as Administrator
              <br />
              (placeholder — no account system yet)
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/dashboard/settings")}>
              <Settings className="mr-2 h-4 w-4" />
              Account settings
            </DropdownMenuItem>
            <DropdownMenuItem disabled title="Available once authentication is added">
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;
