import { useEffect, useState } from 'react';
import type { RefObject } from 'react';

export interface UseInViewOptions {
  once?: boolean;
  rootMargin?: string;
}

export function useInView(
  ref: RefObject<Element | null>,
  { once = false, rootMargin = '0px 0px -8% 0px' }: UseInViewOptions = {},
): boolean {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    let hasIntersected = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) {
          return;
        }

        if (entry.isIntersecting) {
          hasIntersected = true;
          setIsInView(true);

          if (once) {
            observer.disconnect();
          }
        } else if (!once || !hasIntersected) {
          setIsInView(false);
        }
      },
      { root: null, rootMargin, threshold: 0 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [once, ref, rootMargin]);

  return isInView;
}