import { useMemo } from "react";
import { useRouter } from "next/router";

import useConst from "@/hooks/const";
import useMemoizedFn from "@/hooks/memorized-fn";

/**
 * useSearchParamsState
 * - Provide state and setState for search params
 * @param initialState a const variable, its change will not trigger re-render
 * @returns [state, setState]
 */
export default function useSearchParamsState<
  T extends Partial<Record<string, string | string[]>>
>(_initialState: T) {
  type StateType = {
    [K in keyof T]: T[K] extends undefined ? string | undefined : T[K];
  };

  const router = useRouter();
  const initialState = useConst(_initialState);

  const state = useMemo(() => {
    const arrayKeys = Object.keys(initialState).filter((key) =>
      Array.isArray(initialState[key])
    );
    // router.query is incorrectly initialze as a empty value even when rendering in client and window object is accessable, still thinking how to solve this, ref: https://nextjs.org/docs/pages/api-reference/functions/use-router
    const query = router.query;
    const newState = {} as Record<string, unknown>;
    for (const key in initialState) {
      if (arrayKeys.includes(key) && !Array.isArray(query[key])) {
        newState[key] = query[key] ? [query[key]] : initialState[key];
      } else {
        newState[key] = query[key] ? query[key] : initialState[key];
      }
    }
    return newState as StateType;
  }, [initialState, router.query]);

  const setState = useMemoizedFn(
    (valueOrFn: StateType | ((state: StateType) => StateType)) => {
      const state = router.query;
      const newState =
        typeof valueOrFn === "function"
          ? valueOrFn(state as StateType)
          : valueOrFn;
      router.replace(
        {
          pathname: router.pathname,
          query: {
            ...router.query,
            ...newState
          }
        },
        undefined,
        { shallow: true, scroll: false }
      );
    }
  );

  return [state, setState] as const;
}
