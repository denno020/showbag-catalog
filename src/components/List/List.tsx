import { useState } from 'react';
import classnames from 'classnames';
import toast from 'react-hot-toast';
import FocusTrap from 'focus-trap-react';
import ListItem from './ListItem.tsx';
import { useClose } from '../../hooks/useClose.ts';
import { useClipboard } from '../../hooks/useClipboard.js';
import type { ShowbagItem } from '../../showbags.ts';
import classes from './List.module.css';
import { updateQueryStringWithList } from '../../utils/updateQueryStringWithArray.ts';

type ListProps = {
  items: ShowbagItem[];
  onRemove: (slug: ShowbagItem['slug']) => void;
  userName: string;
  setUserName: (name: string) => void;
};

const List = (props: ListProps) => {
  const { items, onRemove, userName, setUserName } = props;
  const { copyTextToClipboard } = useClipboard();
  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState(userName);

  const { ref, close } = useClose();

  const handlePrepareShareURL = async () => {
    if (userName === 'My') {
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
    toast.success('URL has been copied to your clipboard!');
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
    setUserName(userName);
  };

  return (
    <div className={`z-50 ${classes.overlay}`}>
      <FocusTrap>
        <aside ref={ref} className={`fixed top-0 right-0 z-50 h-full bg-white shadow-lg ${classes.list}`}>
          <header className={classes.header}>
            <button onClick={handlePrepareShareURL} className={classnames(classes.btn, classes.shareBtn)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30"
                viewBox="0 -960 960 960"
                width="30"
                fill="currentColor"
              >
                <path d="M720-80q-50 0-85-35t-35-85q0-7 1-14.5t3-13.5L322-392q-17 15-38 23.5t-44 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q23 0 44 8.5t38 23.5l282-164q-2-6-3-13.5t-1-14.5q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-23 0-44-8.5T638-672L356-508q2 6 3 13.5t1 14.5q0 7-1 14.5t-3 13.5l282 164q17-15 38-23.5t44-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-640q17 0 28.5-11.5T760-760q0-17-11.5-28.5T720-800q-17 0-28.5 11.5T680-760q0 17 11.5 28.5T720-720ZM240-440q17 0 28.5-11.5T280-480q0-17-11.5-28.5T240-520q-17 0-28.5 11.5T200-480q0 17 11.5 28.5T240-440Zm480 280q17 0 28.5-11.5T760-200q0-17-11.5-28.5T720-240q-17 0-28.5 11.5T680-200q0 17 11.5 28.5T720-160Zm0-600ZM240-480Zm480 280Z" />
              </svg>

              <span className="text-sm">Share</span>
            </button>
            <div className="flex justify-center gap-2">
              <h2 className="text-xl font-semibold text-center">
                {userName === 'My' ? 'My' : `${userName}'s`} Show Bags List
              </h2>
              <div>
                {!isEditingName && (
                  <button onClick={handleChangeName}>{userName === 'My' ? 'Set' : 'Change'}&nbsp;Name</button>
                )}
                {isEditingName && (
                  <form onSubmit={saveName}>
                    <input
                      autoFocus={true}
                      type="text"
                      className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(e) => setName(e.target.value)}
                    ></input>
                    <button>Save</button>
                    <button onClick={cancelChangeName} type="button">
                      Cancel
                    </button>
                  </form>
                )}
              </div>
            </div>
            <button onClick={close} className={classnames(classes.btn, classes.closeBtn)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M15 3v18" />
                <path d="m8 9 3 3-3 3" />
              </svg>

              <span className="text-sm">Close</span>
            </button>
          </header>
          <div className="px-6 py-3">
            <div className="flex flex-col gap-4">
              {items.length === 0 && <p>Nothing added to your list!</p>}
              {items.map((item) => (
                <ListItem key={item.slug} item={item} onRemove={onRemove} />
              ))}
            </div>
          </div>
        </aside>
      </FocusTrap>
    </div>
  );
};

export default List;
