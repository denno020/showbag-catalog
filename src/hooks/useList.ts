import { useEffect, useState } from 'react';
import { useSearch } from 'wouter';
import toast from 'react-hot-toast';
import type { ShowbagItem } from '../showbags';

/**
 * Load list data from query string, local storage or not at all!
 * Will handle list name collisions
 */
export const useList = (): [ShowbagItem['slug'][], React.Dispatch<React.SetStateAction<string[]>>] => {
  const searchParam = useSearch();

  const [list, setList] = useState<ShowbagItem['slug'][]>(() => {
    const search = new URLSearchParams(searchParam);
    const itemsQueryParam = search.get('items')?.split(',') || [];
    // Search param takes precendence
    if (itemsQueryParam.length > 0) return itemsQueryParam;

    const showBagList = localStorage.getItem(`show-bag-list`);

    return showBagList ? JSON.parse(showBagList) : [];
  });

  useEffect(() => {
    const search = new URLSearchParams(searchParam);
    const nameQueryParam = search.get('name');
    const itemsQueryParam = search.get('items')?.split(',') || [];
    const showBagList = JSON.parse(localStorage.getItem(`show-bag-list-${nameQueryParam}`) || JSON.stringify([]));

    if (showBagList.length === 0) return;

    const combined = [
      ...itemsQueryParam.filter((x) => !showBagList.includes(x)),
      ...showBagList.filter((x: string) => !itemsQueryParam.includes(x))
    ];
    console.log({ combined });

    if (combined.length > 0) {
      localStorage.setItem(`show-bag-list-${nameQueryParam}-old`, showBagList);
      localStorage.removeItem(`show-bag-list-${nameQueryParam}`);

      toast(
        `You opened a list with the same name that you've already got saved locally, but with different items. Your local save has been backed up and is now, '${nameQueryParam}-old'`,
        {
          duration: 10000,
          icon: '⚠️'
        }
      );
    }
  }, []);

  return [list, setList];
};
