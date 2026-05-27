import Papa from 'papaparse';
import { Contact } from '@mailflow/db';
import { contactQuerySchema } from '@mailflow/shared';
import type { FilterQuery } from 'mongoose';

import { parseQuery } from '@/lib/api';
import { withOrg } from '@/lib/withOrg';

/** Export contacts (optionally filtered) as a CSV download. */
export const GET = withOrg(async (req, ctx) => {
  const parsed = parseQuery(req.url, contactQuerySchema);
  if (!parsed.ok) return parsed.response;
  const { listId, status, tag } = parsed.data;

  const filter: FilterQuery<Record<string, unknown>> = { orgId: ctx.orgId };
  if (listId) filter.listIds = listId;
  if (status) filter.status = status;
  if (tag) filter.tags = tag;

  const docs = await Contact.find(filter).sort({ createdAt: -1 }).lean();
  const rows = docs.map((c) => ({
    email: c.email,
    firstName: c.firstName ?? '',
    lastName: c.lastName ?? '',
    status: c.status,
    tags: (c.tags ?? []).join('|'),
    createdAt: c.createdAt.toISOString(),
  }));

  const csv = Papa.unparse(rows, {
    columns: ['email', 'firstName', 'lastName', 'status', 'tags', 'createdAt'],
  });

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="contacts-${Date.now()}.csv"`,
    },
  });
});
