'use client';

import React from 'react';
import { VerifiedMark } from '@/components/VerifiedMark';
import { BioModal } from './BioModal';

export interface AboutCardProps {
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  bio: string | null;
  followedByCount: number;
}

export const AboutCard = ({
  hostName,
  hostIdentity,
  viewerIdentity,
  bio,
  followedByCount,
}: AboutCardProps) => {
  const isHost = `host-${hostIdentity}` === viewerIdentity;
  const followedByLabel = followedByCount === 1 ? 'follower' : 'followers';
  return (
    <div className="px-4">
      <div className="group rounded-xl bg-background p-6 lg:p-10 flex flex-col gap-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2 font-semibold text-lg lg:text-xl">
            About {hostName}
            <VerifiedMark />
          </div>
          {isHost && <BioModal initialValue={bio} />}
        </div>
        <div className="text-sm text-muted-foreground">
          <span className="font-semibold text-primary">{followedByCount}</span>{' '}
          {followedByLabel}
        </div>
        <p className="text-sm">
          {bio || 'This user prefers to keep an air of mystery about them.'}
        </p>
      </div>
    </div>
  );
};
