import type { ShowbagItem } from '../../showbags';

type ListItemProps = {
  item: ShowbagItem['items'][0];
};
const ListItem = (props: ListItemProps) => {
  const { item_title, item_quantity } = props.item;

  if (item_quantity === 0) {
    return (
        <>
          {item_title}
        </>
      );
  }

  return (
    <>
      {item_quantity} x {item_title}
    </>
  );
};

export default ListItem;
