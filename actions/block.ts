'use server';

import { blockUser, unblockUser } from '@/lib/block.service';
import { revalidatePath } from 'next/cache';

export const onBlock = async (userId: string) => {
  // TODO: adapt to disconnect from livestream
  // TODO: allow ability to kick the guest
  try {
    const blockedUser = await blockUser(userId);
    revalidatePath('/');
    if (blockedUser) {
      revalidatePath(`/${blockedUser.blocked.username}`);
    }
    return blockedUser;
  } catch (err) {
    throw new Error('Internal Server Error');
  }
};

export const onUnblock = async (userId: string) => {
  try {
    const unblockedUser = await unblockUser(userId);
    revalidatePath('/');
    if (unblockedUser) {
      revalidatePath(`/${unblockedUser.blocked.username}`);
    }
    return unblockedUser;
  } catch (err) {
    throw new Error('Internal Server Error');
  }
}
