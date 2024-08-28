import { Select } from 'react-daisyui';
import { useStore } from '../../store/useStore';

export const SortDirections = {
  aZ: 'aZ',
  zA: 'zA',
  price_asc: 'price_asc',
  price_desc: 'price_desc',
  value_asc: 'value_asc',
  value_desc: 'value_desc',
  value_diff_asc: 'value_diff_asc',
  value_diff_desc: 'value_diff_desc'
} as const;

const SortDirectionLabels = {
  [SortDirections.aZ]: 'A-Z',
  [SortDirections.zA]: 'Z-A',
  [SortDirections.price_asc]: 'Low Price',
  [SortDirections.price_desc]: 'High Price',
  [SortDirections.value_asc]: 'Most Value',
  [SortDirections.value_desc]: 'Least Value',
  [SortDirections.value_diff_asc]: 'Least Value Diff',
  [SortDirections.value_diff_desc]: 'Most Value Diff'
};

const Sort = () => {
  const sortOption = useStore((state) => state.sortOption);
  const setSortOption = useStore((state) => state.setSortOption);

  return (
    <div className="flex gap-2 items-center">
      Sort:
      <Select
        defaultValue={sortOption}
        size="sm"
        onChange={(e) => setSortOption(e.target.value)}
        className="text-center"
      >
        {Object.entries(SortDirectionLabels).map(([value, label]) => (
          <Select.Option key={value} value={value}>
            {label}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};

export default Sort;
