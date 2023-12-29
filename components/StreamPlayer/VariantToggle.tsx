'use client';

import React from 'react';
import { ChatVariant, useChatSidebar } from '@/store/useChatSidebar';
import { Hint } from '@/components/Hint';
import { Button } from '@/components/ui/button';
import { MessageSquare, Users } from 'lucide-react';

export const VariantToggle = () => {
  const variant = useChatSidebar.use.variant();
  const onChangeVariant = useChatSidebar.use.onChangeVariant();
  const isChat = variant === ChatVariant.CHAT;

  const Icon = isChat ? Users : MessageSquare;
  const label = isChat ? 'Community' : 'Go back to chat';

  const onToggle = () => {
    const newVariant = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT;
    onChangeVariant(newVariant);
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
