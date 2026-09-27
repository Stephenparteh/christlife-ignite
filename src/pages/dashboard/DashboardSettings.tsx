import { useState } from "react";
import { Link } from "react-router-dom";
import { Settings as SettingsIcon } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { mockOrganizationSettings } from "@/data/dashboardMockData";

const DashboardSettings = () => {
  const [name, setName] = useState<string>(mockOrganizationSettings.name);
  const [tagline, setTagline] = useState<string>(mockOrganizationSettings.tagline);

  const handleSave = () => {
    toast.info("Preview only — nothing was saved.", {
      description: "This form isn't connected to a database yet.",
    });
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

        <div className="mt-6 flex justify-end">
          <Button onClick={handleSave}>Save changes</Button>
        </div>
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
