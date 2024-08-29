import type { ShowbagItem } from '../../showbags';
import Product from './Product';

type ProductProviderProps = {
  bagSlug: ShowbagItem['slug'];
  items: ShowbagItem[];
};

const ProductProvider = (props: ProductProviderProps) => {
  const item = props.items.find((listItem) => listItem.slug === props.bagSlug);

  if (!item) {
    return null;
  }

  return <Product item={item} />;
};

export default ProductProvider;
