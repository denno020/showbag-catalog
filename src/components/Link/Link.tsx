import { Link as WouterLink } from 'wouter';
import type { LinkProps } from 'wouter';

/**
 * Wrap Link component from Wouter to add scroll to top on click
 *
 * To bail out of scrolling to top, simply pass an empty `onClick` prop
 */
const Link = (props: LinkProps) => (
  <WouterLink
    onClick={() => window.scroll(0, 0)}
    {...props}
    state={{ internalLink: true, ...(props.state as object) }}
  />
);

export default Link;
