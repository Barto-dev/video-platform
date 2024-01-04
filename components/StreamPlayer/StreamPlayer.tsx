'use client';

import React from 'react';
import { Stream, User } from '@prisma/client';
import { useViewerToken } from '@/hooks/useViewerToken';
import { LiveKitRoom } from '@livekit/components-react';
import { Video, VideoSkeleton } from './Video';
import { useChatSidebar } from '@/store/useChatSidebar';
import { cn } from '@/lib/utils';
import { Chat, ChatSkeleton } from './Chat';
import { ChatToggle } from './ChatToggle';
import { LiveInfo, LiveInfoSkeleton } from './LiveInfo';
import { InfoCard } from './InfoCard';
import { AboutCard } from './AboutCard';

type CustomStream = Pick<
  Stream,
  | 'id'
  | 'isLive'
  | 'isChatFollowersOnly'
  | 'isChatDelayed'
  | 'isChatEnabled'
  | 'thumbnailUrl'
  | 'name'
>;

type CustomUser = Pick<User, 'id' | 'username' | 'image' | 'bio' | 'externalUserId'> & {
  stream: CustomStream | null;
  _count: { followedBy: number };
};

interface StreamPlayerProps {
  user: CustomUser;
  stream: CustomStream;
  isFollowing: boolean;
}

export const StreamPlayer = ({
  user,
  stream,
  isFollowing,
}: StreamPlayerProps) => {
  const { token, name, identity } = useViewerToken(user.id);
  const collapsed = useChatSidebar.use.collapsed();

  if (!token || !name || !identity) {
    return <StreamPlayerSkeleton />;
  }

  return (
    <>
      {collapsed && (
        <div className="hidden lg:block fixed top-[100px] right-2 z-50">
          <ChatToggle />
        </div>
      )}
      <LiveKitRoom
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        token={token}
        className={cn(
          'grid h-full grid-cols-1 lg:grid-cols-3 lg:gap-y-0 xl:grid-cols-3 2xl:grid-cols-6',
          collapsed && 'lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2',
        )}
      >
        <div className="col-span-1 pb-10 space-y-4 hidden-scrollbar lg:col-span-2 lg:overflow-y-auto xl:col-span-2 2xl:col-span-5">
          <Video hostName={user.username} hostIdentity={user.id} />
          <LiveInfo
            hostName={user.username}
            hostIdentity={user.id}
            viewerIdentity={identity}
            imageUrl={user.image}
            isFollowing={isFollowing}
            name={stream.name}
          />
          <InfoCard
            hostIdentity={user.id}
            viewerIdentity={identity}
            name={stream.name}
            thumbnailUrl={stream.thumbnailUrl}
          />
          <AboutCard
            hostName={user.username}
            hostIdentity={user.id}
            viewerIdentity={identity}
            bio={user.bio}
            followedByCount={user._count.followedBy}
          />
        </div>
        <div className={cn('col-span-1', collapsed && 'hidden')}>
          <Chat
            viewerName={name}
            hostName={user.username}
            hostIdentity={user.id}
            isFollowing={isFollowing}
            isChatEnabled={stream.isChatEnabled}
            isChatDelayed={stream.isChatDelayed}
            isChatFollowersOnly={stream.isChatFollowersOnly}
          />
        </div>
      </LiveKitRoom>
    </>
  );
};

export const StreamPlayerSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full">
      <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
        <VideoSkeleton />
        <LiveInfoSkeleton />
      </div>
      <div className="col-span-1 bg-background">
        <ChatSkeleton />
      </div>
    </div>
  );
};
