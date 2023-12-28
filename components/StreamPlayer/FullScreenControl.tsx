'use client';

import React from 'react';
import { Maximize, Minimize } from 'lucide-react';
import { Hint } from '@/components/Hint';

interface FullScreenControlProps {
  isFullScreen: boolean;
  onToggle: () => void;
}

export const FullScreenControl = ({ isFullScreen, onToggle }: FullScreenControlProps) => {
  const Icon = isFullScreen ? Minimize : Maximize;
  const label = isFullScreen ? 'Exit full screen' : 'Enter full screen';
  return (
    <div className="flex items-center justify-center gap-4">
      <Hint label={label} asChild>
        <button
          onClick={onToggle}
          aria-label={label}
          className="text-white p1.5 hover:bg-white/10 rounded-lg"
        >
          <Icon className="h-5 w-5" />
        </button>
      </Hint>
    </div>
  );
};
