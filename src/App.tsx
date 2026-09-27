import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import About from "./pages/About";
import Events from "./pages/Events";
import BibleStudy from "./pages/BibleStudy";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import GetInvolved from "./pages/GetInvolved";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import Seo from "./components/Seo";
import Login from "./pages/Login";
import { AuthProvider } from "@/auth/AuthProvider";
import RequireAuth from "@/auth/RequireAuth";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardOverview from "./pages/dashboard/DashboardOverview";
import DashboardEvents from "./pages/dashboard/DashboardEvents";
import DashboardBibleStudy from "./pages/dashboard/DashboardBibleStudy";
import DashboardGallery from "./pages/dashboard/DashboardGallery";
import DashboardTestimonials from "./pages/dashboard/DashboardTestimonials";
import DashboardContact from "./pages/dashboard/DashboardContact";
import DashboardSettings from "./pages/dashboard/DashboardSettings";

const queryClient = new QueryClient();

/** Public site chrome (Navigation + Footer). The admin dashboard has its
 * own layout (src/components/dashboard/DashboardLayout.tsx) and does not
 * use this. */
const PublicLayout = () => (
  <div className="min-h-screen flex flex-col">
    <Seo />
    <Navigation />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/events" element={<Events />} />
              <Route path="/bible-study" element={<BibleStudy />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/get-involved" element={<GetInvolved />} />
              {/* ADD ALL CUSTOM PUBLIC ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Admin sign-in — its own minimal layout, no public chrome. */}
            <Route path="/login" element={<Login />} />

            {/*
              Admin dashboard — Milestone 2 adds real route protection.
              RequireAuth blocks the UI on the frontend; the backend's
              requireAuth middleware is the actual security boundary for
              the data itself (see server/src/middleware/auth.ts).
            */}
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <DashboardLayout />
                </RequireAuth>
              }
            >
              <Route index element={<DashboardOverview />} />
              <Route path="events" element={<DashboardEvents />} />
              <Route path="bible-study" element={<DashboardBibleStudy />} />
              <Route path="gallery" element={<DashboardGallery />} />
              <Route path="testimonials" element={<DashboardTestimonials />} />
              <Route path="contact" element={<DashboardContact />} />
              <Route path="settings" element={<DashboardSettings />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
