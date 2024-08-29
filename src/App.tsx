import { useEffect } from 'react';
import Route from './components/Route';
import { Toaster } from 'react-hot-toast';
import { type ShowbagItem } from './showbags.ts';
import Link from './components/Link';
import { useStore } from './store/useStore.ts';
import BottomNavigation from './components/BottomNavigation';
import Catalog from './components/Catalog';
import Pagination from './components/Pagination';
import List from './components/List';
import ProductProvider from './components/Product/ProductProvider';
import { useShowbags } from './hooks/useShowbags.ts';
import Search from './components/Search';
import { useList } from './hooks/useList.ts';
import Footer from './components/Footer';
import { postEvent } from './utils/analytics.ts';
import classes from './App.module.css';

const App = (props: { showbags: ShowbagItem[] }) => {
  const { showbags, totalCount } = useShowbags(props);
  const toggleInList = useStore((state) => state.toggleInList);
  const pageSize = useStore((state) => state.pageSize);

  const [listItems] = useList();

  useEffect(() => {
    const userBreadcrumb = localStorage.getItem('showbags-user-breadcrumb');

    if (location.search !== '') {
      postEvent('viewing-shared-url');
    }

    if (userBreadcrumb) {
      postEvent('returning-user');
      return;
    }

    localStorage.setItem('showbags-user-breadcrumb', '1');
    postEvent('new-user');
  }, []);

  return (
    <>
      <Toaster />
      <header className={classes.header}>
        <div className={classes.titleContainer}>
          <Link to="/" className={classes.logoLink}>
            <img src="/show_logo.svg" alt="" className={classes.image} />
          </Link>
          <p className={classes.title}>Better Showbag Selector</p>
        </div>
        <div className={classes.date}>August 31st - September 8th</div>
      </header>
      <Route path="/">
        <div className="container mx-auto px-6">
          <p>
            This site isn't associated with the official website. If you would like the official website instead, please{' '}
            <a href="https://www.theshow.com.au/" target="_blank" className="link">
              click here
            </a>
          </p>
        </div>
      </Route>
      <section>
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
          <Route path="/list">
            <List
              items={props.showbags.filter((listItem) => listItems.includes(listItem.slug))}
              onRemove={toggleInList}
            />
          </Route>
          <Route notPaths={['/list']}>
            <Catalog items={showbags} listItems={listItems} />
          </Route>
          <Route path="/:bagSlug">
            {(params) => <ProductProvider items={props.showbags} bagSlug={(params as { bagSlug: string }).bagSlug} />}
          </Route>
        </div>

        <Route paths={['/', '/search']}>
          <div className={classes.paginationContainer}>
            <Pagination pageCount={totalCount / pageSize} />
          </div>
        </Route>

        <Route path="/">
          <Footer />
        </Route>

        <BottomNavigation />
      </section>
    </>
  );
};

export default App;
