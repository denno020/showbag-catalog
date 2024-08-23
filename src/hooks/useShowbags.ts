import { useSearch } from 'wouter';
import type { ShowbagItem } from '../showbags';
import { pageSize } from '../constants';

type UseShowbags = {
  showbags: ShowbagItem[];
};

export const useShowbags = (props: UseShowbags) => {
  const { showbags } = props;

  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);
  const page = searchParams.get('page') || 1;

  const startIndex = (Number(page) - 1) * pageSize;

  return {
    showbags: showbags.slice(startIndex, startIndex + pageSize),
    page
  };
};
