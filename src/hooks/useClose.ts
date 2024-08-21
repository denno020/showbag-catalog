import { useCallback, useRef } from 'react';
import { useOutsideClick } from '@chakra-ui/react-use-outside-click';
import { useEscapeKey } from './useEscapeKey';

export const useClose = () => {
  const ref = useRef(null);

  const close = useCallback(() => {
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
