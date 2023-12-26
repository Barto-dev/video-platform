'use client';
import React, { ReactNode } from 'react';
import { useCreatorSidebar } from '@/store/use-creator-sidebar';
import { cn } from '@/lib/utils';

interface WrapperProps {
  children: ReactNode;
}
export const Wrapper = ({ children }: WrapperProps) => {
  const collapsed = useCreatorSidebar.use.collapsed();
  return (
    <aside
      className={cn(
        'fixed left-0 flex flex-col w-collapsed-sidebar lg:w-expanded-sidebar h-full bg-background border-r border-[#2D2E35] z-50',
        collapsed ? 'lg:w-collapsed-sidebar' : 'lg:w-expanded-sidebar',
      )}
    >
      {children}
    </aside>
  );
};
