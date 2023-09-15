import { MutableRefObject, useEffect, useRef } from "react";

export interface UseInfiniteScrollOptions {
  callback?: () => void;
  triggerRef: MutableRefObject<HTMLElement>;
}

export default function useInfiniteScroll(props: UseInfiniteScrollOptions) {
  const { callback, triggerRef } = props;

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const triggerElement = triggerRef.current;

    if (callback) {
      const options = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      };

      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      }, options);

      observer.current.observe(triggerElement);
    }

    return () => {
      if (observer.current && triggerElement) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.current.unobserve(triggerElement);
      }
    };
  }, [callback, triggerRef]);
}
