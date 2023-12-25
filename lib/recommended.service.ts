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
      where: { NOT: { id: userId } }
    });
  }

  return db.user.findMany({
    orderBy: { createdAt: 'desc' },
  });
};
