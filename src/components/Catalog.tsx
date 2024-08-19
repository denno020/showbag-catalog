import { useLocation, Router } from 'wouter';
import type { ShowbagItem } from '../showbags'
import Card from './Card'

const Catalog = (props: { items: ShowbagItem[] }) => {
  const { items } = props;
  const [location, setLocation] = useLocation();

  return items.map((item) => <Card key={item.id} item={item}/>)
}

export default Catalog;
