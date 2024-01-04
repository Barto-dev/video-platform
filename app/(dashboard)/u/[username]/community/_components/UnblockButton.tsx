'use client';

import React, { useTransition } from 'react';
import { onUnblock } from '@/actions/block';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

interface UnblockButtonProps {
  userId: string;
}

export const UnblockButton = ({ userId }: UnblockButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      onUnblock(userId)
        .then((result) => toast(`User ${result.blocked.username} unblocked`))
        .catch((error) => toast(error.message));
    });
  };

  return (
    <Button
      disabled={isPending}
      onClick={onClick}
      variant="link"
      size="sm"
      className="text-blue-500 w-full"
    >
      Unblock
    </Button>
  );
};
