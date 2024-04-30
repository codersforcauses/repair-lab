export function formatDate(dateString: string): string {
  const actualDate = new Date(dateString);
  const day = actualDate.getDate().toString().padStart(2, "0");
  const month = (actualDate.getMonth() + 1).toString().padStart(2, "0");
  const year = actualDate.getFullYear().toString();

  return `${day}/${month}/${year}`;
}
