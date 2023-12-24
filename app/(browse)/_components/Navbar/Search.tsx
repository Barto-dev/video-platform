'use client';

import React, { FormEvent, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SearchIcon, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import qs from 'query-string';

export const Search = () => {
  const router = useRouter();
  const [value, setValue] = useState('');

  const onSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (value.trim() === '') {
      return;
    }

    const url = qs.stringifyUrl({
      url: '/search',
      query: { search: value },
    }, { skipEmptyString: true });

    router.push(url)
  };

  const onClear = () => {
    setValue('');
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative w-full lg:w-[400px] flex items-center"
    >
      <Input
        value={value}
        onChange={(evt) => setValue(evt.target.value)}
        placeholder="Search for games..."
        className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
      />
      {value.trim() !== '' && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear search"
          className="p-0 absolute top-2.5 right-14 text-muted-foreground cursor-pointer hover:opacity-75 transition">
          <X className="h-5 w-5" />
        </button>
      )}
      <Button
        type="submit"
        aria-label="Search"
        size="sm"
        variant="secondary"
        className="rounded-l-none"
      >
        <SearchIcon className="h-5 w-5 text-muted-foreground" />
      </Button>
    </form>
  );
};
