import { useRef } from "react";

import useMemoizedFn from "@/hooks/memorized-fn";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type noop = (this: any, ...args: any[]) => any;

type ExtendFn<T extends noop> = T & {
  cancel: () => void;
};

export default function useDebounceFn<T extends noop>(
  fn: T,
  wait: number = 1000
): ExtendFn<T> {
  const timeoutRef = useRef<number>();
  const memoFn = useMemoizedFn(fn);
  const cancel = useMemoizedFn(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  });

  const debounceFn = useMemoizedFn(function (
    this: ThisParameterType<T>,
    ...args: Parameters<T>
  ) {
    if (timeoutRef.current) {
      cancel();
    }
    timeoutRef.current = setTimeout(() => {
      memoFn.apply(this, args);
    }, wait) as unknown as number;
  }) as ExtendFn<T>;

  debounceFn.cancel = cancel;
  return debounceFn;
}
