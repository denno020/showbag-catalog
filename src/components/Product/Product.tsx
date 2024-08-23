import classnames from 'classnames';
import FocusTrap from 'focus-trap-react';
import { useClose } from '../../hooks/useClose.ts';
import type { ShowbagItem } from '../../showbags';
import classes from './Product.module.css';
import ListItem from './ListItem';

type ProductProps = {
  item: ShowbagItem;
  isInList: boolean;
  onToggleInList: (slug: ShowbagItem['slug']) => void;
};

const Product = (props: ProductProps) => {
  const { item, onToggleInList: onToggleInList, isInList } = props;

  const { ref, close } = useClose();

  return (
    <div className={classes.overlay}>
      <FocusTrap>
        <div ref={ref} className={classes.product}>
          <div className="flex flex-col justify-center">
            <div className={classes.imageContainer}>
              <img src={item.image.permalink} alt="Showbag preview" />
              <div className={classnames('backdrop-blur-md', classes.valueContainer)}>${item.showbag_value} value!</div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
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
              <ul>
                {item.showbag_stalls.map((stall) => (
                  <li>{stall.title}</li>
                ))}
              </ul>
            </div>
            <div>
              <button
                onClick={() => onToggleInList(item.slug)}
                className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              >
                {isInList ? 'Remove from' : 'Add to'}&nbsp; List
              </button>
            </div>
          </div>
        </div>
      </FocusTrap>
    </div>
  );
};

export default Product;
