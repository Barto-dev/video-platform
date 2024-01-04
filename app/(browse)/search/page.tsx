import React, { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { Results, ResultsSkeleton } from './_components/Results';

interface SearchPageProps {
  searchParams: {
    search?: string;
  };
}

const SearchPage = ({ searchParams }: SearchPageProps) => {
  if (!searchParams.search) {
    redirect('/');
  }

  return (
    <div className="h-full p-8 max-w-screen-2xl mx-auto">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results search={searchParams.search} />
      </Suspense>
    </div>
  );
};

export default SearchPage;
