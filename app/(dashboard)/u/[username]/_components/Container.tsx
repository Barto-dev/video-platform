'use client';
import { ReactNode, useEffect } from 'react';
import { useCreatorSidebar } from '@/store/use-creator-sidebar';
import { useMediaQuery } from 'usehooks-ts';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  const collapsed = useCreatorSidebar.use.collapsed();
  const onExpand = useCreatorSidebar.use.onExpand();
  const onCollapse = useCreatorSidebar.use.onCollapse();
  const matches = useMediaQuery('(min-width: 1024px)');

  useEffect(() => {
    if (matches) {
      onExpand();
    } else {
      onCollapse();
    }
  }, [matches, onCollapse, onExpand]);

  return (
    <div className={cn('flex-1', collapsed ? 'ml-collapsed-sidebar' : 'lg:ml-expanded-sidebar')}>
      {children}
    </div>
  );
};
