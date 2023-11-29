/**
 * Convert a date string or date object to into a format that a datetime-local input element can use
 */
export const toDatetimeLocalString = (input: string | Date) => {
  let date = input;
  if (typeof date == "string") {
    date = new Date(date);
    if (isNaN(date.getTime())) throw new Error("Invalid date string");
  }
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, -1);
};
