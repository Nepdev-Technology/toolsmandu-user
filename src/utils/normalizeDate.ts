export function normalizeDate(isoDateString: any) {
  if (isoDateString) {
    const date = new Date(isoDateString);
    return date.toISOString().split('T')[0];
  } else {
    return 'Invalid Date';
  }
}
export function daysRemaining(expiryDate: string) {
  // Parse the expiry date string into a Date object
  if (expiryDate) {
    const expiry = new Date(expiryDate);

    // Get today's date and set the time to the start of the day (to ignore time differences)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Calculate the difference in time (in milliseconds)
    //@ts-ignore
    const timeDifference = expiry - today;

    // Convert time difference from milliseconds to days
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference;
  } else {
    return 'Invalid date';
  }
}
