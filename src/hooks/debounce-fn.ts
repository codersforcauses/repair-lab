import { useRef } from "react";

import useMemoizedFn from "@/hooks/memorized-fn";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type noop = (this: any, ...args: any[]) => any;

export default function useDebounceFn<T extends noop>(
  fn: T,
  wait: number = 1000
): T {
  const timeoutRef = useRef<number>();
  const memoFn = useMemoizedFn(fn);
  return useMemoizedFn(function (
    this: ThisParameterType<T>,
    ...args: Parameters<T>
  ) {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      memoFn.apply(this, args);
    }, wait) as unknown as number;
  }) as T;
}
