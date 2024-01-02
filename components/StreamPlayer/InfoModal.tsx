import React, { useState, useTransition } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { updateStream } from '@/actions/stream';
import { toast } from 'sonner';
import { UploadDropzone } from '@/lib/uploadthing';
import { useRouter } from 'next/navigation';
import { Hint } from '@/components/Hint';
import { Trash } from 'lucide-react';
import Image from 'next/image';

export interface InfoModalProps {
  initialName: string;
  initialThumbnailUrl: string | null;
}

const appearanceConfig = {
  label: {
    color: '#ffffff',
  },
  allowedContent: {
    color: '#ffffff',
  },
};

export const InfoModal = ({
  initialName,
  initialThumbnailUrl,
}: InfoModalProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState(initialName);
  const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);
  const [open, setOpen] = useState(false);

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    startTransition(() => {
      updateStream({ name })
        .then(() => {
          toast('Stream updated');
          setOpen(false);
        })
        .catch((err) => toast(err.message));
    });
  };

  const onRemoveThumbnail = () => {
    startTransition(() => {
      updateStream({ thumbnailUrl: null })
        .then(() => {
          toast('Thumbnail removed');
          setThumbnailUrl(null);
          setOpen(false);
        })
        .catch((err) => toast(err.message));
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link" size="sm" className="ml-auto">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit stream info</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-14">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              placeholder="Stream name"
              value={name}
              onChange={(evt) => setName(evt.target.value)}
              disabled={isPending}
            />
          </div>
          <div className="space-y-2">
            <Label>Thumbnail</Label>
            {thumbnailUrl ? (
              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                <div className="absolute top-2 right-2 z-[10]">
                  <Hint label="Remove thumbnial" asChild>
                    <Button
                      disabled={isPending}
                      type="button"
                      className="h-auto w-auto p-1.5"
                      onClick={onRemoveThumbnail}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </Hint>
                </div>
                <Image
                  src={thumbnailUrl}
                  alt="Thumbnail"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="rounded-xl border outline-dashed outline-muted">
                <UploadDropzone
                  endpoint="thumbnailUploader"
                  appearance={appearanceConfig}
                  onClientUploadComplete={(res) => {
                    setThumbnailUrl(res?.[0]?.url);
                    setOpen(false);
                    router.refresh();
                  }}
                />
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <DialogClose asChild>
              <Button
                type="button"
                variant="ghost"
                className="mr-4"
                disabled={isPending}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" variant="primary" disabled={isPending}>
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
