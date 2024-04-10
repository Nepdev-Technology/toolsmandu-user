export function normalizeDate(isoDateString: any) {
  const date = new Date(isoDateString);
  return date.toISOString().split('T')[0];
}
