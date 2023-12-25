'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useSidebar } from '@/store/use-sidebar';
import { cn } from '@/lib/utils';
import { useIsClient, useSsr } from 'usehooks-ts';
import { ToggleSkeleton } from '@/app/(browse)/_components/Sidebar/Toggle';
import { RecommendedSkeleton } from '@/app/(browse)/_components/Sidebar/Recommended';

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
