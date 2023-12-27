'use server';

import { Stream } from '@prisma/client';
import { getCurrentUser } from '@/lib/auth.service';
import { getStreamByUserId } from '@/lib/stream.service';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const updateStream = async (value: Partial<Stream>) => {
  const currentUser = await getCurrentUser();
  const currentUserStream = await getStreamByUserId(currentUser.id);

  if (!currentUserStream) {
    throw new Error('No stream found for current user');
  }

  const validData = {
    name: value.name,
    isChatEnabled: value.isChatEnabled,
    isChatFollowersOnly: value.isChatFollowersOnly,
    isChatDelayed: value.isChatDelayed,
  };

  const stream = await db.stream.update({
    where: {
      id: currentUserStream.id,
    },
    data: validData,
  });

  revalidatePath(`/${currentUser.username}`);
  revalidatePath(`/u/${currentUser.username}`);
  revalidatePath(`/u/${currentUser.username}/chat`);
  return stream;
};
