import { ReactNode } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/tooltip';

interface HintProps {
  label: string;
  children: ReactNode;
  asChild?: boolean;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
}

export const Hint = ({
  label,
  children,
  asChild,
  side,
  align,
}: HintProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild={asChild}>
          {children}
        </TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          className="text-black bg-white"
        >
          <p className="font-semibold">
            {label}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
