import { useState } from 'react';
import { useSearch } from 'wouter';
import { setQueryParam } from '../../utils/setQueryParam';

const Search = () => {
  const searchParam = useSearch();
  const [isSearchVisible, setIsSearchVisible] = useState(() => {
    const search = new URLSearchParams(searchParam);
    return search.get('search') ? true : false;
  });
  const [searchText, setSearchText] = useState(() => {
    const search = new URLSearchParams(searchParam);
    return search.get('search') || '';
  });

  const handleSearchInput = (value: string) => {
    setSearchText(value);
    if (value === '') {
      setQueryParam([{ name: 'search', value: null }], 'replace');
      return;
    }

    if (searchParam.includes('page=')) {
      console.log(`clearing page`);
      setQueryParam([{ name: 'page', value: null }], 'push');
    }
    setQueryParam([{ name: 'search', value }], 'replace');
  };

  const handleCancelSearch = () => {
    setSearchText('');
    setQueryParam([{ name: 'search', value: null }], 'replace');
    setIsSearchVisible(false);
  };

  return (
    <div>
      {!isSearchVisible && (
        <button className="pl-3 inline-block no-underline hover:text-black" onClick={() => setIsSearchVisible(true)}>
          <svg
            className="fill-current hover:text-black"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z" />
          </svg>
        </button>
      )}
      {isSearchVisible && (
        <input
          value={searchText}
          autoFocus={true}
          type="text"
          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => handleSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Escape' && handleCancelSearch()}
        ></input>
      )}
    </div>
  );
};

export default Search;
