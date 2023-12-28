import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth.service';

export const getRecommended = async () => {
  let userId;

  try {
    const user = await getCurrentUser();
    userId = user?.id;
  } catch (e) {
    userId = null;
  }

  if (userId) {
    return db.user.findMany({
      orderBy: { createdAt: 'desc' },
      where: {
        AND: [
          { NOT: { id: userId } },
          { NOT: { followedBy: { some: { followerId: userId } } } },
          { NOT: { blocking: { some: { blockedId: userId } } } },
        ],
      },
      include: {
        stream: {
          select: {
            isLive: true,
          },
        },
      },
    });
  }

  return db.user.findMany({
    orderBy: { createdAt: 'desc' },
    include: { stream: { select: { isLive: true } } },
  });
};
