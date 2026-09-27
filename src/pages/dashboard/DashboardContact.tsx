import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import PageHeader from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApiClientError } from "@/lib/apiClient";
import { settingsService } from "@/services/settings";

const QUERY_KEY = ["settings", "dashboard"];

const errorMessage = (error: unknown) =>
  error instanceof ApiClientError ? error.message : "Something went wrong. Please try again.";

const DashboardContact = () => {
  const queryClient = useQueryClient();
  const { data: settings, isLoading } = useQuery({ queryKey: QUERY_KEY, queryFn: settingsService.get });

  const [email, setEmail] = useState("");
  const [whatsappDisplay, setWhatsappDisplay] = useState("");
  const [whatsappChannelUrl, setWhatsappChannelUrl] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  useEffect(() => {
    if (settings && !hasLoadedOnce) {
      setEmail(settings.email);
      setWhatsappDisplay(settings.whatsappDisplay);
      setWhatsappChannelUrl(settings.whatsappChannelUrl);
      setFacebookUrl(settings.facebookUrl);
      setHasLoadedOnce(true);
    }
  }, [settings, hasLoadedOnce]);

  const updateMutation = useMutation({
    mutationFn: settingsService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["settings", "public"] });
      toast.success("Contact information saved.");
    },
    onError: (error) => toast.error(errorMessage(error)),
  });

  const handleSave = () => {
    updateMutation.mutate({ email, whatsappDisplay, whatsappChannelUrl, facebookUrl });
  };

  return (
    <div>
      <PageHeader
        title="Contact"
        description="Manage the official contact and social details shown on the site's Contact page and footer."
      />

      <section className="max-w-2xl rounded-lg border border-border p-5">
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : (
          <div className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="contact-email">Email</Label>
              <Input
                id="contact-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="contact-phone">Phone / WhatsApp number</Label>
              <Input
                id="contact-phone"
                value={whatsappDisplay}
                onChange={(e) => setWhatsappDisplay(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="contact-whatsapp-url">WhatsApp group link</Label>
              <Input
                id="contact-whatsapp-url"
                value={whatsappChannelUrl}
                onChange={(e) => setWhatsappChannelUrl(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="contact-facebook">Facebook page link</Label>
              <Input
                id="contact-facebook"
                value={facebookUrl}
                onChange={(e) => setFacebookUrl(e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <Button onClick={handleSave} disabled={isLoading || updateMutation.isPending}>
            {updateMutation.isPending ? "Saving…" : "Save changes"}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default DashboardContact;
