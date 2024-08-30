import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { ShowbagItem } from '../showbags';

export type StoreType = {
  name: string;
  setName: (userName: string) => void;
  listItems: ShowbagItem['slug'][];
  setListItems: (list: ShowbagItem['slug'][]) => void;
  toggleInList: (bagSlug: ShowbagItem['slug']) => void;
  pageSize: number;
  setPageSize: (pageSize: number) => void;
  sortOption: string;
  setSortOption: (direction: string) => void;
  getIsInList: (slug: string) => boolean;
  setListOption: (option: string, value: boolean) => void;
  listOptions: {
    groupByStands: boolean;
    hideCollected: boolean;
  };
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
    (set, get) => ({
      name: '',
      setName: (userName) =>
        set(() => ({
          name: userName
        })),
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
        }),
      pageSize: 24,
      setPageSize: (pageSize) => set(() => ({ pageSize })),
      sortOption: '',
      setSortOption: (sortOption) =>
        set(() => ({
          sortOption
        })),
      getIsInList: (bagSlug) => get().listItems.includes(bagSlug),
      setListOption: (option, value) =>
        set((state) => ({
          ...state,
          listOptions: {
            ...state.listOptions,
            [option]: value
          }
        })),
      listOptions: {
        groupByStands: false,
        hideCollected: true
      }
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
  const name = search.get('name');
  // Search param takes precendence
  if (itemsQueryParam.length > 0) {
    useStore.setState({
      listItems: itemsQueryParam
    });
  }

  if (name) {
    useStore.setState({
      name
    });
  }
})();
