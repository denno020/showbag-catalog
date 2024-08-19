import type {ShowbagItem} from "../../showbags.ts";


const Wishlist = (props: {items: ShowbagItem[]}) => {
  const {items} = props;

  console.log({items})

  return (
    <div
      className="fixed top-0 right-0 z-50 w-96 h-full bg-white shadow-lg">
      <div className="px-6 py-4">
        <h2 className="text-lg font-semibold">Show Bags Wish List</h2>
        {items.map(item => (
          <div key={item.slug}>
            <p>{item.title}</p>
            <p>{item.showbag_price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Wishlist;
