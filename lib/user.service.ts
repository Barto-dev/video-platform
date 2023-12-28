import { db } from '@/lib/db';

export const getUserByUsername = async (username: string) => {
  return db.user.findUnique({
    where: { username },
    include: { stream: true },
  });
};

export const getUserById = async (id: string) => {
  return db.user.findUnique({
    where: { id },
    include: { stream: true },
  });
}
