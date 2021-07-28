function convertMonthStringToNumber(month: string) {
  return [
    'JANUARY',
    'FEBRUARY',
    'MARCH',
    'APRIL',
    'MAY',
    'JUNE',
    'JULY',
    'AUGUST',
    'SEPTEMBER',
    'OCTOBER',
    'NOVEMBER',
    'DECEMBER',
  ].indexOf(month.toUpperCase());
}

function convertMonthNumberToString(month: number) {
  return [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ][month];
}

const numberOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// make sure there are right number of days in a month and everything else
function validateDate({
  date,
  month,
  year,
}: {
  date: number;
  month: number;
  year: number;
}): boolean {
  if (date > 31 || date < 1) {
    return false;
  }

  // check for number of days in month
  if (
    date > numberOfDays[month] &&
    // leap years
    !(month === 1 && year % 4 == 0 && date === 29)
  ) {
    return false;
  }

  // check if any values are blank
  if (isNaN(date) || isNaN(year)) return false;

  return true;
}

function toTimestamp({
  date,
  month,
  year,
}: {
  date: number;
  month: number;
  year: number;
}): number {
  return new Date(year, month, date).getTime();
}

export {
  convertMonthStringToNumber,
  convertMonthNumberToString,
  validateDate,
  toTimestamp,
  numberOfDays,
};
