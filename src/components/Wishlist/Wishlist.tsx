import { useCallback, useRef } from 'react';
import { useLocation } from "wouter";
import { useOutsideClick } from '@chakra-ui/react-use-outside-click';
import WishlistItem from './WishlistItem.tsx'
import { useEscapeKey } from '../../hooks/useEscapeKey.ts';
import type {ShowbagItem} from "../../showbags.ts";
import classes from './Wishlist.module.css';

type WishlistProps = {
  items: ShowbagItem[]
  onRemove: (slug: ShowbagItem['slug']) => void
}

const Wishlist = (props: WishlistProps) => {
  const wishlistPanel = useRef(null);
  const {items, onRemove} = props;
  const [, navigate] = useLocation();

  const closeWishlist = useCallback(() => {
    navigate('/', { replace: true });
  }, [navigate])

  useEscapeKey(closeWishlist)

  useOutsideClick({
    ref: wishlistPanel,
    // replace:true so that pressing the back button in the browser doesn't show the wishlist again
    // but rather will show the page that the user was on before opening the wishlist
    handler: closeWishlist
  });

  return (
    <div className={`z-50 ${classes.overlay}`}>
      <div
        ref={wishlistPanel}
        className={`fixed top-0 right-0 z-50 h-full bg-white shadow-lg ${classes.wishlist}`}>
          <button onClick={closeWishlist}>
            Close
          </button>
        <div className="px-6 py-4">
          <h2 className="text-lg font-semibold">Show Bags Wish List</h2>
          <div className="flex flex-col gap-4">
            {items.map(item => (
              <WishlistItem key={item.slug} item={item} onRemove={onRemove} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wishlist;
