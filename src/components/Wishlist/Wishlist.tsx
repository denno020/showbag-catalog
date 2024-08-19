import type {ShowbagItem} from "../../showbags.ts";

type WishlistProps = {
  items: ShowbagItem[]
  onRemove: (slug: ShowbagItem['slug']) => void
}

const Wishlist = (props: WishlistProps) => {
  const {items, onRemove} = props;

  return (
    <div
      className="fixed top-0 right-0 z-50 w-96 h-full bg-white shadow-lg">
      <div className="px-6 py-4">
        <h2 className="text-lg font-semibold">Show Bags Wish List</h2>
        <div className="flex flex-col gap-4">
          {items.map(item => (
            <div key={item.slug} className="flex">
              <div>
                <img src={item.image.permalink} alt="Showbag preview" className="w-28 aspect-auto" />
              </div>
              <div>
                <p>{item.title}</p>
                <p>${item.showbag_price}</p>
              </div>
              <button onClick={() => {onRemove(item.slug)}}>
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Wishlist;
