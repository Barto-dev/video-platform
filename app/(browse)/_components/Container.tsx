'use client';
import React, { ReactNode, useEffect } from 'react';
import { useSidebar } from '@/store/useSidebar';
import { cn } from '@/lib/utils';
import { useMediaQuery } from 'usehooks-ts';

interface ContainerProps {
  children: ReactNode;
}

export const Container = ({
  children,
}: ContainerProps) => {
  const matches = useMediaQuery('(min-width: 1024px)');
  const collapsed = useSidebar.use.collapsed();
  const onExpand = useSidebar.use.onExpand();
  const onCollapse = useSidebar.use.onCollapse();

  useEffect(() => {
    if (matches) {
      onExpand();
    } else {
      onCollapse();
    }
  }, [matches, onCollapse, onExpand]);

  return (
    <div className={cn('flex-1', collapsed ? 'ml-collapsed-sidebar' : 'ml-collapsed-sidebar lg:ml-expanded-sidebar')}>
      {children}
    </div>
  );
};
