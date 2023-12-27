'use client';
import React, { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { onFollow, onUnfollow } from '@/actions/follow';
import { toast } from 'sonner';
import { onBlock, onUnblock } from '@/actions/block';

interface ActionsProps {
  isFollowing: boolean;
  userId: string;
}

export const Actions = ({ isFollowing, userId }: ActionsProps) => {
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

  const handleFollowAction = async () => {
    if (isFollowing) {
      await handleUnfollow();
    } else {
      await handleFollow();
    }
  };

  const handleBlock = async () => {
    startTransition(() => {
      onBlock(userId)
        .then((data) => toast(`You have blocked ${data.blocked.username}!`))
        .catch((err) => toast(err.message));
    });
  }

  const handleUnblock = async () => {
    startTransition(() => {
      onUnblock(userId)
        .then((data) => toast(`You have unblocked ${data.blocked.username}!`))
        .catch((err) => toast(err.message));
    });
  }

  return (
    <>
      <Button disabled={isPending} variant='primary' onClick={handleFollowAction}>
        {isFollowing ? 'Unfollow' : 'Follow'}
      </Button>
      <Button disabled={isPending} onClick={handleBlock}>Block</Button>
      <Button disabled={isPending} onClick={handleUnblock}>Unblock</Button>
    </>
  );
};
