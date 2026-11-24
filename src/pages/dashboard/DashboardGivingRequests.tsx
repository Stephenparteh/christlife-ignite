import { useEffect, useState } from "react";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { format } from "date-fns";
import { CheckCircle2, ChevronLeft, ChevronRight, Clock, HandCoins, Inbox, Phone, PhoneCall, Search, Trash2, XCircle } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/dashboard/EmptyState";
import StatCard from "@/components/dashboard/StatCard";
import ConfirmDialog from "@/components/dashboard/ConfirmDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ApiClientError } from "@/lib/apiClient";
import { cn } from "@/lib/utils";
import { givingMethodsAdminService, givingRequestsAdminService } from "@/services/giving";
import {
  GIVING_PURPOSES,
  GIVING_REQUEST_STATUSES,
  type GivingRequest,
  type GivingRequestFilters,
  type GivingRequestStatus,
} from "@/types/cms";

const ALL = "all";
const STATUS_LABEL: Record<GivingRequestStatus, string> = {
  pending: "Pending",
  contacted: "Contacted",
  completed: "Completed",
  closed: "Closed",
};

const errorMessage = (error: unknown) =>
  error instanceof ApiClientError ? error.message : "Something went wrong. Please try again.";

const shortId = (id: string) => id.slice(-8).toUpperCase();
const formatAmount = (r: Pick<GivingRequest, "amount" | "currency">) =>
  `${new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(r.amount)} ${r.currency}`;
const formatDate = (iso: string | null) => (iso ? format(new Date(iso), "MMM d, yyyy · h:mm a") : "—");

const GivingStatusBadge = ({ status }: { status: GivingRequestStatus }) => (
  <Badge
    variant="outline"
    className={cn(
      "gap-1.5 font-medium",
      status === "pending" && "border-primary bg-primary/10 font-semibold text-primary",
      status === "contacted" && "border-primary/30 text-primary",
      status === "completed" && "border-primary bg-primary text-primary-foreground",
      status === "closed" && "border-border bg-muted text-muted-foreground",
    )}
  >
    {status === "pending" && <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />}
    {STATUS_LABEL[status]}
  </Badge>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="space-y-2">
    <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{title}</h3>
    <dl className="divide-y divide-border rounded-md border border-border text-sm">{children}</dl>
  </section>
);

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="grid gap-1 px-3 py-2 sm:grid-cols-[9rem_1fr] sm:gap-3">
    <dt className="text-muted-foreground">{label}</dt>
    <dd className="min-w-0 break-words text-foreground">{children}</dd>
  </div>
);

