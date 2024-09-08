import { useEffect } from 'react';
import Route from './components/Route';
import { Toaster } from 'react-hot-toast';
import { type ShowbagItem } from './showbags.ts';
import Link from './components/Link';
import BottomNavigation from './components/BottomNavigation';
import Catalog from './components/Catalog';
import Pagination from './components/Pagination';
import List from './components/List';
import ProductProvider from './components/Product/ProductProvider';
import Search from './components/Search';
import Footer from './components/Footer';
import Logo from './components/Logo/Logo.tsx';
import DonationLink from './components/DonationLink/DonationLink.tsx';
import { useStore } from './store/useStore.ts';
import { useShowbags } from './hooks/useShowbags.ts';
import { useList } from './hooks/useList.ts';
import { postEvent } from './utils/analytics.ts';
import classes from './App.module.css';

const App = (props: { showbags: ShowbagItem[] }) => {
  const { showbags, totalCount } = useShowbags(props);
  const pageSize = useStore((state) => state.pageSize);

  const [listItems] = useList();

  useEffect(() => {
    const userBreadcrumb = localStorage.getItem('showbags-user-breadcrumb');

    postEvent(`referrer__${document.referrer || 'direct'}`);

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
            <Logo />
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
        <div className="container mx-auto py-4">
          <div
            className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
            role="alert"
          >
            <div className="flex">
              <div className="py-1">
                <svg
                  className="fill-current h-6 w-6 text-teal-500 mr-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                </svg>
              </div>
              <div>
                <p className="font-bold">The Royal Adelaide Show has come to a close for 2024</p>
                <p className="text-sm">
                  I will leave this site up and running for future reference (and maybe future improvements upon the
                  official site!)
                </p>
                <p className="py-4">
                  As a reminder, if you found this app useful and want to say thanks, please consider donating to the{' '}
                  <DonationLink>Cerebal Palsy Alliance</DonationLink>
                </p>
              </div>
            </div>
          </div>
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
            <List items={props.showbags.filter((listItem) => listItems.includes(listItem.slug))} />
          </Route>
          <Route notPaths={['/list']}>
            <Catalog items={showbags} />
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

        <Footer />

        <BottomNavigation />
      </section>
    </>
  );
};

export default App;
