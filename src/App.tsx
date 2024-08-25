import { useEffect, useState } from 'react';
import { useLocation, useSearch } from 'wouter';
import { Toaster } from 'react-hot-toast';
import { type ShowbagItem } from './showbags.ts';
import Link from './components/Link';
import { useStore } from './store/useStore.ts';
import BottomNavigation from './components/BottomNavigation';
import Catalog from './components/Catalog.tsx';
import Pagination from './components/Pagination';
import List from './components/List';
import ProductProvider from './components/Product/ProductProvider';
import { useShowbags } from './hooks/useShowbags.ts';
import { pageSize } from './constants/index.ts';
import classes from './App.module.css';
import Search from './components/Search/Search.tsx';
import { useList } from './hooks/useList.ts';

const App = (props: { showbags: ShowbagItem[] }) => {
  const { showbags, totalCount } = useShowbags(props);
  const searchParam = useSearch();
  const toggleInList = useStore((state) => state.toggleInList);

  const [location] = useLocation();
  const [listItems] = useList();

  const [userName, setUserName] = useState(() => {
    // localStorage.getItem('showbag-user-name') || 'My'
    const search = new URLSearchParams(searchParam);
    const name = search.get('name') || 'My';
    return name;
  });

  return (
    <>
      <Toaster />
      <header className={classes.header}>
        <Link to="/" className={classes.logoLink}>
          <img src="/show_logo.svg" alt="" className={classes.image} />
        </Link>
        <div className={classes.date}>August 31st - September 8th</div>
      </header>
      <section className="bg-white py-8">
        <div className="container mx-auto flex items-center flex-wrap">
          <nav id="store" className="w-full top-0 px-6 py-1">
            <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
              <p className="uppercase tracking-wide font-bold text-gray-800 text-xl">Showbags</p>

              <div className="flex items-center" id="store-nav-content">
                <Search />
              </div>
            </div>
          </nav>

          <div>
            {!['/', '/list'].includes(location) && (
              <ProductProvider items={showbags} onToggleInList={toggleInList} listItems={listItems} />
            )}
            <div className="flex items-center flex-wrap">
              <Catalog items={showbags} onToggleInList={toggleInList} listItems={listItems} />
            </div>
          </div>
        </div>
        <div className={classes.paginationContainer}>
          <Pagination pageCount={totalCount / pageSize} />
        </div>
        <BottomNavigation />
      </section>

      {location === '/list' && (
        <List
          items={props.showbags.filter((listItem) => listItems.includes(listItem.slug))}
          onRemove={toggleInList}
          userName={userName}
          setUserName={setUserName}
        />
      )}
    </>
  );
};

export default App;
