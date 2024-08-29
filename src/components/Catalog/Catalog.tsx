import type { ShowbagItem } from '../../showbags';
import Card from '../Card';
import PageSize from '../PageSize';
import Sort from '../Sort';
import classes from './Catalog.module.css';

type CatalogProps = {
  items: ShowbagItem[];
  listItems: ShowbagItem['slug'][];
};

const Catalog = (props: CatalogProps) => {
  const { items, listItems } = props;

  return (
    <div className={classes.catalog}>
      <div className="w-full container mx-auto px-6 py-3 flex justify-end">
        <Sort />
      </div>
      <div className={classes.items}>
        {items.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
      <div className="w-full container mx-auto px-6 py-3 flex justify-end">
        <PageSize />
      </div>
    </div>
  );
};

export default Catalog;
