import classnames from 'classnames';
import Link from '../Link';
import type { ShowbagItem } from '../../showbags';
import classes from './Card.module.css';

export type CardProps = {
  item: ShowbagItem;
  onToggleInList: (slug: ShowbagItem['slug']) => void;
  isInList: boolean;
};

const Card = (props: CardProps) => {
  const { item, onToggleInList, isInList } = props;
  const { slug, image, title, showbag_price, showbag_value } = item;

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
          <img alt="Bag preview" className="w-full" src={image.permalink} />
          <div className={classes.price}>${showbag_price}</div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xl text-center">{title}</p>
        </div>
        <div className="flex items-baseline gap-2"></div>
      </Link>
      <div className="w-full">
        <button
          className={classnames(
            'w-full btn btn-sm flex gap-2',
            { 'btn-secondary': !isInList },
            { 'btn-outline': isInList }
          )}
          onClick={() => onToggleInList(slug)}
        >
          {isInList ? (
            <>
              <svg
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 fill-current text-gray-500 hover:text-black"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M2.5 3C2.22386 3 2 3.22386 2 3.5V9.5C2 9.77614 2.22386 10 2.5 10H12.5C12.7761 10 13 9.77614 13 9.5V3.5C13 3.22386 12.7761 3 12.5 3H2.5ZM1 9.5C1 10.1531 1.4174 10.7087 2 10.9146V11.5C2 12.3284 2.67157 13 3.5 13H11.5C12.3284 13 13 12.3284 13 11.5V10.9146C13.5826 10.7087 14 10.1531 14 9.5V3.5C14 2.67157 13.3284 2 12.5 2H2.5C1.67157 2 1 2.67157 1 3.5V9.5ZM12 11.5V11H3V11.5C3 11.7761 3.22386 12 3.5 12H11.5C11.7761 12 12 11.7761 12 11.5ZM5.5 6C5.22386 6 5 6.22386 5 6.5C5 6.77614 5.22386 7 5.5 7H9.5C9.77614 7 10 6.77614 10 6.5C10 6.22386 9.77614 6 9.5 6H5.5Z"
                  fill="currentColor"
                />
              </svg>
              <p>Remove</p>
            </>
          ) : (
            <>
              <svg
                className="h-6 w-6 fill-current text-gray-500 hover:text-black"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2 3.5C2 3.22386 2.22386 3 2.5 3H12.5C12.7761 3 13 3.22386 13 3.5V9.5C13 9.77614 12.7761 10 12.5 10H2.5C2.22386 10 2 9.77614 2 9.5V3.5ZM2 10.9146C1.4174 10.7087 1 10.1531 1 9.5V3.5C1 2.67157 1.67157 2 2.5 2H12.5C13.3284 2 14 2.67157 14 3.5V9.5C14 10.1531 13.5826 10.7087 13 10.9146V11.5C13 12.3284 12.3284 13 11.5 13H3.5C2.67157 13 2 12.3284 2 11.5V10.9146ZM12 11V11.5C12 11.7761 11.7761 12 11.5 12H3.5C3.22386 12 3 11.7761 3 11.5V11H12ZM5 6.5C5 6.22386 5.22386 6 5.5 6H7V4.5C7 4.22386 7.22386 4 7.5 4C7.77614 4 8 4.22386 8 4.5V6H9.5C9.77614 6 10 6.22386 10 6.5C10 6.77614 9.77614 7 9.5 7H8V8.5C8 8.77614 7.77614 9 7.5 9C7.22386 9 7 8.77614 7 8.5V7H5.5C5.22386 7 5 6.77614 5 6.5Z"
                  fill="currentColor"
                />
              </svg>
              <p>Add</p>
            </>
          )}
        </button>
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
