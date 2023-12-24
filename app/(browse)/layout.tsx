import { ReactNode } from 'react';
import Navbar from './_components/Navbar/Navbar';

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
        {children}
      </div>
    </>
  );
};

export default BrowseLayout;
