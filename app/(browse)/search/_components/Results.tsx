import React from 'react';
import { getSearchResults } from '@/lib/search.service';
import { ResultCard, ResultCardSkeleton } from './ResultCard';
import { Skeleton } from '@/components/ui/skeleton';

interface ResultsProps {
  search?: string;
}

export const Results = async ({ search }: ResultsProps) => {
  const data = await getSearchResults(search);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">
        Results for term &quot;{search}&quot;
      </h2>
      {data.length === 0 && (
        <p className="text-muted-foreground text-sm">
          No results found for &quot;{search}&quot;. Try searching for something
          else.
        </p>
      )}
      <div className="flex flex-col gap-y-4">
        {data.map((result) => (
          <ResultCard key={result.id} data={result} />
        ))}
      </div>
    </div>
  );
};

export const ResultsSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-8 w-[290px] mb-4" />
      <div className="flex flex-col gap-y-4">
        <ResultCardSkeleton />
        <ResultCardSkeleton />
        <ResultCardSkeleton />
      </div>
    </div>
  );
};
