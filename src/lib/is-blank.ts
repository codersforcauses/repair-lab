/**
 * Return True if value is falsy value, empty array or empty object
 * @param value
 * @returns
 */
export default function isBlank(value: unknown): value is null | undefined {
  if (value === null || value === undefined) return true;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.keys(value).length === 0;
  return !value;
}
