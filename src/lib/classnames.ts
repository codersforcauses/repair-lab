/**
 * Combines multiple class names into a single string.
 * @param classes Array<string | Record<string,boolean>>
 * @returns string
 */
export default function cn(
  ...classes: Array<string | Record<string, boolean | undefined>>
) {
  return classes
    .map((c) => {
      if (typeof c === "string") return c;
      return Object.entries(c)
        .filter(([, v]) => v)
        .map(([k]) => k)
        .join(" ");
    })
    .join(" ");
}
