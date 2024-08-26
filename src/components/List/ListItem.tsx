import { Link } from 'wouter';
import type { ShowbagItem } from '../../showbags.ts';
import classes from './ListItem.module.css';

type ListItemProps = {
  item: ShowbagItem;
  onRemove: (slug: ShowbagItem['slug']) => void;
};

const ListItem = (props: ListItemProps) => {
  const { item, onRemove } = props;
  const { image, title, showbag_price, slug } = item;

  return (
    <div className={classes.listItem}>
      <div>
        <Link to={slug} state={{ internalLink: true }}>
          <img src={image.permalink} alt="Showbag preview" className="w-28 aspect-auto" />
        </Link>
      </div>
      <div className="flex items-center justify-between w-full">
        <div>
          <p className="text-2xl">
            <Link to={slug} state={{ internalLink: true }}>
              {title}
            </Link>
          </p>
          <p>${showbag_price}</p>
        </div>
        <button
          onClick={() => {
            onRemove(slug);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520q-17 0-28.5-11.5T160-760q0-17 11.5-28.5T200-800h160q0-17 11.5-28.5T400-840h160q17 0 28.5 11.5T600-800h160q17 0 28.5 11.5T800-760q0 17-11.5 28.5T760-720v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM400-280q17 0 28.5-11.5T440-320v-280q0-17-11.5-28.5T400-640q-17 0-28.5 11.5T360-600v280q0 17 11.5 28.5T400-280Zm160 0q17 0 28.5-11.5T600-320v-280q0-17-11.5-28.5T560-640q-17 0-28.5 11.5T520-600v280q0 17 11.5 28.5T560-280ZM280-720v520-520Z" />
          </svg>
          <span className="sr-only">Remove</span>
        </button>
      </div>
    </div>
  );
};

export default ListItem;
