/**
 *
 * @param {*} startDate
 * @param {*} endDate
 * @returns Returns an array of dates between the two dates
 *
 * @URLRef https://gist.github.com/miguelmota/7905510
 */
export const getDatesBetween = (startDate, endDate) => {
  const dates = [];

  // Strip hours minutes seconds etc.
  let currentDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()
  );

  while (currentDate <= endDate) {
    dates.push(currentDate);
    currentDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1 // Will increase month if over range
    );
  }
  if (startDate >= endDate) return startDate;
  return dates;
};
