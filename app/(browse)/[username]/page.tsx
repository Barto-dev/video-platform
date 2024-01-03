import { isFollowingUser } from '@/lib/follow.service';
import { getUserByUsername } from '@/lib/user.service';
import { notFound } from 'next/navigation';
import React from 'react';
import { Actions } from './_components/Actions';
import { isBlockedBy } from '@/lib/block.service';
import { StreamPlayer } from '@/components/StreamPlayer/StreamPlayer';

interface UserPageProps {
  params: {
    username: string;
  };
}

const UserPage = async ({ params }: UserPageProps) => {
  const user = await getUserByUsername(params.username);

  if (!user || !user.stream) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);
  const isBlockedByThisUser = await isBlockedBy(user.id);

  if (isBlockedByThisUser) {
    notFound();
  }

  return (
    <div>
      <StreamPlayer
        user={user}
        stream={user.stream}
        isFollowing={isFollowing}
      />
    </div>
  );
};

export default UserPage;
