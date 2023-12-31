'use client';

import React from 'react';
import { Stream, User } from '@prisma/client';
import { useSidebar } from '@/store/useSidebar';
import { UserItem, UserItemSkeleton } from './UserItem';

interface RecommendedProps {
  data: (User & { stream: { isLive: boolean } | null })[];
}

export const Recommended = ({ data }: RecommendedProps) => {
  const collapsed = useSidebar.use.collapsed();

  const showLabel = !collapsed && data.length > 0;

  return (
    <div>
      {showLabel && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Recommended</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((user) => (
          <UserItem
            userName={user.username}
            isLive={user.stream?.isLive}
            imageUrl={user.image}
            key={user.id}
          />
        ))}
      </ul>
    </div>
  );
};

export const RecommendedSkeleton = () => {
  return (
    <div className="px-2">
      <UserItemSkeleton />
      <UserItemSkeleton />
      <UserItemSkeleton />
    </div>
  );
};
