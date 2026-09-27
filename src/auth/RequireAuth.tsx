import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/auth/AuthProvider";
import AuthLoadingScreen from "@/auth/AuthLoadingScreen";

/**
 * Frontend half of route protection: gates dashboard UI on an authenticated
 * session. This is a UX convenience, not the real security boundary — the
 * backend's requireAuth middleware (server/src/middleware/auth.ts) is what
 * actually protects the data, since this check can't be trusted (anyone can
 * skip client-side JS). See DashboardLayout for where this is used.
 */
const RequireAuth = ({ children }: { children: ReactNode }) => {
  const { status } = useAuth();
  const location = useLocation();

  if (status === "loading") {
    return <AuthLoadingScreen />;
  }

  if (status === "unauthenticated") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
