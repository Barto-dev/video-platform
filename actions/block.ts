'use server';

import { blockUser, unblockUser } from '@/lib/block.service';
import { revalidatePath } from 'next/cache';

export const onBlock = async (userId: string) => {
  // TODO: adapt to disconnect from livestream
  // TODO: allow ability to kick the guest
  const blockedUser = await blockUser(userId);
  revalidatePath('/');
  if (blockedUser) {
    revalidatePath(`/${blockedUser.blocked.username}`);
  }
  return blockedUser;
};

export const onUnblock = async (userId: string) => {
  const unblockedUser = await unblockUser(userId);
  revalidatePath('/');
  if (unblockedUser) {
    revalidatePath(`/${unblockedUser.blocked.username}`);
  }
  return unblockedUser;
};
