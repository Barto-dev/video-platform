import React from 'react';
import {
  useConnectionState,
  useRemoteParticipant,
  useTracks,
} from '@livekit/components-react';
import { ConnectionState, Track } from 'livekit-client';
import { OfflineVideo } from './OfflineVideo';
import { LoadingVideo } from './LoadingVideo';
import { LiveVideo } from './LiveVideo';
import { Skeleton } from '@/components/ui/skeleton';

interface VideoProps {
  hostName: string;
  hostIdentity: string;
}

export const Video = ({ hostName, hostIdentity }: VideoProps) => {
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);
  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
  ]).filter((track) => track.participant.identity === hostIdentity);

  let content;

  if (!participant && connectionState === ConnectionState.Connected) {
    content = <OfflineVideo userName={hostName} />;
  } else if (!participant || tracks.length === 0) {
    content = <LoadingVideo label={`Connecting to ${hostName}`} />;
  } else {
    content = <LiveVideo participant={participant} />;
  }

  return <div className="aspect-video border-b group relative">{content}</div>;
};

export const VideoSkeleton = () => {
  return (
    <div className="aspect-video border-x border-background">
      <Skeleton className="h-full w-full rounded-none" />
    </div>
  );
};
