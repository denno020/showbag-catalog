import { Collapse } from 'react-daisyui';
import ListItem from './ListItem';
import type { ListProps } from './List';
import type { ShowbagItem } from '../../showbags';

/**
 * Takes a list of showbags and returns an object where the keys are stand
 * titles and the values are arrays of showbags sold at that stand.
 *
 * e.g. {
 *   "Stall 1": [{ showbag1 }, { showbag2 }],
 *   "Stall 2": [{ showbag3 }, { showbag4 }]
 * }
 *
 * @param items - The list of showbags to group
 * @returns The grouped showbags
 */
function groupShowbagsByStands(items: ShowbagItem[]) {
  const groupedByStands: Record<string, ShowbagItem[]> = {};

  items.forEach((showbag) => {
    showbag.showbag_stalls.forEach((stand) => {
      if (!groupedByStands[stand.title]) {
        groupedByStands[stand.title] = [];
      }
      groupedByStands[stand.title].push(showbag);
    });
  });

  return groupedByStands;
}

const ListByStands = (props: ListProps) => {
  const { items, onRemove } = props;

  const stalls = groupShowbagsByStands(items);

  console.log({ stalls });

  return (
    <div>
      {Object.entries(stalls).map(([stallName, items]) => (
        <Collapse key={stallName} icon="arrow" checkbox={true}>
          <Collapse.Title className="text-xl font-medium">{stallName}</Collapse.Title>
          <Collapse.Content className="p-0">
            {items.map((item) => (
              <ListItem key={item.slug} item={item} onRemove={onRemove} />
            ))}
          </Collapse.Content>
        </Collapse>
      ))}
    </div>
  );
};

export default ListByStands;
