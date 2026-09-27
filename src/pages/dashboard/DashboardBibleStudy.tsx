import { useState } from "react";
import { Plus } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import ActionMenu from "@/components/dashboard/ActionMenu";
import ConfirmDialog from "@/components/dashboard/ConfirmDialog";
import DevActionDialog from "@/components/dashboard/DevActionDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  mockBibleStudySessions,
  mockBibleStudyInfo,
  type BibleStudySession,
} from "@/data/dashboardMockData";

const DashboardBibleStudy = () => {
  const [sessions] = useState<BibleStudySession[]>(mockBibleStudySessions);
  const [time, setTime] = useState<string>(mockBibleStudyInfo.time);
  const [platform, setPlatform] = useState<string>(mockBibleStudyInfo.platform);
  const [meetUrl, setMeetUrl] = useState<string>(mockBibleStudyInfo.meetUrl);
  const [whatsappUrl, setWhatsappUrl] = useState<string>(mockBibleStudyInfo.whatsappUrl);
  const [visible, setVisible] = useState(mockBibleStudyInfo.status === "published");

  const [editingSession, setEditingSession] = useState<BibleStudySession | null>(null);
  const [isSessionDialogOpen, setIsSessionDialogOpen] = useState(false);
  const [deletingSession, setDeletingSession] = useState<BibleStudySession | null>(null);

  const openAddSession = () => {
    setEditingSession(null);
    setIsSessionDialogOpen(true);
  };

  const handleSaveInfo = () => {
    toast.info("Preview only — nothing was saved.", {
      description: "This form isn't connected to a database yet.",
    });
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
          <Button size="sm" onClick={openAddSession}>
            <Plus className="h-4 w-4" />
            Add Session
          </Button>
        </div>

        <ul className="divide-y divide-border">
          {sessions.map((session) => (
            <li key={session.id} className="flex items-center justify-between gap-4 p-4">
              <div className="min-w-0">
                <p className="truncate font-medium text-foreground">{session.day}</p>
                <p className="truncate text-sm text-muted-foreground">{session.title}</p>
              </div>
              <ActionMenu
                label={`${session.day} session`}
                onEdit={() => {
                  setEditingSession(session);
                  setIsSessionDialogOpen(true);
                }}
                onDelete={() => setDeletingSession(session)}
              />
            </li>
          ))}
        </ul>
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
          <Button onClick={handleSaveInfo}>Save changes</Button>
        </div>
      </section>

      <DevActionDialog
        open={isSessionDialogOpen}
        onOpenChange={setIsSessionDialogOpen}
        title={editingSession ? "Edit Session" : "Add Session"}
        saveLabel={editingSession ? "Save changes" : "Add session"}
      >
        <div className="space-y-1.5">
          <Label htmlFor="session-day">Day</Label>
          <Input id="session-day" defaultValue={editingSession?.day} placeholder="e.g. Wednesday" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="session-title">Session name</Label>
          <Input id="session-title" defaultValue={editingSession?.title} placeholder="e.g. Youth Bible Study" />
        </div>
      </DevActionDialog>

      <ConfirmDialog
        open={!!deletingSession}
        onOpenChange={(open) => !open && setDeletingSession(null)}
        title="Remove this session?"
        description={`"${deletingSession?.day} — ${deletingSession?.title}" will be removed from the schedule.`}
      />
    </div>
  );
};

export default DashboardBibleStudy;
