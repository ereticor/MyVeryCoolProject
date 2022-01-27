type IDateToHuman = (
  date: string | number | Date,
  options?: Intl.DateTimeFormatOptions,
  locales?: string | string[]
) => string;

const dateToHuman: IDateToHuman = function (
  date,
  options = {},
  locales = "en"
) {
  const formatter = new Intl.DateTimeFormat(locales, {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...options,
  });

  return formatter.format(typeof date === "string" ? new Date(date) : date);
};

export default dateToHuman;
