import { useState } from 'react';
import {useLocation, Link} from 'wouter';
import {type ShowbagItem} from "./showbags.ts";
import Catalog from './components/Catalog.tsx';
import Wishlist from './components/Wishlist';
import classes from './App.module.css';

const App = (props: { showbags: ShowbagItem[] }) => {
  const {showbags} = props;
  const [location] = useLocation();
  const [shoppingBagItems, setShoppingBagItems] = useState<ShowbagItem['slug'][]>([]);

  const handleToggleInShoppingBag = (itemSlug: ShowbagItem['slug']) => {
    setShoppingBagItems(prevItems => {
      if (prevItems.includes(itemSlug)) {
        return prevItems.filter(prevItemSlug => prevItemSlug !== itemSlug);
      }

      return [...prevItems, itemSlug]
    });
  }

  return (
    <>
      <header className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-6 py-3 sticky top-0 z-50 bg-white">
        <img src="/show_logo.svg" alt="" className={classes.image}/>
        <div className={classes.date}>
          August 31st - September 8th
        </div>
        <div>
          <Link to="/wishlist" className={classes.bagLink}>
            <svg width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15.75 10.5V6C15.75 3.92893 14.0711 2.25 12 2.25C9.92893 2.25 8.25 3.92893 8.25 6V10.5M19.606 8.50723L20.8692 20.5072C20.9391 21.1715 20.4183 21.75 19.7504 21.75H4.24963C3.58172 21.75 3.06089 21.1715 3.13081 20.5072L4.39397 8.50723C4.45424 7.93466 4.93706 7.5 5.51279 7.5H18.4872C19.0629 7.5 19.5458 7.93466 19.606 8.50723ZM8.625 10.5C8.625 10.7071 8.4571 10.875 8.25 10.875C8.04289 10.875 7.875 10.7071 7.875 10.5C7.875 10.2929 8.04289 10.125 8.25 10.125C8.4571 10.125 8.625 10.2929 8.625 10.5ZM16.125 10.5C16.125 10.7071 15.9571 10.875 15.75 10.875C15.5429 10.875 15.375 10.7071 15.375 10.5C15.375 10.2929 15.5429 10.125 15.75 10.125C15.9571 10.125 16.125 10.2929 16.125 10.5Z"
                stroke="#0F172A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div className={classes.shoppingItemsCount}>
              {shoppingBagItems.length}
            </div>
          </Link>
        </div>
      </header>
      <section className="bg-white py-8">
        <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
          <nav id="store" className="w-full z-30 top-0 px-6 py-1">
            <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">

              <p className="uppercase tracking-wide font-bold text-gray-800 text-xl">
                Showbags
              </p>

              <div className="flex items-center" id="store-nav-content">

                <a className="pl-3 inline-block no-underline hover:text-black" href="#">
                  <svg className="fill-current hover:text-black" xmlns="http://www.w3.org/2000/svg" width="24"
                       height="24"
                       viewBox="0 0 24 24">
                    <path d="M7 11H17V13H7zM4 7H20V9H4zM10 15H14V17H10z"/>
                  </svg>
                </a>

                <a className="pl-3 inline-block no-underline hover:text-black" href="#">
                  <svg className="fill-current hover:text-black" xmlns="http://www.w3.org/2000/svg" width="24"
                       height="24"
                       viewBox="0 0 24 24">
                    <path
                      d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z"/>
                  </svg>
                </a>

              </div>
            </div>
          </nav>

          <Catalog items={showbags} onToggleInShoppingBag={handleToggleInShoppingBag} shoppingBagItems={shoppingBagItems} />
        </div>

      </section>

      {location === '/wishlist' && (
        <Wishlist items={showbags.filter(bagItem => shoppingBagItems.includes(bagItem.slug))} />
      )}
    </>
  )
}

export default App;
