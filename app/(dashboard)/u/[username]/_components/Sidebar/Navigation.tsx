'use client';

import { Fullscreen, KeyRound, MessageSquare, Users } from 'lucide-react';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { NavItem, NavItemSkeleton } from './NavItem';

export const Navigation = () => {
  const pathname = usePathname();
  const { user } = useUser();
  const routes = [
    {
      name: 'Stream',
      href: `/u/${user?.username}`,
      icon: Fullscreen,
    },
    {
      name: 'Keys',
      href: `/u/${user?.username}/keys`,
      icon: KeyRound,
    },
    {
      name: 'Keys',
      href: `/u/${user?.username}/chat`,
      icon: MessageSquare,
    },
    {
      name: 'Community',
      href: `/u/${user?.username}/community`,
      icon: Users,
    },
  ];

  if (!user?.username) {
    return (
      <div className="space-y-2">
        {routes.map((route) => (
          <NavItemSkeleton key={route.href} />
        ))}
      </div>
    );
  }

  return (
    <nav aria-label="Dashboard navigation" className="space-y-2 px-2 pt-4 lg:pt-0" role="menu">
      {routes.map((route) => (
        <NavItem
          key={route.href}
          href={route.href}
          label={route.name}
          icon={route.icon}
          isActive={pathname === route.href}
        />
      ))}
    </nav>
  );
};