const RequestDetails = ({
  request,
  onClose,
  onUpdated,
  onDeleted,
}: {
  request: GivingRequest;
  onClose: () => void;
  onUpdated: (item: GivingRequest) => void;
  onDeleted: () => void;
}) => {
  const [notes, setNotes] = useState(request.adminNotes);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => setNotes(request.adminNotes), [request._id, request.adminNotes]);

  const updateMutation = useMutation({
    mutationFn: (input: { status?: GivingRequestStatus; adminNotes?: string }) =>
      givingRequestsAdminService.update(request._id, input),
    onSuccess: (item, input) => {
      onUpdated(item);
      toast.success(input.status ? `Marked as ${STATUS_LABEL[input.status].toLowerCase()}.` : "Notes saved.");
    },
    onError: (error) => toast.error(errorMessage(error)),
  });
  const deleteMutation = useMutation({
    mutationFn: () => givingRequestsAdminService.remove(request._id),
    onSuccess: () => {
      toast.success("Giving request deleted.");
      onDeleted();
    },
    onError: (error) => toast.error(errorMessage(error)),
  });

  const setStatus = (status: GivingRequestStatus) => updateMutation.mutate({ status });
  const notesDirty = notes.trim() !== request.adminNotes;

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex flex-wrap items-center gap-2">
          Giving request <span className="font-mono text-sm text-muted-foreground">#{shortId(request._id)}</span>
          <GivingStatusBadge status={request.status} />
        </DialogTitle>
        <DialogDescription>
          Submitted {formatDate(request.createdAt)}. This is a request for help — no payment has been processed by the
          website.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-5">
        <Section title="Personal information">
          <Row label="Full name">{request.fullName}</Row>
          <Row label="Phone">
            <a href={`tel:${request.phone.replace(/[^\d+]/g, "")}`} className="text-primary underline underline-offset-4">
              {request.phone}
            </a>
          </Row>
          <Row label="Email">
            {request.email ? (
              <a href={`mailto:${request.email}`} className="text-primary underline underline-offset-4">
                {request.email}
              </a>
            ) : (
              <span className="text-muted-foreground">Not provided</span>
            )}
          </Row>
        </Section>

        <Section title="Giving details">
          <Row label="Purpose">{request.purpose}</Row>
          {request.customPurpose && <Row label="Custom purpose">{request.customPurpose}</Row>}
          <Row label="Intended amount">{new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(request.amount)}</Row>
          <Row label="Currency">{request.currency}</Row>
          <Row label="Preferred method">{request.preferredMethodName}</Row>
          <Row label="Visitor's note">
            {request.note ? (
              <span className="whitespace-pre-wrap">{request.note}</span>
            ) : (
              <span className="text-muted-foreground">None</span>
            )}
          </Row>
        </Section>

        <Section title="Request management">
          <Row label="Status">{STATUS_LABEL[request.status]}</Row>
          <Row label="Submitted">{formatDate(request.createdAt)}</Row>
          <Row label="Last updated">{formatDate(request.updatedAt)}</Row>
          <Row label="Contacted">{formatDate(request.contactedAt)}</Row>
          <Row label="Completed">{formatDate(request.completedAt)}</Row>
        </Section>

        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={updateMutation.isPending || request.status === "contacted"}
            onClick={() => setStatus("contacted")}
          >
            <PhoneCall className="h-4 w-4" />
            Mark contacted
          </Button>
          <Button
            size="sm"
            disabled={updateMutation.isPending || request.status === "completed"}
            onClick={() => setStatus("completed")}
          >
            <CheckCircle2 className="h-4 w-4" />
            Mark completed
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={updateMutation.isPending || request.status === "closed"}
            onClick={() => setStatus("closed")}
          >
            <XCircle className="h-4 w-4" />
            Close
          </Button>
          {request.status !== "pending" && (
            <Button size="sm" variant="ghost" disabled={updateMutation.isPending} onClick={() => setStatus("pending")}>
              <Clock className="h-4 w-4" />
              Reopen as pending
            </Button>
          )}
        </div>

        <div className="space-y-1.5 rounded-md border border-dashed border-border p-3">
          <Label htmlFor="gr-admin-notes">Internal admin notes</Label>
          <p className="text-xs text-muted-foreground">Private. Never shown to the visitor.</p>
          <Textarea
            id="gr-admin-notes"
            rows={4}
            maxLength={4000}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <Button
            size="sm"
            disabled={!notesDirty || updateMutation.isPending}
            onClick={() => updateMutation.mutate({ adminNotes: notes.trim() })}
          >
            Save notes
          </Button>
        </div>

        <div className="flex justify-between border-t border-border pt-4">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close window
          </Button>
          <Button variant="destructive" size="sm" onClick={() => setConfirmDelete(true)}>
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <ConfirmDialog
        open={confirmDelete}
        onOpenChange={setConfirmDelete}
        title="Delete this giving request?"
        description={`The request from "${request.fullName}" will be permanently deleted. This cannot be undone — to just finish with it, close it instead.`}
        onConfirm={async () => {
          await deleteMutation.mutateAsync();
        }}
      />
    </>
  );
};

