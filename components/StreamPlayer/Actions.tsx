'use client';

import React, { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@clerk/nextjs';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { onFollow, onUnfollow } from '@/actions/follow';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

interface ActionsProps {
  isHost: boolean;
  hostIdentity: string;
  isFollowing: boolean;
}

export const Actions = ({
  isHost,
  hostIdentity,
  isFollowing,
}: ActionsProps) => {
  const { userId } = useAuth();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(hostIdentity)
        .then((data) =>
          toast(`You are now following ${data.following.username}`),
        )
        .catch(() => toast('Failed to follow'));
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(hostIdentity)
        .then((data) =>
          toast(`You are now unfollowing ${data.following.username}`),
        )
        .catch(() => toast('Failed to follow'));
    });
  };

  const toggleFollow = async () => {
    if (!userId) {
      return router.push('/sign-in');
    }

    if (isHost) {
      return;
    }

    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  return (
    <Button
      onClick={toggleFollow}
      variant="primary"
      size="sm"
      className="w-full lg:w-auto"
      disabled={isPending || isHost}
    >
      <Heart
        className={cn('h-4 w-4 mr-2', isFollowing ? 'fill-white' : 'fill-none')}
      />
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
};

export const ActionsSkeleton = () => {
  return <Skeleton className="h-10 w-full lg:w-24" />;
};
