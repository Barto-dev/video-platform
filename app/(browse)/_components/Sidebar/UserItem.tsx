import React from 'react';
import { usePathname } from 'next/navigation';
import { useSidebar } from '@/store/useSidebar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { UserAvatar } from '@/components/UserAvatar';
import { LiveBadge } from '@/components/LiveBadge';
import { Skeleton } from '@/components/ui/skeleton';

interface UserItemProps {
  userName: string;
  isLive?: boolean;
  imageUrl: string;
}
export const UserItem = ({
  userName,
  isLive,
  imageUrl,
}: UserItemProps) => {
  const pathname = usePathname();
  const collapsed = useSidebar.use.collapsed();
  const href = `/${userName}`;
  const isActive = pathname === href;

  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "w-full h-12 flex",
        collapsed ? "justify-center" : "justify-start",
        isActive && "bg-accent"
      )}
    >
      <Link href={href}>
        <div className={cn(
          "flex items-center w-full gap-x-4",
          collapsed && "justify-center"
        )}>
          <UserAvatar
            imageUrl={imageUrl}
            userName={userName}
            isLive={isLive}
          />
          {!collapsed && (
            <p className="truncate">{userName}</p>
          )}
          {!collapsed && isLive && (
            <LiveBadge className="ml-auto">Live</LiveBadge>
          )}
        </div>
      </Link>
    </Button>
  );
};

export const UserItemSkeleton = () => {
  return (
    <div className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className="min-h-[32px] min-w-[32px] rounded-full" />
      <div className="flex-1">
        <Skeleton className="h-6" />
      </div>
    </div>
  )
};
