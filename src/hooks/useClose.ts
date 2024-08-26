import { useCallback, useRef } from 'react';
import { useOutsideClick } from '@chakra-ui/react-use-outside-click';
import { useLocation, useSearch } from 'wouter';
import { useEscapeKey } from './useEscapeKey';

type UseCloseProps = {
  /**
   * Where should the app go on close, if the user wasn't internally linked to the page,
   * and therefore doesn't have anywhere to history.back to
   */
  fallbackCloseTo?: string;
  /**
   * Should clicking outside the component trigger a close
   * @default true
   */
  useClickOutside?: boolean;
  /**
   * Should hitting the escape key trigger a close
   * @default true
   */
  useEscapeButton?: boolean;
};

export const useClose = (props?: UseCloseProps) => {
  const { fallbackCloseTo = '/', useClickOutside = true, useEscapeButton = true } = props || {};
  const ref = useRef(null);
  const searchParam = useSearch();
  const [, setLocation] = useLocation();

  const close = useCallback(() => {
    if (!history.state?.internalLink) {
      setLocation(fallbackCloseTo);
      return;
    }
    history.back();
  }, [fallbackCloseTo]);

  useOutsideClick({
    ref,
    handler: useClickOutside ? close : () => {}
  });

  useEscapeKey(() => useEscapeButton && close);

  return {
    ref,
    close
  };
};
