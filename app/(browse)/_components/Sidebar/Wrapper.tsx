'use client';

import { ReactNode } from 'react';
import { useSidebar } from '@/store/use-sidebar';
import { cn } from '@/lib/utils';

type WrapperProps = {
  children: ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  const collapsed = useSidebar.use.collapsed();

  return (
    <aside className={cn('fixed left-0 flex flex-col h-full bg-background border-r border-[#2D2E35] z-50',
      collapsed ? 'w-collapsed-sidebar' : 'w-expanded-sidebar'
    )}>
      {children}
    </aside>
  );
};
