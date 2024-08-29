import { useEffect, useRef, useState } from 'react';
import { Tooltip, Input } from 'react-daisyui';
import { useSearch } from 'wouter';
import { setQueryParam } from '../../utils/setQueryParam';

const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParam = useSearch();
  const [searchText, setSearchText] = useState(() => {
    const search = new URLSearchParams(searchParam);
    return search.get('query') || '';
  });

  const handleSearchInput = (value: string) => {
    setSearchText(value);
    if (value === '') {
      setQueryParam([{ name: 'query', value: null }], 'replace');
      return;
    }

    if (searchParam.includes('page=')) {
      console.log(`clearing page`);
      setQueryParam([{ name: 'page', value: null }], 'push');
    }
    setQueryParam([{ name: 'query', value }], 'replace');
  };

  useEffect(() => {
    // Replace state effectively removes autoFocusSearch from state information
    // in the event that a user moves forward, then comes _back_ to the search page
    // We don't need to auto focus search when coming back
    window.history.replaceState({}, '', location.href);
  }, []);

  return (
    <div className="w-full flex justify-end">
      <Tooltip message="Start typing to search" open={searchText !== ''} className="w-full">
        <Input
          ref={inputRef}
          value={searchText}
          autoFocus={history.state?.autoFocusSearch || searchText === ''}
          placeholder="Search for bags"
          type="text"
          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => handleSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.blur()}
        ></Input>
      </Tooltip>
    </div>
  );
};

export default Search;
