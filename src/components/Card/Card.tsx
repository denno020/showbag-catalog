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
    <div
      className={`w-full sm:w-1/2 md:w-1/3 xl:w-1/4 p-6 flex flex-col items-center gap-4 hover:shadow-lg relative ${classes.card}`}
    >
      <Link
        to={slug}
        className="flex flex-col gap-3"
        onClick={() => {
          /*Don't scroll to top*/
        }}
      >
        <img alt="Bag preview" className="w-full" src={image.permalink} />
        <div className="pt-3 flex items-center justify-between">
          <p className="text-xl">{title}</p>
        </div>
        <div className="flex items-baseline gap-2">
          <p className="pt-1 text-gray-900 text-3xl">${showbag_price}</p>
          <p className="pt-1 text-gray-900">
            <em>${showbag_value} value</em>
          </p>
        </div>
        <div className="flex justify-center">
          <div className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">
            More Info
          </div>
        </div>
      </Link>
      <button className="flex gap-2" onClick={() => onToggleInList(slug)}>
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
        <p>{isInList ? 'Remove from' : 'Add to'} List</p>
      </button>
    </div>
  );
};

export default Card;
