'use client';
import React from 'react';
import { useCreatorSidebar } from '@/store/useCreatorSidebar';
import { Hint } from '@/components/Hint';
import { Button } from '@/components/ui/button';
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react';

export const Toggle = () => {
  const collapsed = useCreatorSidebar.use.collapsed();
  const onExpand = useCreatorSidebar.use.onExpand();
  const onCollapse = useCreatorSidebar.use.onCollapse();

  const label = collapsed ? 'Expand' : 'Collapse';

  return (
    <>
      {collapsed ? (
        <div className="mb-4 hidden w-full items-center justify-center pt-4 lg:flex">
          <Hint label={label} side="right" asChild>
            <Button onClick={onExpand} variant="ghost" className="h-auto p-2">
              <ArrowRightFromLine className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      ) : (
        <div className="mb-2 hidden w-full items-center p-3 pl-6 lg:flex">
          <p className="font-semibold text-primary">Dashboard</p>
          <Hint label={label} side="right" asChild>
            <Button onClick={onCollapse} variant="ghost" className="h-auto p-2 ml-auto">
              <ArrowLeftFromLine className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
    </>
  );
};
