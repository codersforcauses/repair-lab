import { useMemo } from "react";

/**
 * This function is used to create a constant value that will not be reinitialized on re-renders.
 * @param input
 */
export default function useConst<T>(input: T) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => input, []);
}
