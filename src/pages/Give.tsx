import { HandHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import PublicContentState from "@/components/PublicContentState";
import GivingMethodEntry from "@/components/giving/GivingMethodEntry";
import GivingRequestForm from "@/components/giving/GivingRequestForm";
import { useGivingMethods } from "@/hooks/useGivingMethods";
import { siteConfig } from "@/config/site";

const scrollToRequest = () => {
  const target = document.getElementById("giving-request");
  if (!target) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  // Move focus so keyboard / screen-reader users land in the form too.
  target.focus({ preventScroll: true });
};

const Give = () => {
  const { data, isLoading, isError } = useGivingMethods();
  const methods = data?.items ?? [];
  const requestOptions = data?.requestOptions ?? [];

  return (
    <div className="bg-background">
      {/* Introduction + methods */}
      <section className="py-16 md:py-24 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-primary">Give</p>
                <h1 className="font-heading text-4xl font-bold leading-[1.1] text-foreground md:text-5xl lg:text-6xl">
                  Give in a way that works for you.
                </h1>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
                  Your generosity helps support the work of Christ Life and the mission of sharing Christ. Choose the
                  giving method that is most convenient for you.
                </p>
                <p className="mt-8 border-t border-border pt-5 text-sm italic text-muted-foreground">
                  {siteConfig.tagline}
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              {isLoading ? (
                <PublicContentState variant="loading" title="Loading giving methods…" />
              ) : isError ? (
                <PublicContentState
                  variant="error"
                  icon={HandHeart}
                  title="We couldn't load the giving methods"
                  description="Something went wrong reaching the server. Please refresh the page or try again shortly."
                />
              ) : methods.length === 0 ? (
                <PublicContentState
                  variant="empty"
                  icon={HandHeart}
                  title="Giving details are coming soon"
                  description="We're finalizing how you can give. Please check back shortly, or reach out through our Contact page."
                />
              ) : (
                <ol className="border-b border-border">
                  {methods.map((method, index) => (
                    <GivingMethodEntry key={method.id} method={method} index={index} />
                  ))}
                </ol>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-y border-border bg-muted/30 py-16 md:py-20">
        <div className="container mx-auto flex flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-end md:justify-between lg:px-8">
          <div className="max-w-2xl">
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              Want help completing your gift?
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
              Share a few details about your intended contribution, and our team will get in touch to help you with
              the next steps.
            </p>
          </div>
          <Button size="lg" className="shrink-0 px-8" onClick={scrollToRequest}>
            Start a Giving Request
          </Button>
        </div>
      </section>

      {/* Request form */}
      <section id="giving-request" tabIndex={-1} className="scroll-mt-24 py-16 outline-none md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-primary">Giving request</p>
              <h2 className="font-heading text-3xl font-bold leading-tight text-foreground md:text-4xl">
                Let's take the next step.
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
                Share a few details about your intended contribution. Our team will contact you with the information
                you need to complete your gift.
              </p>
            </div>
            <div className="lg:col-span-7">
              <GivingRequestForm options={requestOptions} methodsLoading={isLoading} methodsError={isError} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Give;
