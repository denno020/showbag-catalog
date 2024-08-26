import { useEffect, useState } from 'react';
import { useLocation, useSearch, Route, Switch } from 'wouter';
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
      <div className="container mx-auto px-6">
        <p>
          This site isn't associated with the official website. If you would like the official website instead, please{' '}
          <a href="https://www.theshow.com.au/" target="_blank" className="link">
            click here
          </a>
        </p>
      </div>
      <section className="bg-white">
        <div className="container mx-auto flex items-center flex-wrap">
          <Route path={'/search'}>
            <nav id="store" className="w-full top-0 px-6 py-1">
              <div className="w-full container mx-auto flex flex-wrap items-center justify-end mt-0 px-2 py-3">
                <div className="flex items-center w-full" id="store-nav-content">
                  <Search />
                </div>
              </div>
            </nav>
          </Route>

          <Switch>
            <Route path="/list">
              <List
                items={props.showbags.filter((listItem) => listItems.includes(listItem.slug))}
                onRemove={toggleInList}
                userName={userName}
                setUserName={setUserName}
              />
            </Route>
            <Route path="/*">
              <div>
                <Route path="/:bagSlug">
                  {/* {params => <UserPage id={params.bagSlug} />} */}
                  <ProductProvider items={showbags} onToggleInList={toggleInList} listItems={listItems} />
                </Route>
                <div className="flex items-center flex-wrap">
                  <Catalog items={showbags} onToggleInList={toggleInList} listItems={listItems} />
                </div>
              </div>
            </Route>
          </Switch>
        </div>
        <div className={classes.paginationContainer}>
          <Pagination pageCount={totalCount / pageSize} />
        </div>
        <BottomNavigation />
      </section>
    </>
  );
};

export default App;
