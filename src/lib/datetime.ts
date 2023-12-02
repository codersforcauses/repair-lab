function stringToDate(date: string | Date): Date {
  if (typeof date === "string") {
    return new Date(date);
  }
  return date;
}

export function formatDate(_date: string | Date): string {
  const date = stringToDate(_date);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  return `${day}/${month}/${year}`;
}

export function formatTime(_date: string | Date): string {
  const date = stringToDate(_date);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function isoToDatePickerValue(_date: string | Date) {
  const date = stringToDate(_date);
  const z = date.getTimezoneOffset() * 60 * 1000;
  const tLocal = +date - z;
  const localDate = new Date(tLocal);
  return localDate.toISOString().slice(0, 16);
}
