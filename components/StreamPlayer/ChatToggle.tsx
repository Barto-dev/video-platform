'use client';

import React from 'react';
import { useChatSidebar } from '@/store/useChatSidebar';
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react';
import { Hint } from '@/components/Hint';
import { Button } from '@/components/ui/button';

export const ChatToggle = () => {
  const collapsed = useChatSidebar.use.collapsed();
  const onExpand = useChatSidebar.use.onExpand();
  const onCollapse = useChatSidebar.use.onCollapse();

  const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine;
  const label = collapsed ? 'Expand chat' : 'Collapse chat';

  const onToggle = () => {
    if (collapsed) {
      onExpand();
    } else {
      onCollapse();
    }
  };

  return (
    <Hint label={label} asChild>
      <Button
        onClick={onToggle}
        variant="ghost"
        className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent"
      >
        <Icon className="h-4 w-4" />
      </Button>
    </Hint>
  );
};
