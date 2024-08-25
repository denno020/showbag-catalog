import { create } from 'zustand';
import type { ShowbagItem } from '../showbags';

export type StoreType = {
  name: string;
  listItems: ShowbagItem['slug'][];
  setListItems: (list: ShowbagItem['slug'][]) => void;
  toggleInList: (bagSlug: ShowbagItem['slug']) => void;
};

export const useStore = create<StoreType>()((set) => ({
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
}));
