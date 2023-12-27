'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCopyToClipboard } from 'usehooks-ts';
import { CheckIcon, CopyIcon } from 'lucide-react';

interface CopyButtonProps {
  value: string;
}

export const CopyButton = ({ value }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const [, copy] = useCopyToClipboard();
  const onCopy = async () => {
    if (!value) {
      return;
    }
    await copy(value);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const Icon = isCopied ? CheckIcon : CopyIcon;

  return (
    <Button onClick={onCopy} disabled={!value || isCopied} variant="ghost" size="sm">
      <Icon />
    </Button>
  );
};
