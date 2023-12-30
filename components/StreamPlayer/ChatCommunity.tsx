'use client';

import React, { useMemo, useState } from 'react';
import { useParticipants } from '@livekit/components-react';
import { useDebounce } from 'usehooks-ts';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CommunityItem } from './CommunityItem';
import { LocalParticipant, RemoteParticipant } from 'livekit-client';

interface ChatCommunityProps {
  isHidden: boolean;
  hostName: string;
  viewerName: string;
}

export const ChatCommunity = ({
  isHidden,
  hostName,
  viewerName,
}: ChatCommunityProps) => {
  const participants = useParticipants();
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, 500);

  const onChange = (newValue: string) => {
    setValue(newValue);
  };

  const filteredParticipants = useMemo(() => {
    const deduped = participants.reduce(
      (acc, participant) => {
        const hostAsViewer = `host-${participant.identity}`;
        if (!acc.some((p) => p.identity === hostAsViewer)) {
          acc.push(participant);
        }
        return acc;
      },
      [] as (RemoteParticipant | LocalParticipant)[],
    );

    return deduped.filter((participant) => {
      return participant.name
        ?.toLowerCase()
        .includes(debouncedValue.toLowerCase());
    });
  }, [participants, debouncedValue]);

  if (isHidden) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Community chat is disabled
        </p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Input
        onChange={(evt) => onChange(evt.target.value)}
        placeholder="Search community"
        className="border-white/10"
      />
      <ScrollArea className="gap-y-2 mt-4">
        <p className="text-center text-sm text-muted-foreground hidden last:block p-2">
          No results
        </p>
        {filteredParticipants.map((participant) => (
          <CommunityItem
            key={participant.identity}
            hostName={hostName}
            viewerName={viewerName}
            participantName={participant.name}
            participantIdentity={participant.identity}
          />
        ))}
      </ScrollArea>
    </div>
  );
};
