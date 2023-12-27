'use client';

import React, { useTransition } from 'react';
import { Switch } from '@/components/ui/switch';
import { updateStream } from '@/actions/stream';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

type FieldTypes = 'isChatEnabled' | 'isChatDelayed' | 'isChatFollowersOnly';

interface ToggleCardProps {
  field: FieldTypes;
  label: string;
  value: boolean;
}
export const ToggleCard = ({ field, label, value }: ToggleCardProps) => {
  const [isPending, startTransition] = useTransition();
  const onChange = () => {
    startTransition(() => {
      updateStream({ [field]: !value })
        .then(() => toast('Chat settings updated!'))
        .catch((err) => toast(err.message));
    });
  };

  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold shrink-0">{label}</p>
        <div className="space-y-2">
          <Switch checked={value} disabled={isPending} onCheckedChange={onChange}>
            {value ? 'on' : 'off'}
          </Switch>
        </div>
      </div>
    </div>
  );
};

export const ToggleCardSkeleton = () => {
  return <Skeleton className="rounded-xl p-10 w-full" />;
};
