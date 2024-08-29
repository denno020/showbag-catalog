import Link from '../Link';
import type { ShowbagItem } from '../../showbags';
import classes from './Card.module.css';
import ActionToList from '../ActionToList';

export type CardProps = {
  item: ShowbagItem;
};

const Card = (props: CardProps) => {
  const { item } = props;
  const { slug, image, title, showbag_price } = item;

  return (
    <div className={`w-1/2 md:w-1/3 xl:w-1/4 p-6 flex flex-col items-center hover:shadow-lg relative ${classes.card}`}>
      <Link
        to={slug}
        state={{ internalProductLink: true }}
        className="flex flex-col gap-3"
        onClick={() => {
          /*Don't scroll to top*/
        }}
      >
        <div className="w-full relative">
          <img alt="Bag preview" className="w-full aspect-square" src={image.permalink} loading="lazy" />
          <div className={classes.price}>${showbag_price}</div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xl text-center">{title}</p>
        </div>
        <div className="flex items-baseline gap-2"></div>
      </Link>
      <div className="w-full">
        <ActionToList slug={item.slug} />
        <Link
          to={slug}
          state={{ internalProductLink: true }}
          tabIndex={-1}
          className="w-full btn btn-ghost btn-sm text-center mt-3"
          onClick={() => {
            /*Don't scroll to top*/
          }}
        >
          More Info &gt;
        </Link>
      </div>
    </div>
  );
};

export default Card;
