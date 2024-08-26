import { useLocation } from 'wouter';
import { useStore } from '../../store/useStore';
import type { ShowbagItem } from '../../showbags';
import Product from './Product';

type ProductProviderProps = {
  bagSlug: ShowbagItem['slug'];
  items: ShowbagItem[];
};

const ProductProvider = (props: ProductProviderProps) => {
  const [location] = useLocation();

  const toggleInList = useStore((state) => state.toggleInList);
  const listItems = useStore((state) => state.listItems);

  const item = props.items.find((listItem) => listItem.slug === location.replace('/', ''));

  if (!item) {
    return null;
  }

  return <Product item={item} onToggleInList={toggleInList} isInList={listItems.includes(item.slug)} />;
};

export default ProductProvider;
