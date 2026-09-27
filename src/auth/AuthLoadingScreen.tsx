import Logo from "@/assets/logo.jpeg";

/**
 * Shown while we're still asking the API whether a session exists, so a
 * protected page never flashes its real content (or the login form, if
 * already signed in) before that answer comes back.
 */
const AuthLoadingScreen = () => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background">
    <img src={Logo} alt="" className="h-12 w-12 rounded-full object-cover" />
    <div
      className="h-6 w-6 animate-spin rounded-full border-2 border-primary/30 border-t-primary"
      role="status"
      aria-label="Checking your session"
    />
  </div>
);

export default AuthLoadingScreen;
