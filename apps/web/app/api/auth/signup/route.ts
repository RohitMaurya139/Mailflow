import { signUpSchema } from '@mailflow/shared';
import { connectToDatabase } from '@mailflow/db';

import { conflict, ok, parseBody, serverError } from '@/lib/api';
import { createUserWithOrg } from '@/lib/auth-service';

/** Public registration: creates a user and their org. */
export async function POST(req: Request) {
  const parsed = await parseBody(req, signUpSchema);
  if (!parsed.ok) return parsed.response;

  try {
    await connectToDatabase();
    const user = await createUserWithOrg(parsed.data);
    return ok({ id: user.id, email: user.email, orgId: user.orgId }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === 'EMAIL_TAKEN') {
      return conflict('An account with that email already exists');
    }
    console.error('[signup] error:', error);
    return serverError('Could not create account');
  }
}
