import { useCallback, useEffect, useRef } from "react";

export const useClickOutside = <T extends HTMLElement = HTMLElement>({
  onClickOutside,
  onClickInside,
}: {
  onClickOutside: () => void;
  onClickInside?: () => void;
}) => {
  const node = useRef<T>(null);

  const mouseDownEventHandler = useCallback((event: Event) => {
    if(node?.current?.contains(event.target as Node)) {
      // click inside the scope
      onClickInside?.();
      return;
    }
    // outside click
    onClickOutside();
  }, [onClickInside, onClickOutside]);

  // Do something after component renders
  useEffect(() => {
    document.addEventListener("mousedown", mouseDownEventHandler);

    // clean up function before running new effect
    return () => {
      document.removeEventListener("mousedown", mouseDownEventHandler);
    };
  }, [mouseDownEventHandler]);

  return { node };
};
