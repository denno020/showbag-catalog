import { useState } from 'react';
import classnames from 'classnames';
import toast from 'react-hot-toast';
import { Button, Input } from 'react-daisyui';
import ListItem from './ListItem.tsx';
import ListByStands from './ListByStands.tsx';
import { useClipboard } from '../../hooks/useClipboard.js';
import type { ShowbagItem } from '../../showbags.ts';
import classes from './List.module.css';
import { updateQueryStringWithList } from '../../utils/updateQueryStringWithArray.ts';
import { useStore } from '../../store/useStore.ts';
import OptionsDrawer from './OptionsDrawer.tsx';
import ListTotals from './ListTotals.tsx';
import { useDisplayedListItems } from '../../hooks/useDisplayedListItems.ts';

export type ListProps = {
  items: ShowbagItem[];
};

const List = (props: ListProps) => {
  const { items } = props;
  const { copyTextToClipboard } = useClipboard();
  const [isEditingName, setIsEditingName] = useState(false);
  const userName = useStore((state) => state.name);
  const setUserName = useStore((state) => state.setName);
  const groupByStalls = useStore((state) => state.listOptions.groupByStands);
  const hideCollected = useStore((state) => state.listOptions.hideCollected);
  const displayedItems = useDisplayedListItems({ items });
  const setOption = useStore((state) => state.setListOption);

  const [name, setName] = useState(userName);

  const handlePrepareShareURL = async () => {
    if (!userName) {
      toast.success('Please set your name first');
      setIsEditingName(true);
      return;
    }

    updateQueryStringWithList(userName, items);

    if (navigator.canShare && navigator.canShare()) {
      await navigator.share({
        title: `${userName} Show Bag List for Royal Adelaide Show`,
        url: location.href
      });
      return;
    }

    copyTextToClipboard(location.href);
    toast.success(
      `URL has been copied to your clipboard! Please note, changes won't be persisted after the URL is shared, you'll need to share a new URL`,
      {
        duration: 10000
      }
    );
  };

  const handleChangeName = () => {
    setIsEditingName(true);
  };

  const saveName = () => {
    setIsEditingName(false);
    setUserName(name);

    localStorage.setItem('showbag-user-name', name);
  };

  const cancelChangeName = () => {
    setIsEditingName(false);
    // setUserName(userName);
  };

  return (
    <section className={classes.list}>
      {items.length > 0 && (
        <header className={classes.header}>
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="w-full text-center">
              {!isEditingName && (
                <button onClick={handleChangeName} className="btn btn-xs btn-outline">
                  {!userName ? 'Set' : 'Change'}&nbsp;Your Name
                </button>
              )}
              {isEditingName && (
                <form onSubmit={saveName}>
                  <Input
                    autoFocus={true}
                    type="text"
                    size="sm"
                    placeholder="Enter your name"
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Input>
                  <div className="join flex w-full mt-1">
                    <button className="btn btn-sm join-item flex-1">Save</button>
                    <button className="btn btn-sm join-item flex-1" onClick={cancelChangeName} type="button">
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
            <h2 className="text-xl font-semibold text-center py-4">
              {!userName ? 'My' : `${userName}'s`} Show Bags List
            </h2>
          </div>
        </header>
      )}
      <div className="px-6">
        {items.length > 0 && (
          <div className="flex gap-1 justify-between">
            <Button size="sm" color="primary" onClick={handlePrepareShareURL} className={classnames(classes.shareBtn)}>
              <span>Share List</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 -960 960 960"
                width="20"
                fill="currentColor"
              >
                <path d="M720-80q-50 0-85-35t-35-85q0-7 1-14.5t3-13.5L322-392q-17 15-38 23.5t-44 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q23 0 44 8.5t38 23.5l282-164q-2-6-3-13.5t-1-14.5q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-23 0-44-8.5T638-672L356-508q2 6 3 13.5t1 14.5q0 7-1 14.5t-3 13.5l282 164q17-15 38-23.5t44-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-640q17 0 28.5-11.5T760-760q0-17-11.5-28.5T720-800q-17 0-28.5 11.5T680-760q0 17 11.5 28.5T720-720ZM240-440q17 0 28.5-11.5T280-480q0-17-11.5-28.5T240-520q-17 0-28.5 11.5T200-480q0 17 11.5 28.5T240-440Zm480 280q17 0 28.5-11.5T760-200q0-17-11.5-28.5T720-240q-17 0-28.5 11.5T680-200q0 17 11.5 28.5T720-160Zm0-600ZM240-480Zm480 280Z" />
              </svg>
            </Button>
            <div>
              <OptionsDrawer />
            </div>
          </div>
        )}
        {items.length > 0 && !hideCollected && (
          <div className="py-2 italic">
            Collected bags shown. To hide,{' '}
            <Button size="sm" color="ghost" className="p-0 underline" onClick={() => setOption('hideCollected', true)}>
              click here
            </Button>
          </div>
        )}
        {items.length > 0 && displayedItems.length > 0 && hideCollected && (
          <div className="py-2 italic">
            Collected bags hidden. To show,{' '}
            <Button size="sm" color="ghost" className="p-0 underline" onClick={() => setOption('hideCollected', false)}>
              click here
            </Button>
          </div>
        )}
        <div className={classnames('my-4', classes.listItems)}>
          {items.length === 0 && <p className="py-5">Nothing added to your list!</p>}

          {groupByStalls && displayedItems.length > 0 && <ListByStands items={displayedItems} />}

          {!groupByStalls && displayedItems.map((item) => <ListItem key={item.slug} item={item} />)}

          {items.length > 0 && displayedItems.length === 0 && (
            <div className="py-5 text-center">
              <p>All bags have been collected!</p>
              <div>
                <Button
                  size="sm"
                  color="ghost"
                  className="p-0 underline"
                  onClick={() => setOption('hideCollected', false)}
                >
                  Click here to view collected bags
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      {items.length > 0 && (
        <footer className="container mx-auto px-6 py-3 border-t border-gray-400 font-bold text-lg text-center">
          <ListTotals items={items} />
        </footer>
      )}
    </section>
  );
};

export default List;