const DashboardGivingRequests = () => {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState<GivingRequestFilters>({
    page: 1,
    q: "",
    status: "",
    purpose: "",
    methodId: "",
  });
  const [searchInput, setSearchInput] = useState("");
  const [openRequest, setOpenRequest] = useState<GivingRequest | null>(null);

  // Debounce search so we don't query on every keystroke.
  useEffect(() => {
    const t = window.setTimeout(() => {
      setFilters((f) => (f.q === searchInput.trim() ? f : { ...f, q: searchInput.trim(), page: 1 }));
    }, 300);
    return () => window.clearTimeout(t);
  }, [searchInput]);

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["giving-requests", "dashboard", filters],
    queryFn: () => givingRequestsAdminService.list(filters),
    placeholderData: keepPreviousData,
  });
  const { data: methods } = useQuery({
    queryKey: ["giving-methods", "dashboard"],
    queryFn: givingMethodsAdminService.list,
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["giving-requests", "dashboard"] });
  const setFilter = <K extends keyof GivingRequestFilters>(key: K, value: GivingRequestFilters[K]) =>
    setFilters((f) => ({ ...f, [key]: value, page: 1 }));

  const stats = data?.stats;
  const items = data?.items ?? [];
  const pagination = data?.pagination;
  const hasFilters = !!(filters.q || filters.status || filters.purpose || filters.methodId);

  return (
    <div>
      <PageHeader
        title="Giving Requests"
        description="Requests from visitors who want help completing a gift. These are separate from Contact messages."
      />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total requests" value={stats?.total ?? "—"} icon={HandCoins} />
        <StatCard label="Pending" value={stats?.pending ?? "—"} icon={Clock} hint="Awaiting follow-up" />
        <StatCard label="Contacted" value={stats?.contacted ?? "—"} icon={Phone} />
        <StatCard label="Completed" value={stats?.completed ?? "—"} icon={CheckCircle2} />
      </div>

      <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            aria-label="Search by name, phone or email"
            placeholder="Search name, phone, email"
            className="pl-9"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <Select value={filters.status || ALL} onValueChange={(v) => setFilter("status", v === ALL ? "" : (v as GivingRequestStatus))}>
          <SelectTrigger aria-label="Filter by status">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All statuses</SelectItem>
            {GIVING_REQUEST_STATUSES.map((s) => (
              <SelectItem key={s} value={s}>
                {STATUS_LABEL[s]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filters.purpose || ALL} onValueChange={(v) => setFilter("purpose", v === ALL ? "" : (v as GivingRequest["purpose"]))}>
          <SelectTrigger aria-label="Filter by purpose">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All purposes</SelectItem>
            {GIVING_PURPOSES.map((p) => (
              <SelectItem key={p} value={p}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filters.methodId || ALL} onValueChange={(v) => setFilter("methodId", v === ALL ? "" : v)}>
          <SelectTrigger aria-label="Filter by method">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All methods</SelectItem>
            {methods?.map((m) => (
              <SelectItem key={m._id} value={m._id}>
                {m.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <p className="py-10 text-center text-sm text-muted-foreground">Loading giving requests…</p>
      ) : isError ? (
        <EmptyState
          icon={Inbox}
          title="Couldn't load giving requests"
          description="Something went wrong talking to the server. Try refreshing the page."
        />
      ) : items.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title={hasFilters ? "No matching requests" : "No giving requests yet"}
          description={
            hasFilters
              ? "Try clearing or changing the search and filters."
              : "Requests submitted through the public Giving page will show up here."
          }
        />
      ) : (
        <>
          <div className={cn("overflow-x-auto rounded-lg border border-border", isFetching && "opacity-70")}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Phone</TableHead>
                  <TableHead className="hidden lg:table-cell">Purpose</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="hidden md:table-cell">Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden sm:table-cell">Date</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((r) => (
                  <TableRow key={r._id} className={cn(r.status === "pending" && "bg-primary/5")}>
                    <TableCell className="font-mono text-xs text-muted-foreground">{shortId(r._id)}</TableCell>
                    <TableCell className={cn("max-w-[10rem] truncate", r.status === "pending" && "font-semibold")}>
                      {r.fullName}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{r.phone}</TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {r.purpose === "Other" && r.customPurpose ? `Other: ${r.customPurpose}` : r.purpose}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">{formatAmount(r)}</TableCell>
                    <TableCell className="hidden md:table-cell">{r.preferredMethodName}</TableCell>
                    <TableCell>
                      <GivingStatusBadge status={r.status} />
                    </TableCell>
                    <TableCell className="hidden whitespace-nowrap sm:table-cell">
                      {format(new Date(r.createdAt), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => setOpenRequest(r)}>
                        View<span className="sr-only"> request from {r.fullName}</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {pagination && (
            <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
              <span>
                Page {pagination.page} of {pagination.totalPages} · {pagination.total} request
                {pagination.total === 1 ? "" : "s"}
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.page <= 1}
                  onClick={() => setFilters((f) => ({ ...f, page: f.page - 1 }))}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.page >= pagination.totalPages}
                  onClick={() => setFilters((f) => ({ ...f, page: f.page + 1 }))}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      <Dialog open={!!openRequest} onOpenChange={(open) => !open && setOpenRequest(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          {openRequest && (
            <RequestDetails
              request={openRequest}
              onClose={() => setOpenRequest(null)}
              onUpdated={(item) => {
                setOpenRequest(item);
                invalidate();
              }}
              onDeleted={() => {
                setOpenRequest(null);
                invalidate();
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardGivingRequests;
