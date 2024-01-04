'use server';

import { getCurrentUser } from '@/lib/auth.service';
import { db } from '@/lib/db';

export const isBlockedBy = async (userId: string) => {
  try {
    const currentUser = await getCurrentUser();
    const blockedByUser = await db.user.findUnique({
      where: { id: userId },
    });

    if (!blockedByUser) {
      return false;
    }

    if (blockedByUser.id === currentUser.id) {
      return false;
    }

    // findUnique will work faster as it has a unique constraint on the table
    const existingBlock = await db.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: blockedByUser.id,
          blockedId: currentUser.id,
        },
      },
    });

    return !!existingBlock;
  } catch {
    return false;
  }
};

export const blockUser = async (userId: string) => {
  const currentUser = await getCurrentUser();
  if (currentUser.id === userId) {
    throw new Error('Cannot block yourself');
  }
  const blockedUser = await db.user.findUnique({
    where: { id: userId },
  });

  if (!blockedUser) {
    throw new Error('User not found');
  }

  // findUnique will work faster as it has a unique constraint on the table
  const existingBlock = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: currentUser.id,
        blockedId: blockedUser.id,
      },
    },
  });

  if (existingBlock) {
    throw new Error('User already blocked');
  }

  return db.block.create({
    data: {
      blockerId: currentUser.id,
      blockedId: blockedUser.id,
    },
    include: {
      blocked: true,
    },
  });
};

export const unblockUser = async (userId: string) => {
  const currentUser = await getCurrentUser();
  if (currentUser.id === userId) {
    throw new Error('Cannot unblock yourself');
  }
  const blockedUser = await db.user.findUnique({
    where: { id: userId },
  });

  if (!blockedUser) {
    throw new Error('User not found');
  }

  // findUnique will work faster as it has a unique constraint on the table
  const existingBlock = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: currentUser.id,
        blockedId: blockedUser.id,
      },
    },
  });

  if (!existingBlock) {
    throw new Error('User not blocked');
  }

  return db.block.delete({
    where: {
      blockerId_blockedId: {
        blockerId: currentUser.id,
        blockedId: blockedUser.id,
      },
    },
    include: {
      blocked: true,
    },
  });
};

export const getBlockedUsers = async () => {
  const currentUser = await getCurrentUser();

  return db.block.findMany({
    where: {
      blockerId: currentUser.id,
    },
    include: {
      blocked: true,
    },
  });
};
