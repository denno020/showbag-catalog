import ReactPaginate from 'react-paginate';
import type { ReactPaginateProps } from 'react-paginate';
import { useSearch } from 'wouter';
import { setQueryParam } from '../../utils/setQueryParam';
import classes from './Pagination.module.css';

const Pagination = (props: ReactPaginateProps) => {
  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);
  const page = searchParams.get('page') || 1;

  const handlePageChange = (page: { selected: number }) => {
    setQueryParam([{ name: 'page', value: String(page.selected + 1) }], 'push');
    window.scrollTo(0, 0);
  };

  return (
    <ReactPaginate
      {...props}
      onPageChange={handlePageChange}
      marginPagesDisplayed={1}
      forcePage={Number(page) - 1}
      containerClassName={classes.pagination}
      activeLinkClassName={classes.activePage}
      pageLinkClassName={classes.pageNumber}
      previousLinkClassName={classes.previousLink}
      nextLinkClassName={classes.nextLink}
      disabledLinkClassName={classes.disabledDirectionControl}
    />
  );
};

export default Pagination;
