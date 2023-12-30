import React from 'react';
import { StreamPlayerSkeleton } from '@/components/StreamPlayer/StreamPlayer';

const CreatorLoading = () => {
  return (
    <div className="h-full">
      <StreamPlayerSkeleton />
    </div>
  );
};

export default CreatorLoading;
