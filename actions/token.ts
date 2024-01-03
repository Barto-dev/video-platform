'use server';

import { nanoid } from 'nanoid';
import { getCurrentUser } from '@/lib/auth.service';
import { getUserById } from '@/lib/user.service';
import { isBlockedBy } from '@/lib/block.service';
import { AccessToken } from 'livekit-server-sdk';

export const createViewerToken = async (hostIdentity: string) => {
  let currentUser;

  try {
    currentUser = await getCurrentUser();
  } catch {
    const id = nanoid();
    const random = Math.floor(Math.random() * 9000) + 1000;
    const username = `guest#${random}`;
    currentUser = { id, username };
  }

  const host = await getUserById(hostIdentity);

  if (!host) {
    throw new Error('Host not found');
  }

  const isBlocked = await isBlockedBy(host.id);

  if (isBlocked) {
    throw new Error('User is blocked');
  }

  const isHost = currentUser.id === host.id;
  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
    {
      identity: isHost ? `host-${currentUser.id}` : currentUser.id,
      name: currentUser.username,
    },
  );

  token.addGrant({
    room: host.id,
    roomJoin: true,
    canPublish: false,
    canPublishData: true,
  });

  return token.toJwt();
};
