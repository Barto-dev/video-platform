import { currentUser } from '@clerk/nextjs';
import { db } from '@/lib/db';

export const getCurrentUser = async () => {
  const user = await currentUser();

  if (!user || !user.username) {
    throw new Error('Unauthorized');
  }

  const dbUser = await db.user.findUnique({
    where: { externalUserId: user.id },
  });

  if (!dbUser) {
    throw new Error('Not found');
  }

  return dbUser;
}

export const getCurrentUserByUserName = async (username: string) => {
  const user = await currentUser();

  if (!user || !user.username) {
    throw new Error('Unauthorized');
  }

  const dbUser = await db.user.findUnique({
    where: { username },
  });

  if (!dbUser) {
    throw new Error('Not found');
  }

  if (dbUser.externalUserId !== user.id) {
    throw new Error('Unauthorized');
  }

  return dbUser;
}
