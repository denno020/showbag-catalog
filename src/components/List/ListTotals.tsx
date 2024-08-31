import type { ShowbagItem } from '../../showbags';
import Price from '../Price';
import { useStore } from '../../store/useStore';

type ListTotalsProps = {
  items: ShowbagItem[];
};
const ListTotals = (props: ListTotalsProps) => {
  const { items } = props;
  const collectedBags = useStore((state) => state.collectedBags);

  const uncollected = items.filter((item) => !collectedBags.includes(item.slug));
  const collected = items.filter((item) => collectedBags.includes(item.slug));

  const uncollectedTotal = uncollected.reduce((total, item) => total + Number(item.showbag_price), 0);
  const collectedTotal = collected.reduce((total, item) => total + Number(item.showbag_price), 0);
  console.log({ uncollectedTotal, collectedTotal });

  return (
    <>
      Total: <Price value={uncollectedTotal} />
      {collectedTotal > 0 && (
        <em>
          {' '}
          (Collected: <Price value={collectedTotal} />)
        </em>
      )}
    </>
  );
};

export default ListTotals;
