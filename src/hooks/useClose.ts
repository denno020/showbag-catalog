import { useCallback, useRef } from 'react';
import { useOutsideClick } from '@chakra-ui/react-use-outside-click';
import { useLocation, useSearch } from 'wouter';
import { useEscapeKey } from './useEscapeKey';

export const useClose = () => {
  const ref = useRef(null);
  const searchParam = useSearch();
  const [, setLocation] = useLocation();

  const close = useCallback(() => {
    if (searchParam) {
      setLocation('/');
      return;
    }
    history.back();
  }, []);

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
