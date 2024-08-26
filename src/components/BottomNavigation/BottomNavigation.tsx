import { BottomNavigation as BottomNavigationDaisyUI } from 'react-daisyui';
import { useLocation } from 'wouter';
import { useStore } from '../../store/useStore';
import classes from './BottomNavigation.module.css';

const BottomNavigation = () => {
  const [location, setLocation] = useLocation();
  const totalListItems = useStore((state) => state.listItems.length);

  return (
    <BottomNavigationDaisyUI className="z-40">
      <BottomNavigationDaisyUI.Item active={location === '/'} onClick={() => setLocation('/')}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
        </svg>
        <p>Bags</p>
      </BottomNavigationDaisyUI.Item>
      <BottomNavigationDaisyUI.Item active={location === '/search'} onClick={() => setLocation('/search')}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-5 w-5" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
        <div>Search</div>
      </BottomNavigationDaisyUI.Item>
      <BottomNavigationDaisyUI.Item active={location === '/list'} onClick={() => setLocation('/list')}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 16 16">
          <path
            fill-rule="evenodd"
            d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
          />
        </svg>
        <p>My List ({totalListItems})</p>
      </BottomNavigationDaisyUI.Item>
    </BottomNavigationDaisyUI>
  );
};

export default BottomNavigation;
