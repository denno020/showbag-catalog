import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { ShowbagItem } from '../showbags';
import { useSearch } from 'wouter';

export type StoreType = {
  name: string;
  listItems: ShowbagItem['slug'][];
  setListItems: (list: ShowbagItem['slug'][]) => void;
  toggleInList: (bagSlug: ShowbagItem['slug']) => void;
};

// The name search query param is going to become the way that we can make the
// app display different lists pretty easily, without me having to write a bunch of logic
const storeName = (() => {
  const search = new URLSearchParams(location.search);
  const name = search.get('name');
  return `show-bag-store${name ? `-${name}` : ''}`;
})();

export const useStore = create<StoreType>()(
  persist(
    (set) => ({
      name: 'My',
      listItems: [],
      setListItems: () => set((state) => ({ listItems: state.listItems })),
      toggleInList: (bagSlug: ShowbagItem['slug']) =>
        set((state) => {
          if (state.listItems.includes(bagSlug)) {
            return {
              listItems: state.listItems.filter((prevItemSlug) => prevItemSlug !== bagSlug)
            };
          }

          return {
            listItems: [...state.listItems, bagSlug]
          };
        })
    }),
    {
      name: storeName,
      storage: createJSONStorage(() => localStorage)
    }
  )
);

(() => {
  const search = new URLSearchParams(location.search);
  const itemsQueryParam = search.get('items')?.split(',') || [];
  // Search param takes precendence
  if (itemsQueryParam.length > 0) {
    useStore.setState({
      listItems: itemsQueryParam
    });
    return;
  }

  const showBagList = localStorage.getItem(`show-bag-list`);
  if (showBagList) {
    useStore.setState({
      listItems: JSON.parse(showBagList)
    });
  }
})();
