'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { smtpConnectSchema, type SmtpConnectInput } from '@mailflow/shared';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { apiRequest } from '@/lib/client-api';

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  );
}

export function SmtpDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SmtpConnectInput>({
    resolver: zodResolver(smtpConnectSchema),
    defaultValues: { port: 587, secure: false },
  });

  async function onSubmit(values: SmtpConnectInput) {
    try {
      await apiRequest('/api/email-accounts/smtp', {
        method: 'POST',
        body: JSON.stringify(values),
      });
      toast.success('SMTP mailbox connected');
      setOpen(false);
      reset();
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to connect');
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add SMTP</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect an SMTP mailbox</DialogTitle>
          <DialogDescription>
            We verify the connection before saving. The password is encrypted at rest.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div className="grid grid-cols-2 gap-3">
            <Field id="displayName" label="Display name" error={errors.displayName?.message}>
              <Input id="displayName" placeholder="Sales mailbox" {...register('displayName')} />
            </Field>
            <Field id="fromName" label="From name" error={errors.fromName?.message}>
              <Input id="fromName" placeholder="Ada Lovelace" {...register('fromName')} />
            </Field>
          </div>

          <Field id="fromEmail" label="From email" error={errors.fromEmail?.message}>
            <Input id="fromEmail" type="email" placeholder="ada@company.com" {...register('fromEmail')} />
          </Field>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <Field id="host" label="SMTP host" error={errors.host?.message}>
                <Input id="host" placeholder="smtp.company.com" {...register('host')} />
              </Field>
            </div>
            <Field id="port" label="Port" error={errors.port?.message}>
              <Input id="port" type="number" {...register('port')} />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field id="user" label="Username" error={errors.user?.message}>
              <Input id="user" autoComplete="off" {...register('user')} />
            </Field>
            <Field id="pass" label="Password" error={errors.pass?.message}>
              <Input id="pass" type="password" autoComplete="new-password" {...register('pass')} />
            </Field>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="size-4" {...register('secure')} />
            Use TLS (port 465)
          </label>

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="size-4 animate-spin" />}
              Verify &amp; connect
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
