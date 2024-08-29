import { useEffect } from 'react';
import { useSearch } from 'wouter';
import toast from 'react-hot-toast';
import { useStore } from '../store/useStore';
import type { ShowbagItem } from '../showbags';
import type { StoreType } from '../store/useStore';

/**
 * Load list data from query string, local storage or not at all!
 * Will handle list name collisions
 */
export const useList = (): [ShowbagItem['slug'][], StoreType['setListItems']] => {
  const searchParam = useSearch();
  const list = useStore((state) => state.listItems);
  const setList = useStore((state) => state.setListItems);

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
