import { useMemo } from 'react';
import { useStore } from '../store/useStore';
import type { ShowbagItem } from '../showbags';
import { SortDirections } from '../components/Sort/Sort';

type UseSortProps = {
  showbags: ShowbagItem[];
};

export const useSort = (props: UseSortProps) => {
  const { showbags } = props;
  const sortOption = useStore((state) => state.sortOption);

  return useMemo(() => {
    if (sortOption === SortDirections.aZ) {
      return showbags.toSorted((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
        if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
        return 0;
      });
    }

    if (sortOption === SortDirections.zA) {
      return showbags.sort((a, b) => {
        if (a.title.toLowerCase() > b.title.toLowerCase()) return -1;
        if (a.title.toLowerCase() < b.title.toLowerCase()) return 1;
        return 0;
      });
    }

    if (sortOption === SortDirections.price_asc) {
      return showbags.toSorted((a, b) => Number(a.showbag_price) - Number(b.showbag_price));
    }

    if (sortOption === SortDirections.price_desc) {
      return showbags.toSorted((a, b) => Number(b.showbag_price) - Number(a.showbag_price));
    }

    if (sortOption === SortDirections.value_asc) {
      return showbags.toSorted((a, b) => Number(b.showbag_value) - Number(a.showbag_value));
    }

    if (sortOption === SortDirections.value_desc) {
      return showbags.toSorted((a, b) => Number(a.showbag_value) - Number(b.showbag_value));
    }

    if (sortOption === SortDirections.value_diff_asc) {
      return showbags.toSorted(
        (a, b) =>
          Number(a.showbag_value) - Number(a.showbag_price) - (Number(b.showbag_value) - Number(b.showbag_price))
      );
    }

    if (sortOption === SortDirections.value_diff_desc) {
      return showbags.toSorted(
        (a, b) =>
          Number(b.showbag_value) - Number(b.showbag_price) - (Number(a.showbag_value) - Number(a.showbag_price))
      );
    }

    return showbags;
  }, [showbags, sortOption]);
};
