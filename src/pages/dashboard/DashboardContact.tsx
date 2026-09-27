import { useState } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { mockContactInfo } from "@/data/dashboardMockData";

const DashboardContact = () => {
  const [email, setEmail] = useState<string>(mockContactInfo.email);
  const [whatsappDisplay, setWhatsappDisplay] = useState<string>(mockContactInfo.whatsappDisplay);
  const [whatsappChannelUrl, setWhatsappChannelUrl] = useState<string>(mockContactInfo.whatsappChannelUrl);
  const [facebookUrl, setFacebookUrl] = useState<string>(mockContactInfo.facebookUrl);

  const handleSave = () => {
    toast.info("Preview only — nothing was saved.", {
      description: "This form isn't connected to a database yet.",
    });
  };

  return (
    <div>
      <PageHeader
        title="Contact"
        description="Manage the official contact and social details shown on the site's Contact page and footer."
      />

      <section className="max-w-2xl rounded-lg border border-border p-5">
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
            <Label htmlFor="contact-whatsapp-url">WhatsApp channel link</Label>
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

        <div className="mt-6 flex justify-end">
          <Button onClick={handleSave}>Save changes</Button>
        </div>
      </section>
    </div>
  );
};

export default DashboardContact;
