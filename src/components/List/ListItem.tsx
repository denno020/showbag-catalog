import { Link } from 'wouter';
import { Badge, Button } from 'react-daisyui';
import type { ShowbagItem } from '../../showbags.ts';
import classes from './ListItem.module.css';
import { useStore } from '../../store/useStore.ts';

type ListItemProps = {
  item: ShowbagItem;
};

const ListItem = (props: ListItemProps) => {
  const { item } = props;
  const toggleInList = useStore((state) => state.toggleInList);
  const { image, title, showbag_price, slug, showbag_stalls } = item;

  return (
    <div className={classes.listItem}>
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
            <p>${showbag_price}</p>
            <div>
              {showbag_stalls.map((stall) => (
                <Badge key={stall.id} color="neutral">
                  {stall.title}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <Button
              onClick={() => {
                toggleInList(slug);
              }}
            >
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
