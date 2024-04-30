import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names into a single string.
 * @param classes Array<string | Record<string,boolean>>
 * @returns string
 */
export default function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
