'use client';

import React, { useEffect, useRef, useState } from 'react';
import { RemoteParticipant, Track } from 'livekit-client';
import { useTracks } from '@livekit/components-react';
import { FullScreenControl } from '@/components/StreamPlayer/FullScreenControl';
import { useEventListener } from 'usehooks-ts';
import { VolumeControl } from '@/components/StreamPlayer/VolumeControl';

interface LiveVideoProps {
  participant: RemoteParticipant;
}

export const LiveVideo = ({ participant }: LiveVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(0);

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
      if (videoRef.current) {
        track.publication.track?.attach(videoRef.current);
      }
    });

  const onVolumeChange = (value: number) => {
    setVolume(value);
    if (videoRef.current) {
      videoRef.current.muted = value === 0;
      videoRef.current.volume = value / 100;
    }
  };

  const onToggleMute = () => {
    const isMuted = volume === 0;
    setVolume(isMuted ? 50 : 0);

    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      videoRef.current.volume = isMuted ? 0.5 : 0;
    }
  }

  const toggleFullscreen = () => {
    if (!wrapperRef.current) {
      return;
    }

    if (isFullscreen) {
      document.exitFullscreen();
    } else {
      wrapperRef.current.requestFullscreen();
    }
  };

  const handleFullscreenChange = () => {
    const isCurrentlyFullscreen = document.fullscreenElement !== null;
    setIsFullscreen(isCurrentlyFullscreen);
  };

  useEventListener('fullscreenchange', handleFullscreenChange, wrapperRef);

  useEffect(() => {
    onVolumeChange(0)
  }, []);

  return (
    <div className="relative h-full flex" ref={wrapperRef}>
      <video src="" width="100%" ref={videoRef} />
      <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
        <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
          <VolumeControl onToggle={onToggleMute} onChange={onVolumeChange} value={volume} />
          <FullScreenControl isFullScreen={isFullscreen} onToggle={toggleFullscreen} />
        </div>
      </div>
    </div>
  );
};
