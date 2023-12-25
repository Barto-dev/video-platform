import { db } from '@/lib/db';

export const getRecommended = async () => {
  // wait 5 sec
  return db.user.findMany({
    orderBy: { createdAt: 'desc' },
  });
};
