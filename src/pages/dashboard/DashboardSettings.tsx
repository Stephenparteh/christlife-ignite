import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Settings as SettingsIcon } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApiClientError } from "@/lib/apiClient";
import { settingsService } from "@/services/settings";
import ChangePasswordForm from "@/components/dashboard/ChangePasswordForm";

const QUERY_KEY = ["settings", "dashboard"];

const errorMessage = (error: unknown) =>
  error instanceof ApiClientError ? error.message : "Something went wrong. Please try again.";

const DashboardSettings = () => {
  const queryClient = useQueryClient();
  const { data: settings, isLoading } = useQuery({ queryKey: QUERY_KEY, queryFn: settingsService.get });

  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  useEffect(() => {
    if (settings && !hasLoadedOnce) {
      setName(settings.organizationName);
      setTagline(settings.tagline);
      setHasLoadedOnce(true);
    }
  }, [settings, hasLoadedOnce]);

  const updateMutation = useMutation({
    mutationFn: settingsService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["settings", "public"] });
      toast.success("Settings saved.");
    },
    onError: (error) => toast.error(errorMessage(error)),
  });

  const handleSave = () => {
    updateMutation.mutate({ organizationName: name, tagline });
  };

  return (
    <div>
      <PageHeader
        title="Settings"
        description="Organization identity and site-level settings."
      />

      <section className="max-w-2xl rounded-lg border border-border p-5">
        <h2 className="font-heading text-base font-semibold text-foreground">Organization</h2>
        <p className="mb-5 text-sm text-muted-foreground">
          Shown in the site header, footer, and page titles.
        </p>

        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : (
          <div className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="org-name">Organization name</Label>
              <Input id="org-name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="org-tagline">Tagline</Label>
              <Input id="org-tagline" value={tagline} onChange={(e) => setTagline(e.target.value)} />
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <Button onClick={handleSave} disabled={isLoading || updateMutation.isPending}>
            {updateMutation.isPending ? "Saving…" : "Save changes"}
          </Button>
        </div>
      </section>

      <section className="mt-6 max-w-2xl rounded-lg border border-border p-5">
        <h2 className="font-heading text-base font-semibold text-foreground">Security</h2>
        <p className="mb-5 text-sm text-muted-foreground">
          Change the password you use to sign in to this dashboard.
        </p>
        <h3 className="mb-4 text-sm font-medium text-foreground">Change Password</h3>
        <ChangePasswordForm />
      </section>

      <div className="mt-6 flex items-start gap-3 rounded-lg border border-dashed border-border p-5 text-sm text-muted-foreground">
        <SettingsIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <p className="min-w-0">
          Contact and social links are managed on the{" "}
          <Link to="/dashboard/contact" className="text-primary underline underline-offset-4">
            Contact
          </Link>{" "}
          page. More site-level settings will appear here as they're needed.
        </p>
      </div>
    </div>
  );
};

export default DashboardSettings;
