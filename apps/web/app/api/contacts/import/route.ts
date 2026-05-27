import { csvImportMappingSchema } from '@mailflow/shared';

import { badRequest, ok, serverError } from '@/lib/api';
import { withOrg } from '@/lib/withOrg';
import { audit } from '@/lib/audit';
import { importContacts } from '@/lib/contacts-service';

/**
 * Import contacts from an uploaded CSV.
 * Multipart body: `file` (the CSV) + `payload` (JSON: column mapping + options).
 * Set `dryRun:true` in the payload to preview counts without writing.
 */
export const POST = withOrg(
  async (req, ctx) => {
    let form: FormData;
    try {
      form = await req.formData();
    } catch {
      return badRequest('Expected multipart/form-data');
    }

    const file = form.get('file');
    const payloadRaw = form.get('payload');
    if (!(file instanceof File)) return badRequest('Missing CSV file');
    if (typeof payloadRaw !== 'string') return badRequest('Missing import payload');

    let payloadJson: unknown;
    try {
      payloadJson = JSON.parse(payloadRaw);
    } catch {
      return badRequest('Invalid payload JSON');
    }
    const parsed = csvImportMappingSchema.safeParse(payloadJson);
    if (!parsed.success) {
      return badRequest(parsed.error.issues[0]?.message ?? 'Invalid mapping');
    }

    try {
      const csvText = await file.text();
      const result = await importContacts(ctx.orgId, csvText, parsed.data);

      if (result.committed) {
        await audit({
          orgId: ctx.orgId,
          actorId: ctx.userId,
          action: 'contacts.import',
          meta: { created: result.toCreate, updated: result.toUpdate, listId: result.listId },
        });
      }
      return ok(result);
    } catch (error) {
      console.error('[contacts.import] error:', error);
      return serverError('Import failed');
    }
  },
  { role: 'member' },
);
