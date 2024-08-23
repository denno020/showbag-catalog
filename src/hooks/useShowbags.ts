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
  const search = searchParams.get('search') || '';

  const startIndex = (Number(page) - 1) * pageSize;

  const searchedShowbags = showbags.filter((bag) => bag.title.toLowerCase().includes(search.toLowerCase()));

  return {
    showbags: searchedShowbags.slice(startIndex, startIndex + pageSize),
    totalCount: searchedShowbags.length
  };
};
