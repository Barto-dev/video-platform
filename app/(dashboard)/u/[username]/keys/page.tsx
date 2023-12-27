import React from 'react';
import { UrlCard } from './_components/UrlCard';
import { KeyCard } from './_components/KeyCard';
import { getCurrentUser } from '@/lib/auth.service';
import { getStreamByUserId } from '@/lib/stream.service';
import { notFound } from 'next/navigation';
import { ConnectModal } from '@/app/(dashboard)/u/[username]/keys/_components/ConnectModal';

const KeysPage = async () => {
  const currentUser = await getCurrentUser();
  const stream = await getStreamByUserId(currentUser.id);

  if (!stream) {
    notFound();
  }

  return (
    <div className="p-6">
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Keys & URLs</h1>
        <ConnectModal />
      </header>
      <div className="space-y-4">
        <UrlCard value={stream.serverUrl} />
        <KeyCard value={stream.streamKey} />
      </div>
    </div>
  );
};

export default KeysPage;
