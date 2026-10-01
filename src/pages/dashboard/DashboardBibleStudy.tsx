import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import ActionMenu from "@/components/dashboard/ActionMenu";
import ConfirmDialog from "@/components/dashboard/ConfirmDialog";
import FormDialog from "@/components/dashboard/FormDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ApiClientError } from "@/lib/apiClient";
import { bibleStudyService } from "@/services/bibleStudy";
import type { BibleStudySession } from "@/types/cms";

const QUERY_KEY = ["bible-study", "dashboard"];

const errorMessage = (error: unknown) =>
  error instanceof ApiClientError ? error.message : "Something went wrong. Please try again.";

interface SessionFormState {
  day: string;
  title: string;
  time: string;
  platform: string;
  meetUrl: string;
  whatsappUrl: string;
  description: string;
}

const emptySessionForm: SessionFormState = {
  day: "",
  title: "",
  time: "",
  platform: "",
  meetUrl: "",
  whatsappUrl: "",
  description: "",
};

const DashboardBibleStudy = () => {
  const queryClient = useQueryClient();
  const { data: bibleStudy, isLoading } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: bibleStudyService.get,
  });

  const [time, setTime] = useState("");
  const [platform, setPlatform] = useState("");
  const [meetUrl, setMeetUrl] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [visible, setVisible] = useState(true);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  // Sync local editable copies once the singleton loads — after that, the
  // fields are user-controlled, so an in-flight refetch never clobbers
  // what the admin is mid-typing.
  useEffect(() => {
    if (bibleStudy && !hasLoadedOnce) {
      setTime(bibleStudy.time);
      setPlatform(bibleStudy.platform);
      setMeetUrl(bibleStudy.meetUrl);
      setWhatsappUrl(bibleStudy.whatsappUrl);
      setVisible(bibleStudy.published);
      setHasLoadedOnce(true);
    }
  }, [bibleStudy, hasLoadedOnce]);

  const [editingSessionIndex, setEditingSessionIndex] = useState<number | null>(null);
  const [isSessionDialogOpen, setIsSessionDialogOpen] = useState(false);
  const [deletingSessionIndex, setDeletingSessionIndex] = useState<number | null>(null);
  const [sessionForm, setSessionForm] = useState<SessionFormState>(emptySessionForm);

  const invalidate = () => queryClient.invalidateQueries({ queryKey: QUERY_KEY });

  const updateMutation = useMutation({
    mutationFn: bibleStudyService.update,
    onSuccess: () => invalidate(),
    onError: (error) => toast.error(errorMessage(error)),
  });

  const sessions = bibleStudy?.sessions ?? [];

  const openAddSession = () => {
    setEditingSessionIndex(null);
    // Pre-fill from the shared defaults — most sessions use them as-is,
    // and it's obvious what to change for one that doesn't.
    setSessionForm({ ...emptySessionForm, time, platform, meetUrl, whatsappUrl });
    setIsSessionDialogOpen(true);
  };

  const openEditSession = (index: number, session: BibleStudySession) => {
    setEditingSessionIndex(index);
    setSessionForm({
      day: session.day,
      title: session.title,
      time: session.time,
      platform: session.platform,
      meetUrl: session.meetUrl,
      whatsappUrl: session.whatsappUrl,
      description: session.description,
    });
    setIsSessionDialogOpen(true);
  };

  const handleSaveSession = async () => {
    const nextSessions = [...sessions];
    if (editingSessionIndex !== null) {
      nextSessions[editingSessionIndex] = sessionForm;
    } else {
      nextSessions.push(sessionForm);
    }
    await updateMutation.mutateAsync({ sessions: nextSessions });
    toast.success(editingSessionIndex !== null ? "Session updated." : "Session added.");
  };

  const handleDeleteSession = async () => {
    if (deletingSessionIndex === null) return;
    const nextSessions = sessions.filter((_, i) => i !== deletingSessionIndex);
    await updateMutation.mutateAsync({ sessions: nextSessions });
    toast.success("Session removed.");
  };

  const handleSaveInfo = async () => {
    await updateMutation.mutateAsync({ time, platform, meetUrl, whatsappUrl, published: visible });
    toast.success("Bible Study info saved.");
  };

  return (
    <div>
      <PageHeader
        title="Bible Study"
        description="Manage the weekly Bible study schedule and meeting links shown on the public site."
      />

      <section className="rounded-lg border border-border">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4">
          <div>
            <h2 className="font-heading text-base font-semibold text-foreground">Schedule</h2>
            <p className="text-sm text-muted-foreground">
              Each session can use the shared meeting info below, or its own — handy for a session on a
              different day, time, or platform.
            </p>
          </div>
          <Button size="sm" onClick={openAddSession} disabled={isLoading}>
            <Plus className="h-4 w-4" />
            Add Session
          </Button>
        </div>

        {isLoading ? (
          <p className="p-4 text-sm text-muted-foreground">Loading…</p>
        ) : sessions.length === 0 ? (
          <p className="p-4 text-sm text-muted-foreground">No sessions yet — add the first one above.</p>
        ) : (
          <ul className="divide-y divide-border">
            {sessions.map((session, index) => {
              const usesOwnInfo = Boolean(session.time || session.platform || session.meetUrl || session.whatsappUrl);
              return (
                <li key={`${session.day}-${index}`} className="flex items-center justify-between gap-4 p-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium text-foreground">{session.day}</p>
                      {usesOwnInfo && (
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                          Own meeting info
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{session.title}</p>
                    {usesOwnInfo && (
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {[session.time, session.platform].filter(Boolean).join(" · ")}
                      </p>
                    )}
                  </div>
                  <ActionMenu
                    label={`${session.day} session`}
                    onEdit={() => openEditSession(index, session)}
                    onDelete={() => setDeletingSessionIndex(index)}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section className="mt-8 rounded-lg border border-border p-5">
        <h2 className="font-heading text-base font-semibold text-foreground">
          Shared Meeting Information
        </h2>
        <p className="mb-5 text-sm text-muted-foreground">
          The default for every session above, unless that session sets its own.
        </p>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="bs-time">Time</Label>
            <Input id="bs-time" value={time} onChange={(e) => setTime(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="bs-platform">Platform</Label>
            <Input id="bs-platform" value={platform} onChange={(e) => setPlatform(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="bs-meet">Google Meet link</Label>
            <Input id="bs-meet" value={meetUrl} onChange={(e) => setMeetUrl(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="bs-whatsapp">WhatsApp link</Label>
            <Input id="bs-whatsapp" value={whatsappUrl} onChange={(e) => setWhatsappUrl(e.target.value)} />
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-4 rounded-md border border-border p-4">
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground">Visible on public site</p>
            <p className="text-sm text-muted-foreground">
              Turn off to temporarily hide the Bible Study page's schedule.
            </p>
          </div>
          <Switch checked={visible} onCheckedChange={setVisible} aria-label="Visible on public site" />
        </div>

        <div className="mt-5 flex justify-end">
          <Button onClick={handleSaveInfo} disabled={updateMutation.isPending}>
            {updateMutation.isPending ? "Saving…" : "Save changes"}
          </Button>
        </div>
      </section>

      <FormDialog
        open={isSessionDialogOpen}
        onOpenChange={setIsSessionDialogOpen}
        title={editingSessionIndex !== null ? "Edit Session" : "Add Session"}
        description="Leave the meeting fields as-is to use the shared info above, or change any of them just for this session."
        saveLabel={editingSessionIndex !== null ? "Save changes" : "Add session"}
        onSave={handleSaveSession}
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="session-day">Day</Label>
            <Input
              id="session-day"
              value={sessionForm.day}
              onChange={(e) => setSessionForm({ ...sessionForm, day: e.target.value })}
              placeholder="e.g. Wednesday"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="session-title">Session name</Label>
            <Input
              id="session-title"
              value={sessionForm.title}
              onChange={(e) => setSessionForm({ ...sessionForm, title: e.target.value })}
              placeholder="e.g. Youth Bible Study"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="session-time">Time</Label>
            <Input
              id="session-time"
              value={sessionForm.time}
              onChange={(e) => setSessionForm({ ...sessionForm, time: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="session-platform">Platform</Label>
            <Input
              id="session-platform"
              value={sessionForm.platform}
              onChange={(e) => setSessionForm({ ...sessionForm, platform: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="session-meet">Google Meet link</Label>
          <Input
            id="session-meet"
            value={sessionForm.meetUrl}
            onChange={(e) => setSessionForm({ ...sessionForm, meetUrl: e.target.value })}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="session-whatsapp">WhatsApp link</Label>
          <Input
            id="session-whatsapp"
            value={sessionForm.whatsappUrl}
            onChange={(e) => setSessionForm({ ...sessionForm, whatsappUrl: e.target.value })}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="session-description">Description (optional)</Label>
          <Textarea
            id="session-description"
            value={sessionForm.description}
            onChange={(e) => setSessionForm({ ...sessionForm, description: e.target.value })}
            placeholder="Anything specific to this session"
          />
        </div>
      </FormDialog>

      <ConfirmDialog
        open={deletingSessionIndex !== null}
        onOpenChange={(open) => !open && setDeletingSessionIndex(null)}
        title="Remove this session?"
        description={
          deletingSessionIndex !== null
            ? `"${sessions[deletingSessionIndex]?.day} — ${sessions[deletingSessionIndex]?.title}" will be removed from the schedule.`
            : ""
        }
        confirmLabel="Remove"
        onConfirm={handleDeleteSession}
      />
    </div>
  );
};

export default DashboardBibleStudy;
