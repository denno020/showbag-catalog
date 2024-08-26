import { Route as Woute, useLocation } from 'wouter';
import type { RouteProps as WouteProps } from 'wouter';

type RouteProps = WouteProps & {
  paths?: string[];
};

const Route = (props: RouteProps) => {
  const [location] = useLocation();
  console.log({ location });

  if (!props.paths) {
    return <Woute {...props} />;
  }

  if (props.paths.some((path) => location === path)) {
    return <Woute {...props} />;
  }

  return null;
};

export default Route;
