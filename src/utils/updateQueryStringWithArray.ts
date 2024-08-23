import type { ShowbagItem } from '../showbags';
import { setQueryParam } from './setQueryParam';

export const updateQueryStringWithList = (name: string, items: ShowbagItem[]) => {
  setQueryParam(
    [
      {
        name: 'name',
        value: name
      },
      {
        name: 'items',
        value: items.map((item) => item.slug).join(',')
      }
    ],
    'replace'
  );
};
