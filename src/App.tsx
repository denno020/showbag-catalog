import { useEffect, useState } from 'react';
import { useLocation, Link } from 'wouter';
import { Toaster } from 'react-hot-toast';
import { type ShowbagItem } from './showbags.ts';
import Catalog from './components/Catalog.tsx';
import Pagination from './components/Pagination';
import List from './components/List';
import ProductProvider from './components/Product/ProductProvider';
import { useShowbags } from './hooks/useShowbags.ts';
import { pageSize } from './constants/index.ts';
import classes from './App.module.css';

const App = (props: { showbags: ShowbagItem[] }) => {
  const { showbags, page } = useShowbags(props);
  const [location] = useLocation();
  const [listItems, setListItems] = useState<ShowbagItem['slug'][]>(() => {
    const showBagList = localStorage.getItem('show-bag-list');
    return showBagList ? JSON.parse(showBagList) : [];
  });

  const handleToggleInList = (itemSlug: ShowbagItem['slug']) => {
    setListItems((prevItems) => {
      if (prevItems.includes(itemSlug)) {
        return prevItems.filter((prevItemSlug) => prevItemSlug !== itemSlug);
      }

      return [...prevItems, itemSlug];
    });
  };

  useEffect(() => {
    localStorage.setItem('show-bag-list', JSON.stringify(listItems));
  }, [listItems]);

  return (
    <>
      <Toaster />
      <header className={classes.header}>
        <Link to="/" className={classes.logoLink}>
          <img src="/show_logo.svg" alt="" className={classes.image} />
        </Link>
        <div className={classes.date}>August 31st - September 8th</div>
        <div className={classes.listTriggerContainer}>
          <Link to="/list" className={classes.listLink}>
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="35" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
            </svg>
            <div className={classes.listItemsCount}>{listItems.length}</div>
            <p>List</p>
          </Link>
        </div>
      </header>
      <section className="bg-white py-8">
        <div className="container mx-auto flex items-center flex-wrap">
          <nav id="store" className="w-full top-0 px-6 py-1">
            <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
              <p className="uppercase tracking-wide font-bold text-gray-800 text-xl">Showbags</p>

              <div className="flex items-center" id="store-nav-content">
                <a className="pl-3 inline-block no-underline hover:text-black" href="#">
                  <svg
                    className="fill-current hover:text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 11H17V13H7zM4 7H20V9H4zM10 15H14V17H10z" />
                  </svg>
                </a>

                <a className="pl-3 inline-block no-underline hover:text-black" href="#">
                  <svg
                    className="fill-current hover:text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z" />
                  </svg>
                </a>
              </div>
            </div>
          </nav>

          <div>
            {!['/', '/list'].includes(location) && (
              <ProductProvider items={showbags} onToggleInList={handleToggleInList} listItems={listItems} />
            )}
            <div className="flex items-center flex-wrap">
              <Catalog items={showbags} onToggleInList={handleToggleInList} listItems={listItems} />
            </div>
          </div>
        </div>
        <div className={classes.paginationContainer}>
          <Pagination pageCount={props.showbags.length / pageSize} />
        </div>
      </section>

      {location === '/list' && (
        <List items={showbags.filter((listItem) => listItems.includes(listItem.slug))} onRemove={handleToggleInList} />
      )}
    </>
  );
};

export default App;
