import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ParsedUrlQueryInput } from "querystring";

import isBlank from "@/lib/is-blank";

export default function useSearchParamsState<T extends ParsedUrlQueryInput>(
  initialStates: T
) {
  const keys = Object.keys(initialStates);
  const router = useRouter();

  const setState = useCallback(
    (valueOrFn: T | ((state: T) => T)) => {
      const state = router.query;
      const newState =
        typeof valueOrFn === "function" ? valu8eOrFn(state) : valueOrFn;
      router.replace(
        {
          pathname: router.pathname,
          query: {}
        },
        undefined,
        { shallow: true, scroll: false }
      );
    },
    [router]
  );

  const [state0, setState0] = useState<T>(() => {
    const params = new URLSearchParams(window.location.search);
    const result = {} as T;
    keys.forEach((key) => {
      const storedValue = params.get(key);
      if (storedValue !== null) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (result as any)[key] = JSON.parse(storedValue);
        } catch (e) {
          console.error(
            `Failed to parse stored value for key ${key}: ${storedValue}`
          );
        }
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (result as any)[key] = initialStates[key];
      }
    });

    return result;
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    keys.forEach((key) => {
      const value = state[key];

      if (isBlank(value)) {
        params.delete(key);
      } else {
        params.set(key, JSON.stringify(value));
      }
    });
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return [state, setState];
}
