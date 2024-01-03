import React from 'react';
import { StreamPlayerSkeleton } from '@/components/StreamPlayer/StreamPlayer';

const UserLoading = () => {
  return (
    <div className="h-full">
      <StreamPlayerSkeleton />
    </div>
  );
};

export default UserLoading;
