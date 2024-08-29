import classnames from 'classnames';
import { useClose } from '../../hooks/useClose.ts';
import ActionToList from '../ActionToList';
import type { ShowbagItem } from '../../showbags';
import classes from './Product.module.css';
import ListItem from './ListItem';
import { Badge } from 'react-daisyui';

type ProductProps = {
  item: ShowbagItem;
};

const Product = (props: ProductProps) => {
  const { item } = props;

  const { ref, close } = useClose({ useClickOutside: false });

  return (
    <div className={classes.overlay}>
      <div ref={ref} className={classes.product}>
        <div>
          <button onClick={close} className={classes.closeContainer}>
            <svg width="30" height="30" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 8.707l3.646 3.647.708-.707L8.707 8l3.647-3.646-.707-.708L8 7.293 4.354 3.646l-.707.708L7.293 8l-3.646 3.646.707.708L8 8.707z"
              />
            </svg>
            <span className="sr-only">close</span>
          </button>
        </div>
        <div className="flex flex-col justify-center">
          <div className={classes.imageContainer}>
            <img src={item.image.permalink} alt="Showbag preview" className="aspect-square" />
            <div className={classnames('backdrop-blur-md', classes.valueContainer)}>${item.showbag_value} value!</div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-2xl">{item.title}</div>
          <div className="text-3xl">${item.showbag_price}</div>
          <div>
            <p className="font-bold">Inside the bag</p>
            <ul>
              {item.items.map((listItem) => (
                <li key={listItem.item_id}>
                  <ListItem item={listItem} />
                </li>
              ))}
            </ul>
            <div>Valued at ${item.showbag_value}</div>
          </div>
          <div>
            <p className="font-bold">Where to find</p>
            <div>
              {item.showbag_stalls.map((stall) => (
                <Badge key={stall.id} color="neutral">
                  {stall.title}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <ActionToList slug={item.slug} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
