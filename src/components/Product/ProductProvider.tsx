import { useLocation } from 'wouter';
import type { ShowbagItem } from '../../showbags';
import Product from './Product';

type ProductProviderProps = {
  items: ShowbagItem[];
  listItems: ShowbagItem['slug'][];
  onToggleInList: (slug: ShowbagItem['slug']) => void;
};

const ProductProvider = (props: ProductProviderProps) => {
  const { items, onToggleInList: onToggleInList, listItems } = props;
  const [location] = useLocation();

  const item = items.find((listItem) => listItem.slug === location.replace('/', ''));

  if (!item) {
    return null;
  }

  return <Product item={item} onToggleInList={onToggleInList} isInList={listItems.includes(item.slug)} />;
};

export default ProductProvider;
