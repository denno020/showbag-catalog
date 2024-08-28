import { useSearch } from 'wouter';
import type { ShowbagItem } from '../showbags';
import { useStore } from '../store/useStore';
import { useSort } from './useSort';

type UseShowbags = {
  showbags: ShowbagItem[];
};

export const useShowbags = (props: UseShowbags) => {
  const { showbags } = props;
  const pageSize = useStore((state) => state.pageSize);

  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);
  const page = searchParams.get('page') || 1;
  const search = searchParams.get('query') || '';

  const startIndex = (Number(page) - 1) * pageSize;

  const sortedShowbags = useSort({ showbags });

  const searchedShowbags = sortedShowbags.filter((bag) => bag.title.toLowerCase().includes(search.toLowerCase()));

  return {
    showbags: searchedShowbags.slice(startIndex, startIndex + pageSize),
    totalCount: searchedShowbags.length
  };
};
