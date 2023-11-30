export default function formatDate(dateString: string): string {
  const actualDate = new Date(dateString);
  const day = actualDate.getDate().toString().padStart(2, "0");
  const month = (actualDate.getMonth() + 1).toString().padStart(2, "0");
  const year = actualDate.getFullYear().toString();
  return `${day}/${month}/${year}`;
}

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
