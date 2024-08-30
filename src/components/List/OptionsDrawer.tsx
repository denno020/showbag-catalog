import { useState } from 'react';
import { Button, Drawer, Toggle } from 'react-daisyui';
import { useStore } from '../../store/useStore';

const OptionsDrawer = () => {
  const [visible, setVisible] = useState(false);
  const groupByStalls = useStore((state) => state.listOptions.groupByStalls);
  const hideCollected = useStore((state) => state.listOptions.hideCollected);
  const setOption = useStore((state) => state.setListOption);

  return (
    <Drawer
      open={visible}
      end={true}
      onClickOverlay={() => setVisible(false)}
      sideClassName="top-[129px]"
      side={
        <div className="relative p-4 w-80 h-full bg-base-200 text-base-content z-2">
          <Button color="ghost" onClick={() => setVisible(false)} className="absolute top-1 right-1">
            <svg width="30" height="30" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 8.707l3.646 3.647.708-.707L8.707 8l3.647-3.646-.707-.708L8 7.293 4.354 3.646l-.707.708L7.293 8l-3.646 3.646.707.708L8 8.707z"
              />
            </svg>
            <span className="sr-only">close</span>
          </Button>
          <div className="text-lg">List Options</div>
          <div>
            <div className="text-md">Display</div>
            <div className="py-3">
              <div className="flex justify-between items-center">
                <label htmlFor="group-by-stalls" className="w-full">
                  Group By Stalls
                </label>
                <Toggle
                  size="sm"
                  id="group-by-stalls"
                  checked={groupByStalls}
                  onChange={() => setOption('groupByStalls', !groupByStalls)}
                />
              </div>
              <small>
                <em>
                  When enabled, showbags might appear multiple times in your list, if they're available at multiple
                  stalls.
                </em>
              </small>
            </div>

            <div className="py-3">
              <div className="flex justify-between items-center">
                <label htmlFor="hide-collected" className="w-full">
                  Hide Collected Bags
                </label>
                <Toggle
                  size="sm"
                  id="hide-collected"
                  checked={hideCollected}
                  onChange={() => setOption('hideCollected', !hideCollected)}
                />
              </div>
              <small>
                <em>Unhide if you need to see details of a bag that you've already collected</em>
              </small>
            </div>
          </div>
        </div>
      }
    >
      <Button size="sm" onClick={() => setVisible(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </Button>
    </Drawer>
  );
};

export default OptionsDrawer;
