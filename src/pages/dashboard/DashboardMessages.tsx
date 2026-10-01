import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { Inbox, Mail, MailOpen, Trash2 } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/dashboard/EmptyState";
import ConfirmDialog from "@/components/dashboard/ConfirmDialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ApiClientError } from "@/lib/apiClient";
import { contactMessagesService } from "@/services/contactMessages";
import type { ContactMessage } from "@/types/cms";

const QUERY_KEY = ["contact-messages", "dashboard"];

const errorMessage = (error: unknown) =>
  error instanceof ApiClientError ? error.message : "Something went wrong. Please try again.";

const DashboardMessages = () => {
  const queryClient = useQueryClient();
  const { data: messages, isLoading, isError } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: contactMessagesService.list,
  });

  const [openMessage, setOpenMessage] = useState<ContactMessage | null>(null);
  const [deletingMessage, setDeletingMessage] = useState<ContactMessage | null>(null);

  const invalidate = () => queryClient.invalidateQueries({ queryKey: QUERY_KEY });

  const setReadMutation = useMutation({
    mutationFn: ({ id, read }: { id: string; read: boolean }) => contactMessagesService.setRead(id, read),
    onSuccess: (updated) => {
      invalidate();
      setOpenMessage(updated);
    },
    onError: (error) => toast.error(errorMessage(error)),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => contactMessagesService.remove(id),
    onSuccess: () => {
      invalidate();
      toast.success("Message deleted.");
    },
    onError: (error) => toast.error(errorMessage(error)),
  });

  const openAndMarkRead = (message: ContactMessage) => {
    setOpenMessage(message);
    if (!message.read) {
      setReadMutation.mutate({ id: message._id, read: true });
    }
  };

  const unreadCount = messages?.filter((m) => !m.read).length ?? 0;

  return (
    <div>
      <PageHeader
        title="Messages"
        description="Messages submitted through the public Contact form."
      />

      {isLoading ? (
        <p className="py-10 text-center text-sm text-muted-foreground">Loading messages…</p>
      ) : isError ? (
        <EmptyState
          icon={Inbox}
          title="Couldn't load messages"
          description="Something went wrong talking to the server. Try refreshing the page."
        />
      ) : !messages || messages.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title="No messages yet"
          description="Messages submitted through the public Contact page will show up here."
        />
      ) : (
        <>
          {unreadCount > 0 && (
            <p className="mb-3 text-sm text-muted-foreground">
              {unreadCount} unread message{unreadCount === 1 ? "" : "s"}
            </p>
          )}
          <ul className="divide-y divide-border rounded-lg border border-border">
            {messages.map((message) => (
              <li key={message._id}>
                <button
                  type="button"
                  onClick={() => openAndMarkRead(message)}
                  className="flex w-full items-start gap-3 p-4 text-left hover:bg-muted/50"
                >
                  {message.read ? (
                    <MailOpen className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                  ) : (
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className={`truncate font-medium ${message.read ? "text-foreground" : "text-foreground font-semibold"}`}>
                        {message.name}
                      </p>
                      <span className="text-xs text-muted-foreground">{message.email}</span>
                    </div>
                    <p className="truncate text-sm text-muted-foreground">
                      {message.subject || message.message}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      <Dialog open={!!openMessage} onOpenChange={(open) => !open && setOpenMessage(null)}>
        <DialogContent>
          {openMessage && (
            <>
              <DialogHeader>
                <DialogTitle>{openMessage.subject || "Contact message"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 text-sm">
                <p>
                  <span className="text-muted-foreground">From: </span>
                  {openMessage.name} &lt;
                  <a href={`mailto:${openMessage.email}`} className="text-primary underline underline-offset-4">
                    {openMessage.email}
                  </a>
                  &gt;
                </p>
                <p className="text-muted-foreground">
                  {formatDistanceToNow(new Date(openMessage.createdAt), { addSuffix: true })}
                </p>
                <p className="whitespace-pre-wrap rounded-md border border-border bg-muted/30 p-3 text-foreground">
                  {openMessage.message}
                </p>
              </div>
              <DialogFooter className="sm:justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setReadMutation.mutate({ id: openMessage._id, read: !openMessage.read })}
                >
                  Mark as {openMessage.read ? "unread" : "read"}
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => setDeletingMessage(openMessage)}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!deletingMessage}
        onOpenChange={(open) => !open && setDeletingMessage(null)}
        title="Delete this message?"
        description={`The message from "${deletingMessage?.name}" will be permanently deleted. This cannot be undone.`}
        onConfirm={async () => {
          if (deletingMessage) {
            await deleteMutation.mutateAsync(deletingMessage._id);
            setOpenMessage(null);
          }
        }}
      />
    </div>
  );
};

export default DashboardMessages;
