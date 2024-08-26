import ReactPaginate from 'react-paginate';
import classnames from 'classnames';
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
      pageCount={Math.ceil(props.pageCount)}
      onPageChange={handlePageChange}
      marginPagesDisplayed={1}
      forcePage={Number(page) - 1}
      containerClassName={classes.pagination}
      activeLinkClassName={classes.activePage}
      pageLinkClassName={classnames('btn mx-1', classes.pageNumber)}
      previousClassName="flex flex-col justify-center"
      previousLinkClassName={classes.previousLink}
      nextClassName="flex flex-col justify-center"
      nextLinkClassName={classes.nextLink}
      disabledLinkClassName={classes.disabledDirectionControl}
    />
  );
};

export default Pagination;
