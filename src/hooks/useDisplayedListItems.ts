import { useMemo } from 'react';
import { useStore } from '../store/useStore';
import type { ShowbagItem } from '../showbags';

type UseDisplayedListItemsProps = {
  items: ShowbagItem[];
};

export const useDisplayedListItems = (props: UseDisplayedListItemsProps) => {
  const { items } = props;
  const hideCollected = useStore((state) => state.listOptions.hideCollected);
  const collectedBags = useStore((state) => state.collectedBags);
  console.log({ collectedBags });

  return useMemo(
    () =>
      items.filter((item) => {
        if (!hideCollected) return true;

        return !collectedBags.includes(item.slug);
      }),
    [items, hideCollected, collectedBags]
  );
};
