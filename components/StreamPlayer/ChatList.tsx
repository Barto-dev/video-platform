'use client';

import React from 'react';
import { ReceivedChatMessage } from '@livekit/components-react';
import { ChatMessage } from '@/components/StreamPlayer/ChatMessage';

interface ChatListProps {
  messages: ReceivedChatMessage[];
  isHidden: boolean;
}

export const ChatList = ({ messages, isHidden }: ChatListProps) => {
  if (isHidden || !messages.length) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          {isHidden ? 'Chat is disabled' : 'Welcome to the chat'}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col-reverse overflow-y-auto p-3 h-full">
      {messages.map((message) => (
        <ChatMessage key={message.timestamp} data={message} />
      ))}
    </div>
  );
};
