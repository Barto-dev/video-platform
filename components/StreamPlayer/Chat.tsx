'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { ChatVariant, useChatSidebar } from '@/store/useChatSidebar';
import { useChat, useConnectionState, useRemoteParticipant } from '@livekit/components-react';
import { ConnectionState } from 'livekit-client';
import { ChatHeader } from './ChatHeader';
import { ChatForm } from './ChatForm';
import { ChatList } from './ChatList';

interface ChatProps {
  viewerName: string;
  hostName: string;
  hostIdentity: string;
  isFollowing: boolean;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
}

export const Chat = ({
  viewerName,
  hostName,
  hostIdentity,
  isFollowing,
  isChatEnabled,
  isChatDelayed,
  isChatFollowersOnly,
}: ChatProps) => {
  const [value, setValue] = useState('');

  const matches = useMediaQuery('(min-width: 1024px)');

  const collapsed = useChatSidebar.use.collapsed();
  const onExpand = useChatSidebar.use.onExpand();
  const variant = useChatSidebar.use.variant();

  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);
  const isOnline = connectionState === ConnectionState.Connected && participant;
  const isHidden = !isOnline || !isChatEnabled;
  const { chatMessages: messages, send } = useChat();
  const reversedMessages = useMemo(() => [...messages].reverse(), [messages]);
  // const reversedMessages = useMemo(() => messages.sort((a, b) => b.timestamp - a.timestamp), [messages]);

  useEffect(() => {
    if (!matches) {
      onExpand();
    }
  }, [matches, onExpand]);

  const onSubmit = async () => {
    if (!send || !value) {
      return;
    }

    await send(value);
    setValue('');
  };

  const onChange = (value: string) => {
    setValue(value);
  };

  return (
    <div className="flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]">
      <ChatHeader />
      {variant === ChatVariant.CHAT ? (
        <>
          <ChatList messages={reversedMessages} isHidden={isHidden} />
          <ChatForm
            onSubmit={onSubmit}
            value={value}
            onChange={onChange}
            isHidden={isHidden}
            isFollowersOnly={isChatFollowersOnly}
            isDelayed={isChatDelayed}
            isFollowing={isFollowing}
          />
        </>
      ) : (
        <div>Community</div>
      )}
    </div>
  );
};
