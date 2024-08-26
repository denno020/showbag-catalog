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
};

export const useClose = (props?: UseCloseProps) => {
  const { fallbackCloseTo = '/' } = props || {};
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
    handler: close
  });

  useEscapeKey(close);

  return {
    ref,
    close
  };
};
