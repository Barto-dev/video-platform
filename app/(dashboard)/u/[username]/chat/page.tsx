import React from 'react';
import { getCurrentUser } from '@/lib/auth.service';
import { getStreamByUserId } from '@/lib/stream.service';
import { notFound } from 'next/navigation';
import { ToggleCard } from './_components/ToggleCard';

const ChatPage = async () => {
  const currentUser = await getCurrentUser();
  const stream = await getStreamByUserId(currentUser.id);

  if (!stream) {
    notFound();
  }
  return (
    <div className="p-6">
      <header className="mb-4">
        <h1 className="text-2xl font-bold">Chat settings</h1>
      </header>
      <div className="space-y-4">
        <ToggleCard field="isChatEnabled" label="Enable chat" value={stream.isChatEnabled} />
        <ToggleCard field="isChatDelayed" label="Delay chat" value={stream.isChatDelayed} />
        <ToggleCard
          field="isChatFollowersOnly"
          label="Must be following to chat"
          value={stream.isChatFollowersOnly}
        />
      </div>
    </div>
  );
};

export default ChatPage;
