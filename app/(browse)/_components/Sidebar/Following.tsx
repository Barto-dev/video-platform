'use client';
import React from 'react';
import { Follow, Stream, User } from '@prisma/client';
import { useSidebar } from '@/store/use-sidebar';
import { UserItem, UserItemSkeleton } from '@/app/(browse)/_components/Sidebar/UserItem';

interface FollowingProps {
  data: (Follow & { following: User & { stream: { isLive: boolean } | null } })[];
}

export const Following = ({ data }: FollowingProps) => {
  const collapsed = useSidebar.use.collapsed();

  if (!data.length) {
    return null;
  }

  return (
    <div>
      {!collapsed && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Following</p>
        </div>
      )}

      <div className="space-y-2 px-2">
        {data.map((follow) => (
          <UserItem
            key={follow.following.id}
            userName={follow.following.username}
            imageUrl={follow.following.image}
            isLive={follow.following.stream?.isLive}
          />
        ))}
      </div>
    </div>
  );
};

export const FollowingSkeleton = () => {
  return (
    <div className="space-y-2 px-2 pt-2 lg:pt-0">
      <UserItemSkeleton />
      <UserItemSkeleton />
      <UserItemSkeleton />
    </div>
  );
};
