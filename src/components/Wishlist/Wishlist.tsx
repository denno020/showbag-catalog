import { useCallback, useRef } from 'react';
import { useOutsideClick } from '@chakra-ui/react-use-outside-click';
import classnames from 'classnames';
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

  const closeWishlist = useCallback(() => {
    history.back();
  }, []);

  const handlePrepareShareURL = () => {};

  useEscapeKey(closeWishlist);

  useOutsideClick({
    ref: wishlistPanel,
    // replace:true so that pressing the back button in the browser doesn't show the wishlist again
    // but rather will show the page that the user was on before opening the wishlist
    handler: closeWishlist
  });

  return (
    <div className={`z-50 ${classes.overlay}`}>
      <aside ref={wishlistPanel} className={`fixed top-0 right-0 z-50 h-full bg-white shadow-lg ${classes.wishlist}`}>
        <header className={classes.header}>
          <button onClick={handlePrepareShareURL} className={classnames(classes.btn, classes.shareBtn)}>
            <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30" fill="currentColor">
              <path d="M720-80q-50 0-85-35t-35-85q0-7 1-14.5t3-13.5L322-392q-17 15-38 23.5t-44 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q23 0 44 8.5t38 23.5l282-164q-2-6-3-13.5t-1-14.5q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-23 0-44-8.5T638-672L356-508q2 6 3 13.5t1 14.5q0 7-1 14.5t-3 13.5l282 164q17-15 38-23.5t44-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-640q17 0 28.5-11.5T760-760q0-17-11.5-28.5T720-800q-17 0-28.5 11.5T680-760q0 17 11.5 28.5T720-720ZM240-440q17 0 28.5-11.5T280-480q0-17-11.5-28.5T240-520q-17 0-28.5 11.5T200-480q0 17 11.5 28.5T240-440Zm480 280q17 0 28.5-11.5T760-200q0-17-11.5-28.5T720-240q-17 0-28.5 11.5T680-200q0 17 11.5 28.5T720-160Zm0-600ZM240-480Zm480 280Z" />
            </svg>

            <span className="text-sm">Share</span>
          </button>
          <h2 className="text-xl font-semibold text-center">Show Bags Wish List</h2>
          <button onClick={closeWishlist} className={classnames(classes.btn, classes.closeBtn)}>
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

            <span className="text-sm">Close</span>
          </button>
        </header>
        <div className="px-6 py-3">
          <div className="flex flex-col gap-4">
            {items.length === 0 && (
              <p>Nothing added to your wishlist!</p>
            )}
            {items.map((item) => (
              <WishlistItem key={item.slug} item={item} onRemove={onRemove} />
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Wishlist;
