import React, { ReactNode } from 'react';
import { getCurrentUserByUserName } from '@/lib/auth.service';
import { redirect } from 'next/navigation';
import { Navbar } from './_components/Navbar/Navbar';
import { Sidebar } from './_components/Sidebar/Sidebar';
import { Container } from './_components/Container';

interface CreatorLayoutProps {
  children: ReactNode;
  params: { username: string };
}

const CreatorLayout = async ({ children, params }: CreatorLayoutProps) => {
  const dashboardUser = await getCurrentUserByUserName(params.username);

  if (!dashboardUser) {
    redirect('/');
  }

  return (
    <>
      <Navbar />
      <div className="flex h-full">
        <Sidebar />
        <Container>{children}</Container>
      </div>
    </>
  );
};

export default CreatorLayout;
