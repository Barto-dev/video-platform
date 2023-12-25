import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { LiveBadge } from '@/components/LiveBadge';
import { Skeleton } from '@/components/ui/skeleton';

const avatarSizes = cva(
  '',
  {
    variants: {
      size: {
        default: 'h-8 w-8',
        lg: 'h-14 w-14',
      }
    },
    defaultVariants: {
      size: 'default',
    }
  }
);

interface UserAvatarProps extends VariantProps<typeof avatarSizes> {
  imageUrl: string;
  userName: string;
  isLive?: boolean;
  showBadge?: boolean;
}

interface UserAvatarSkeletonProps extends VariantProps<typeof avatarSizes> {
}

export const UserAvatar = ({
  imageUrl,
  userName,
  isLive,
  showBadge,
  size,
}: UserAvatarProps) => {
  const canShowBadge = isLive && showBadge;

  return (
    <div className="relative">
      <Avatar className={cn(
        isLive && 'ring-2 ring-rose-500 border border-background',
        avatarSizes({ size })
      )}>
        <AvatarImage src={imageUrl} className="object-cover" />
        <AvatarFallback>
          {userName[0].toUpperCase()}
          {userName[userName.length - 1].toUpperCase()}
        </AvatarFallback>
      </Avatar>
      {canShowBadge && (
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
          <LiveBadge>Live</LiveBadge>
        </div>
      )}
    </div>
  );
};

export const UserAvatarSkeleton = ({
  size,
}: UserAvatarSkeletonProps) => {
  return (
    <Skeleton className={cn('rounded-full', avatarSizes({ size }))} />
  );
};
