import { useState } from 'react';
import { Link } from 'wouter';
import classnames from 'classnames';
import { Badge, Button } from 'react-daisyui';
import type { ShowbagItem } from '../../showbags.ts';
import classes from './ListItem.module.css';
import { useStore } from '../../store/useStore.ts';
import Price from '../Price/Price.tsx';

type ListItemProps = {
  item: ShowbagItem;
};

const ListItem = (props: ListItemProps) => {
  const { item } = props;
  const toggleInList = useStore((state) => state.toggleInList);
  const toggleBagCollected = useStore((state) => state.toggleBagCollected);
  const collectedBags = useStore((state) => state.collectedBags);
  const hideCollected = useStore((state) => state.listOptions.hideCollected);
  const { image, title, showbag_price, slug, showbag_stalls } = item;
  const [isRemoved, setIsRemoved] = useState(false);
  const [isCollected, setIsCollected] = useState(false);
  const isBagCollected = collectedBags.includes(item.slug);

  const handleCollect = () => {
    if (isBagCollected || !hideCollected) {
      toggleBagCollected(item.slug);
      return;
    }

    setIsCollected(true);
    setTimeout(() => {
      toggleBagCollected(item.slug);
    }, 300);
  };

  const handleRemove = () => {
    setIsRemoved(true);
    setTimeout(() => {
      toggleInList(slug);
    }, 300);
  };

  return (
    <div
      className={classnames(
        classes.listItem,
        { [classes.listItemRemoved]: isRemoved },
        { [classes.collectedAnimation]: isCollected }
      )}
    >
      <div>
        <Link to={slug} state={{ internalLink: true }}>
          <img src={image.permalink} alt="Showbag preview" className="w-28 aspect-auto" />
        </Link>
      </div>
      <div className="flex flex-col w-full">
        <div>
          <p className="text-2xl">
            <Link to={slug} state={{ internalLink: true }}>
              {title}
            </Link>
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p>
              <Price value={showbag_price} />
            </p>
            <div>
              {showbag_stalls.map((stall) => (
                <Badge key={stall.id} color="neutral">
                  {stall.title}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <Button onClick={handleCollect} className={classnames({ 'bg-green-500': isBagCollected })}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path
                  fillRule="evenodd"
                  d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0"
                />
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
              </svg>
              <span className="sr-only">Mark collected</span>
            </Button>
            <Button onClick={handleRemove}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
              </svg>
              <span className="sr-only">Remove</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
