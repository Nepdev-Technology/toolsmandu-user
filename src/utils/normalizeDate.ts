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

    // Get today's date in Nepali time (UTC+5:45)
    const now = new Date();
    const nepaliOffset = 5.75 * 60 * 60 * 1000; // 5 hours 45 minutes in milliseconds
    const today = new Date(now.getTime() + nepaliOffset);
    today.setUTCHours(0, 0, 0, 0); // Set to start of the day in Nepali time

    // Adjust expiry date to Nepali timezone
    const expiryNepali = new Date(expiry.getTime() + nepaliOffset);
    expiryNepali.setUTCHours(0, 0, 0, 0); // Set to start of the day in Nepali time

    // Calculate the difference in time (in milliseconds)
    const timeDifference = expiryNepali.getTime() - today.getTime();

    // Convert time difference from milliseconds to days
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference;
  } else {
    return 'Invalid date';
  }
}
