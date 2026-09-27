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
import { Switch } from "@/components/ui/switch";
import { ApiClientError } from "@/lib/apiClient";
import { bibleStudyService } from "@/services/bibleStudy";
import type { BibleStudySession } from "@/types/cms";

const QUERY_KEY = ["bible-study", "dashboard"];

const errorMessage = (error: unknown) =>
  error instanceof ApiClientError ? error.message : "Something went wrong. Please try again.";

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

  const [editingSession, setEditingSession] = useState<{ index: number; session: BibleStudySession } | null>(null);
  const [isSessionDialogOpen, setIsSessionDialogOpen] = useState(false);
  const [deletingSessionIndex, setDeletingSessionIndex] = useState<number | null>(null);
  const [sessionDay, setSessionDay] = useState("");
  const [sessionTitle, setSessionTitle] = useState("");

  const invalidate = () => queryClient.invalidateQueries({ queryKey: QUERY_KEY });

  const updateMutation = useMutation({
    mutationFn: bibleStudyService.update,
    onSuccess: () => invalidate(),
    onError: (error) => toast.error(errorMessage(error)),
  });

  const sessions = bibleStudy?.sessions ?? [];

  const openAddSession = () => {
    setEditingSession(null);
    setSessionDay("");
    setSessionTitle("");
    setIsSessionDialogOpen(true);
  };

  const openEditSession = (index: number, session: BibleStudySession) => {
    setEditingSession({ index, session });
    setSessionDay(session.day);
    setSessionTitle(session.title);
    setIsSessionDialogOpen(true);
  };

  const handleSaveSession = async () => {
    const nextSessions = [...sessions];
    const newSession: BibleStudySession = { day: sessionDay, title: sessionTitle };
    if (editingSession) {
      nextSessions[editingSession.index] = newSession;
    } else {
      nextSessions.push(newSession);
    }
    await updateMutation.mutateAsync({ sessions: nextSessions });
    toast.success(editingSession ? "Session updated." : "Session added.");
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
              The days and sessions listed on the Bible Study and Home pages.
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
            {sessions.map((session, index) => (
              <li key={`${session.day}-${index}`} className="flex items-center justify-between gap-4 p-4">
                <div>
                  <p className="font-medium text-foreground">{session.day}</p>
                  <p className="text-sm text-muted-foreground">{session.title}</p>
                </div>
                <ActionMenu
                  label={`${session.day} session`}
                  onEdit={() => openEditSession(index, session)}
                  onDelete={() => setDeletingSessionIndex(index)}
                />
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-8 rounded-lg border border-border p-5">
        <h2 className="font-heading text-base font-semibold text-foreground">
          Meeting Information
        </h2>
        <p className="mb-5 text-sm text-muted-foreground">
          Applies to every session above unless a session needs its own link.
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
        title={editingSession ? "Edit Session" : "Add Session"}
        saveLabel={editingSession ? "Save changes" : "Add session"}
        onSave={handleSaveSession}
      >
        <div className="space-y-1.5">
          <Label htmlFor="session-day">Day</Label>
          <Input
            id="session-day"
            value={sessionDay}
            onChange={(e) => setSessionDay(e.target.value)}
            placeholder="e.g. Wednesday"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="session-title">Session name</Label>
          <Input
            id="session-title"
            value={sessionTitle}
            onChange={(e) => setSessionTitle(e.target.value)}
            placeholder="e.g. Youth Bible Study"
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
