import { db } from '@/lib/db';

export const getStreamByUserId = async (userId: string) => {
  return db.stream.findUnique({
    where: {
      userId,
    },
  });
};
