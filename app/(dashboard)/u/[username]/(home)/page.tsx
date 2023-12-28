import React from 'react';
import { getCurrentUser } from '@/lib/auth.service';
import { getUserByUsername } from '@/lib/user.service';
import { StreamPlayer } from '@/components/StreamPlayer';

interface CreatorPageProps {
  params: {
    username: string;
  };
}

const CreatorPage = async ({ params }: CreatorPageProps) => {
  const currentUser = await getCurrentUser();
  const user = await getUserByUsername(params.username);

  if (!user || user.id !== currentUser?.id || !user?.stream) {
    throw new Error('Unauthorized');
  }

  return (
    <div className="h-full">
      <StreamPlayer user={user} stream={user.stream} isFollowing />
    </div>
  );
};

export default CreatorPage;
