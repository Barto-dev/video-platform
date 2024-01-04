import { db } from '@/lib/db';

export const getUserByUsername = async (username: string) => {
  return db.user.findUnique({
    where: { username },
    select: {
      id: true,
      username: true,
      bio: true,
      image: true,
      externalUserId: true,
      stream: {
        select: {
          id: true,
          isLive: true,
          isChatDelayed: true,
          isChatEnabled: true,
          isChatFollowersOnly: true,
          thumbnailUrl: true,
          name: true,
        },
      },
      _count: { select: { followedBy: true } },
    },
  });
};

export const getUserById = async (id: string) => {
  return db.user.findUnique({
    where: { id },
    include: { stream: true },
  });
};
