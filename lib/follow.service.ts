import { getCurrentUser } from '@/lib/auth.service';
import { db } from '@/lib/db';

export const isFollowingUser = async (userId: string) => {
  try {
    const currentUser = await getCurrentUser();
    const otherUser = await db.user.findUnique({
      where: { id: userId },
    });

    if (!otherUser) {
      return false;
    }

    if (otherUser.id === currentUser.id) {
      return true;
    }

    const existingFollow = await db.follow.findFirst({
      where: {
        followerId: currentUser.id,
        followingId: otherUser.id,
      },
    });

    return !!existingFollow;

  } catch (e) {
    return false;
  }
};


export const followUser = async (userId: string) => {
  const currentUser = await getCurrentUser();
  const followingUser = await db.user.findUnique({
    where: { id: userId },
  });

  if (!followingUser) {
    throw new Error('User not found');
  }

  if (followingUser.id === currentUser.id) {
    throw new Error('Cannot follow yourself');
  }

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: currentUser.id,
      followingId: followingUser.id
    }
  })

  if (existingFollow) {
    throw new Error('Already following user');
  }

  return db.follow.create({
    data: {
      followerId: currentUser.id,
      followingId: followingUser.id
    },
    include: {
      following: true,
      follower: true,
    }
  });
}

export const unfollowUser = async (userId: string) => {
  const currentUser = await getCurrentUser();
  const followingUser = await db.user.findUnique({
    where: { id: userId },
  });

  if (!followingUser) {
    throw new Error('User not found');
  }

  if (followingUser.id === currentUser.id) {
    throw new Error('Cannot unfollow yourself');
  }

  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: currentUser.id,
      followingId: followingUser.id
    }
  })

  if (!existingFollow) {
    throw new Error('Not following user');
  }

  return db.follow.delete({
    where: {
      id: existingFollow.id
    },
    include: {
      following: true,
    }
  });
}
