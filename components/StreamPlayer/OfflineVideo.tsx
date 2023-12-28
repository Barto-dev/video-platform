import React from 'react';
import { WifiOff } from 'lucide-react';
interface OfflineVideoProps {
  userName: string;
}
export const OfflineVideo = ({ userName }: OfflineVideoProps) => {
  return (
    <div className="h-full flex flex-col space-y-4 justify-center items-center">
      <WifiOff className="h-10 w-10 text-muted-foreground" />
      <p className="text-lg text-muted-foreground">
        User <span className="font-bold">{userName}</span> is offline
      </p>
    </div>
  );
};
