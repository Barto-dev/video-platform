import { ReactNode, Suspense } from 'react';
import { Navbar } from './_components/Navbar/Navbar';
import { Sidebar, SidebarSkeleton } from './_components/Sidebar/Sidebar';
import { Container } from './_components/Container';

type BrowseLayoutProps = {
  children: ReactNode;
}

const BrowseLayout = ({
  children,
}: BrowseLayoutProps) => {
  return (
    <>
      <Navbar />
      <div className="flex h-full">
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>
        <Container>
          {children}
        </Container>
      </div>
    </>
  );
};

export default BrowseLayout;
