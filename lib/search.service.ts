import { getCurrentUser } from '@/lib/auth.service';
import { db } from '@/lib/db';

export const getSearchResults = async (search?: string) => {
  let userId;

  try {
    const currentUser = await getCurrentUser();
    userId = currentUser.id;
  } catch {
    userId = null;
  }

  let streams = [];

  if (userId) {
    streams = await db.stream.findMany({
      where: {
        user: {
          NOT: {
            blocking: {
              some: {
                blockedId: userId,
              },
            },
          },
        },
        OR: [
          {
            name: {
              contains: search,
            },
          },
          {
            user: {
              username: {
                contains: search,
              },
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        isLive: true,
        thumbnailUrl: true,
        updatedAt: true,
        user: true,
      },
      orderBy: [{ isLive: 'desc' }, { updatedAt: 'desc' }],
    });
  } else {
    streams = await db.stream.findMany({
      where: {
        OR: [
          {
            name: {
              contains: search,
            },
          },
          {
            user: {
              username: {
                contains: search,
              },
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        isLive: true,
        thumbnailUrl: true,
        updatedAt: true,
        user: true,
      },
      orderBy: [{ isLive: 'desc' }, { updatedAt: 'desc' }],
    });
  }

  return streams;
};
