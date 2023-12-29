'use client';

import { ReactNode } from 'react';
import { useSidebar } from '@/store/useSidebar';
import { cn } from '@/lib/utils';
import { useIsClient } from 'usehooks-ts';
import { ToggleSkeleton } from './Toggle';
import { RecommendedSkeleton } from './Recommended';
import { FollowingSkeleton } from './Following';

type WrapperProps = {
  children: ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  const collapsed = useSidebar.use.collapsed();
  const isClient = useIsClient();

  if (!isClient) {
    return (
      <aside className={cn('fixed left-0 flex w-collapsed-sidebar lg:w-expanded-sidebar flex-col h-full bg-background border-r border-[#2D2E35] z-50')}>
        <ToggleSkeleton />
        <FollowingSkeleton />
        <RecommendedSkeleton />
      </aside>
    );
  }

  return (
    <aside className={cn('fixed left-0 flex flex-col h-full bg-background border-r border-[#2D2E35] z-50',
      collapsed ? 'w-collapsed-sidebar' : 'w-expanded-sidebar'
    )}>
      {children}
    </aside>
  );
};
