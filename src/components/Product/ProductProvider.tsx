import { useLocation } from 'wouter';
import type { ShowbagItem } from '../../showbags';
import Product from './Product';

type ProductProviderProps = {
  items: ShowbagItem[];
  shoppingBagItems: ShowbagItem['slug'][];
  onToggleInShoppingBag: (slug: ShowbagItem['slug']) => void;
};

const ProductProvider = (props: ProductProviderProps) => {
  const { items, onToggleInShoppingBag, shoppingBagItems } = props;
  const [location] = useLocation();

  const item = items.find((bagItem) => bagItem.slug === location.replace('/', ''));

  if (!item) {
    return null;
  }

  return <Product item={item} onToggleInBag={onToggleInShoppingBag} isInBag={shoppingBagItems.includes(item.slug)} />;
};

export default ProductProvider;
