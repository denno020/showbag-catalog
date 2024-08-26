import type { ShowbagItem } from '../../showbags';
import Card from '../Card';

type CatalogProps = {
  items: ShowbagItem[];
  onToggleInList: (itemSlug: ShowbagItem['slug']) => void;
  listItems: ShowbagItem['slug'][];
};

const Catalog = (props: CatalogProps) => {
  const { items, onToggleInList, listItems } = props;

  return items.map((item) => (
    <Card key={item.id} item={item} onToggleInList={onToggleInList} isInList={listItems.includes(item.slug)} />
  ));
};

export default Catalog;
