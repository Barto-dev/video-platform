'use client';
import React from 'react';
import { useSidebar } from '@/store/useSidebar';
import { Button } from '@/components/ui/button';
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react';
import { Hint } from '@/components/Hint';
import { Skeleton } from '@/components/ui/skeleton';

export const Toggle = () => {
  const collapsed = useSidebar.use.collapsed();
  const onExpand = useSidebar.use.onExpand();
  const onCollapse = useSidebar.use.onCollapse();

  const label = collapsed ? 'Expand' : 'Collapse';

  return (
    <>
      {collapsed ? (
        <div className="mb-4 hidden w-full items-center justify-center pt-4 lg:flex">
          <Hint label={label} side="right" asChild>
            <Button
              onClick={onExpand}
              variant="ghost"
              className="h-auto p-2"
              aria-label={label}
            >
              <ArrowRightFromLine className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      ) : (
        <div className="mb-2 flex w-full items-center p-3 pl-6">
          <p className="font-semibold text-primary">For you</p>
          <Hint label={label} side="right" asChild>
            <Button
              onClick={onCollapse}
              variant="ghost"
              className="ml-auto h-auto p-2"
              aria-label={label}
            >
              <ArrowLeftFromLine className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
    </>
  );
};

export const ToggleSkeleton = () => {
  return (
    <div className="mb-2 hidden w-full items-center justify-between p-3 pl-6 lg:flex">
      <Skeleton className="h-6 w-[100px]" />
      <Skeleton className="h-6 w-6" />
    </div>
  )
}
