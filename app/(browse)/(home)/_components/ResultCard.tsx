import React from 'react';
import { User } from '@prisma/client';
import Link from 'next/link';
import { Thumbnail, ThumbnailSkeleton } from '@/components/Thumbnail';
import { UserAvatar, UserAvatarSkeleton } from '@/components/UserAvatar';
import { Skeleton } from '@/components/ui/skeleton';

interface ResultCardProps {
  data: {
    id: string;
    user: User;
    thumbnailUrl: string | null;
    isLive: boolean;
    name: string;
  }
}

export const ResultCard = ({ data }: ResultCardProps) => {
  return (
    <Link href={`/${data.user.username}`}>
      <div className="h-full w-full space-y-4">
        <Thumbnail
          src={data.thumbnailUrl}
          fallbackSrc={data.user.image}
          isLive={data.isLive}
          username={data.user.username}
        />
        <div className="flex gap-x-3">
          <UserAvatar
            imageUrl={data.user.image}
            userName={data.user.username}
            isLive={data.isLive}
          />
          <div className="flex flex-col text-sm overflow-hidden">
            <p className="truncate font-semibold hover:text-blue-600">{data.name}</p>
            <p className="text-muted-foreground">{data.user.username}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const ResultCardSkeleton = () => {
  return (
    <div className="h-full w-full space-y-4">
      <ThumbnailSkeleton />
      <div className="flex gap-x-3">
        <UserAvatarSkeleton />
        <div className="flex flex-col gap-y-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  )
}
