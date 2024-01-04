'use server';

import { blockUser, unblockUser } from '@/lib/block.service';
import { revalidatePath } from 'next/cache';
import { getCurrentUser } from '@/lib/auth.service';
import { RoomServiceClient } from 'livekit-server-sdk';
import { db } from '@/lib/db';

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!,
);

export const onBlock = async (userId: string) => {
  const currentUser = await getCurrentUser();
  let blockedUser;

  try {
    blockedUser = await blockUser(userId);
  } catch {
    // This means user is a guest
  }

  try {
    await roomService.removeParticipant(currentUser.id, userId);
  } catch {
    // This means user is not in the room
  }

  revalidatePath(`/u/${currentUser.username}/community`);

  return blockedUser;
};

export const onUnblock = async (userId: string) => {
  const currentUser = await getCurrentUser();
  const unblockedUser = await unblockUser(userId);
  revalidatePath(`/u/${currentUser.username}/community`);
  return unblockedUser;
};
