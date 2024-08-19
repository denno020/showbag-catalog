import { useLocation, Router } from 'wouter';
import type { ShowbagItem } from '../showbags'
import Card from './Card'

const Catalog = (props: { items: ShowbagItem[] }) => {
  const { items } = props;
  const [location, setLocation] = useLocation();
  console.log({ location })

  return items.map((item) => <Card item={item}/>)
}

export default Catalog;
