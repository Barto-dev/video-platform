'use client';
import React, { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { onFollow, onUnfollow } from '@/actions/follow';
import { toast } from 'sonner';

interface ActionsProps {
  isFollowing: boolean;
  userId: string;
}

export const Actions = ({
  isFollowing,
  userId,
}: ActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = async () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) => toast(`You are now following ${data.following.username}!`))
        .catch(() => toast('Something went wrong!'));
    });
  };

  const handleUnfollow = async () => {
    startTransition(() => {
      onUnfollow(userId)
        .then((data) => toast(`You are no longer following ${data.following.username}!`))
        .catch(() => toast('Something went wrong!'));
    });
  };

  const handleAction = async () => {
    if (isFollowing) {
      await handleUnfollow();
    } else {
      await handleFollow();
    }
  };

  return (
    <Button
      disabled={isPending}
      variant="primary"
      onClick={handleAction}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
};

