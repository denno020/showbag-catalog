import {useLocation, Router} from 'wouter';
import type {ShowbagItem} from '../showbags'
import Card from './Card'

type CatalogProps = {
  items: ShowbagItem[],
  onToggleInShoppingBag: (itemSlug: ShowbagItem['slug']) => void,
  shoppingBagItems: ShowbagItem['slug'][]
}

const Catalog = (props: CatalogProps) => {
  const {items, onToggleInShoppingBag, shoppingBagItems} = props;
  const [location, setLocation] = useLocation();

  return items.map((item) => <Card key={item.id} item={item} onToggleInShoppingBag={onToggleInShoppingBag}
                                   isInBag={shoppingBagItems.includes(item.slug)}/>)
}

export default Catalog;
