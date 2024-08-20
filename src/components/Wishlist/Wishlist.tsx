import { useCallback, useRef } from 'react';
import { useOutsideClick } from '@chakra-ui/react-use-outside-click';
import WishlistItem from './WishlistItem.tsx';
import { useEscapeKey } from '../../hooks/useEscapeKey.ts';
import type { ShowbagItem } from '../../showbags.ts';
import classes from './Wishlist.module.css';

type WishlistProps = {
  items: ShowbagItem[];
  onRemove: (slug: ShowbagItem['slug']) => void;
};

const Wishlist = (props: WishlistProps) => {
  const wishlistPanel = useRef(null);
  const { items, onRemove } = props;

  const closeWishlist = useCallback(( ) => {
    history.back();
  }, []);

  useEscapeKey(closeWishlist);

  useOutsideClick({
    ref: wishlistPanel,
    // replace:true so that pressing the back button in the browser doesn't show the wishlist again
    // but rather will show the page that the user was on before opening the wishlist
    handler: closeWishlist
  });

  return (
    <div className={`z-50 ${classes.overlay}`}>
      <div ref={wishlistPanel} className={`fixed top-0 right-0 z-50 h-full bg-white shadow-lg ${classes.wishlist}`}>
        <button onClick={closeWishlist} className={classes.closeBtn}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M15 3v18" />
            <path d="m8 9 3 3-3 3" />
          </svg>

          <span className="sr-only">Close</span>
        </button>
        <div className="px-6 py-3">
          <h2 className="text-xl font-semibold text-center">Show Bags Wish List</h2>
          <div className="flex flex-col gap-4 py-5">
            {items.map((item) => (
              <WishlistItem key={item.slug} item={item} onRemove={onRemove} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
