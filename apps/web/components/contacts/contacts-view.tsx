'use client';

import { useCallback, useEffect, useState } from 'react';
import { Download, Loader2, Search, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { CONTACT_STATUSES, type Paginated } from '@mailflow/shared';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { apiRequest } from '@/lib/client-api';
import { cn } from '@/lib/utils';
import { AddContactDialog } from './add-contact-dialog';
import { ImportDialog } from './import-dialog';

const ALL = '__all__';

interface ContactRow {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  status: string;
  tags: string[];
  createdAt: string;
}
interface ListOption {
  id: string;
  name: string;
  contactCount: number;
}

const STATUS_VARIANT: Record<string, 'sage' | 'rose' | 'default' | 'amber'> = {
  active: 'sage',
  bounced: 'amber',
  unsubscribed: 'default',
  complained: 'rose',
};

export function ContactsView({ lists }: { lists: ListOption[] }) {
  const [items, setItems] = useState<ContactRow[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [listFilter, setListFilter] = useState(ALL);
  const [statusFilter, setStatusFilter] = useState(ALL);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), pageSize: '25' });
      if (search.trim()) params.set('search', search.trim());
      if (listFilter !== ALL) params.set('listId', listFilter);
      if (statusFilter !== ALL) params.set('status', statusFilter);
      const data = await apiRequest<Paginated<ContactRow>>(`/api/contacts?${params}`);
      setItems(data.items);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to load contacts');
    } finally {
      setLoading(false);
    }
  }, [page, search, listFilter, statusFilter]);

  useEffect(() => {
    const t = setTimeout(load, 300);
    return () => clearTimeout(t);
  }, [load]);
  useEffect(() => {
    setPage(1);
  }, [search, listFilter, statusFilter]);

  async function remove(id: string) {
    if (!confirm('Delete this contact?')) return;
    try {
      await apiRequest(`/api/contacts/${id}`, { method: 'DELETE' });
      toast.success('Contact deleted');
      load();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete');
    }
  }
  function exportUrl() {
    const params = new URLSearchParams();
    if (listFilter !== ALL) params.set('listId', listFilter);
    if (statusFilter !== ALL) params.set('status', statusFilter);
    return `/api/contacts/export?${params}`;
  }

  const totalContacts = lists.reduce((s, l) => s + l.contactCount, 0);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[220px_1fr]">
      {/* Lists rail */}
      <aside className="hidden flex-col gap-0.5 lg:flex">
        <div className="label-mono px-2 py-1 text-[10px]">Lists</div>
        <ListItem
          label="All contacts"
          count={totalContacts || total}
          active={listFilter === ALL}
          onClick={() => setListFilter(ALL)}
        />
        {lists.map((l) => (
          <ListItem
            key={l.id}
            label={l.name}
            count={l.contactCount}
            active={listFilter === l.id}
            onClick={() => setListFilter(l.id)}
          />
        ))}
      </aside>

      {/* Main */}
      <div className="min-w-0">
        <div className="mb-3.5 flex flex-wrap items-center gap-2">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="text-muted-foreground absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
            <Input
              placeholder="Search name or email…"
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>All statuses</SelectItem>
              {CONTACT_STATUSES.map((s) => (
                <SelectItem key={s} value={s} className="capitalize">
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <a href={exportUrl()} download>
                <Download /> Export
              </a>
            </Button>
            <ImportDialog lists={lists} onImported={load} />
            <AddContactDialog onCreated={load} />
          </div>
        </div>

        <div className="bg-card border-hairline overflow-hidden rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-[18px]">Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead className="text-right">Added</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-muted-foreground py-10 text-center">
                    <Loader2 className="mx-auto size-5 animate-spin" />
                  </TableCell>
                </TableRow>
              ) : items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-muted-foreground py-10 text-center">
                    No contacts here. Import a CSV or add one.
                  </TableCell>
                </TableRow>
              ) : (
                items.map((c) => {
                  const name = [c.firstName, c.lastName].filter(Boolean).join(' ');
                  const initials = (name || c.email).slice(0, 2).toUpperCase();
                  return (
                    <TableRow key={c.id}>
                      <TableCell className="pl-[18px]">
                        <div className="flex items-center gap-2.5">
                          <span className="bg-clay grid size-7 shrink-0 place-items-center rounded-full text-[10px] font-medium text-white">
                            {initials}
                          </span>
                          <div className="min-w-0">
                            <div className="text-[13.5px] font-medium">{name || '—'}</div>
                            <div className="mono text-muted-foreground truncate text-[11px]">
                              {c.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={STATUS_VARIANT[c.status] ?? 'default'} className="badge-dot capitalize">
                          {c.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {c.tags.slice(0, 2).map((t) => (
                            <span key={t} className="mono bg-surface-2 text-muted-foreground rounded px-1.5 py-0.5 text-[10.5px]">
                              {t}
                            </span>
                          ))}
                          {c.tags.length > 2 && (
                            <span className="mono bg-surface-2 text-muted-foreground rounded px-1.5 py-0.5 text-[10.5px]">
                              +{c.tags.length - 2}
                            </span>
                          )}
                          {c.tags.length === 0 && <span className="text-muted-2 text-xs">—</span>}
                        </div>
                      </TableCell>
                      <TableCell className="mono text-muted-foreground text-right text-[11.5px]">
                        {new Date(c.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive size-8"
                          onClick={() => remove(c.id)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>

        <div className="text-muted-foreground mt-3.5 flex items-center justify-between text-[13px]">
          <span className="mono">{total} contacts</span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled={page <= 1 || loading} onClick={() => setPage((p) => p - 1)}>
              ← Previous
            </Button>
            <span className="mono text-[12px]">
              {page} / {totalPages}
            </span>
            <Button variant="outline" size="sm" disabled={page >= totalPages || loading} onClick={() => setPage((p) => p + 1)}>
              Next →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ListItem({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative flex items-center gap-2 rounded-sm px-3 py-[7px] text-left text-[13px] transition-colors',
        active
          ? 'bg-surface text-ink shadow-[inset_0_0_0_1px_rgb(var(--hairline))]'
          : 'text-ink-2 hover:bg-foreground/[0.03]',
      )}
    >
      {active && <span className="bg-clay absolute top-2 bottom-2 -left-[1px] w-0.5 rounded-r-sm" />}
      <span className="truncate">{label}</span>
      <span className="bg-surface-2 text-muted-foreground mono ml-auto rounded-full px-1.5 text-[10px]">
        {count}
      </span>
    </button>
  );
}
