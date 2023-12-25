import { db } from '@/lib/db';

export const getRecommended = async () => {
  await new Promise((resolve) => setTimeout(resolve, 10000));
  return db.user.findMany({
    orderBy: { createdAt: 'desc' },
  });
};
