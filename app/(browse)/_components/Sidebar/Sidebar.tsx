import React from 'react';
import { Wrapper } from './Wrapper';
import { Toggle, ToggleSkeleton } from './Toggle';
import { Recommended, RecommendedSkeleton } from './Recommended';
import { getRecommended } from '@/lib/recommended.service';
import { getFollowedUsers } from '@/lib/follow.service';
import { Following, FollowingSkeleton } from './Following';

export const Sidebar = async () => {
  const recommended = await getRecommended();
  const following = await getFollowedUsers();

  return (
    <Wrapper>
      <Toggle />
      <div className="pt-4 space-y-4 lg:pt-0">
        <Following data={following} />
        <Recommended data={recommended} />
      </div>
    </Wrapper>
  );
};

export const SidebarSkeleton = () => {
  return (
    <aside
      className="fixed left-0 flex flex-col w-collapsed-sidebar lg:w-expanded-sidebar h-full bg-background border-r border-[#2D2E35] z-50">
      <ToggleSkeleton />
      <FollowingSkeleton />
      <RecommendedSkeleton />
    </aside>
  );
};
