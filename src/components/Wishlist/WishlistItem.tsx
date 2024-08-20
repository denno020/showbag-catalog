import type {ShowbagItem} from "../../showbags.ts";
import classes from './WishlistItem.module.css';


type WishlistItemProps = {
  item: ShowbagItem
  onRemove: (slug: ShowbagItem['slug']) => void
}

const WishlistItem = (props: WishlistItemProps) => {
  const {item, onRemove} = props;
  const { image, title, showbag_price, slug } = item;

  return (
    <div className={classes.wishlistItem}>
      <div>
        <img src={image.permalink} alt="Showbag preview" className="w-28 aspect-auto"/>
      </div>
      <div>
        <p>{title}</p>
        <p>${showbag_price}</p>
        <button onClick={() => {
          onRemove(slug)
        }}>
          Remove
        </button>
      </div>
    </div>
  )
}

export default WishlistItem
