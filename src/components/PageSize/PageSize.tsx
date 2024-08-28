import { Select } from 'react-daisyui';
import { useStore } from '../../store/useStore';

const PageSize = () => {
  const pageSize = useStore((state) => state.pageSize);
  const setPageSize = useStore((state) => state.setPageSize);

  return (
    <div className="flex gap-2 items-center">
      Page Size:
      <Select defaultValue={pageSize} size="sm" onChange={(e) => setPageSize(Number(e.target.value))}>
        <Select.Option>12</Select.Option>
        <Select.Option>24</Select.Option>
        <Select.Option>36</Select.Option>
        <Select.Option>48</Select.Option>
        <Select.Option value="9999">All</Select.Option>
      </Select>
    </div>
  );
};

export default PageSize;
