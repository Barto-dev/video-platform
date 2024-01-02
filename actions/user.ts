'use server';

import { User } from '@prisma/client';
import { getCurrentUser } from '@/lib/auth.service';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const updateUser = async (values: Partial<User>) => {
  const currentUser = await getCurrentUser();

  const validData = {
    bio: values.bio,
  };

  const user = await db.user.update({
    where: { id: currentUser.id },
    data: { ...validData },
  });

  revalidatePath(`/${user.username}`);
  revalidatePath(`/u/${user.username}`);

  return user;
};
