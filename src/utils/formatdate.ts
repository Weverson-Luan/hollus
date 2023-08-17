const handleFormattedDate = (data: any, increment?: boolean) => {
  const initialDate = new Date(data);
  var day = increment
    ? String(initialDate.getDate() + 1).padStart(2, "0")
    : String(initialDate.getDate()).padStart(2, "0");
  var month = String(initialDate.getMonth() + 1).padStart(2, "0");
  var year = initialDate.getFullYear();
  let todays = day + "/" + month + "/" + year;
  return todays;
};

const daysOfWeek = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

const getDayOfWeek = (day: string) => {
  switch (day.toUpperCase()) {
    case "SUNDAY":
      return "Domingo";
    case "MONDAY":
      return "Segunda-feira";
    case "TUESDAY":
      return "Terça-feira";
    case "WEDNESDAY":
      return "Quarta-feira";
    case "THURSDAY":
      return "Quinta-feira";
    case "FRIDAY":
      return "Sexta-feira";
    case "SATURDAY":
      return "Sábado";
    default:
      return "";
  }
};

const getDayOfWeekFromIndex = (index: number) => {
  return daysOfWeek[index];
};

const formatTimeString = (time: Date) => {
  const hours =
    time.getHours() + 3 < 10 ? `0${time.getHours() + 3}` : time.getHours() + 3;

  const minutes =
    time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();

  return `${hours}:${minutes}`;
};

const getNextMonth = (date) => {
  const copy = new Date(date);
  const nextDate = new Date(copy.setMonth(copy.getMonth() + 1));
  return nextDate;
};

const getPreviousMonth = (date) => {
  const copy = new Date(date);
  const prevDate = new Date(copy.setMonth(copy.getMonth() - 1));
  return prevDate;
};
/**
 * EXPORTS
 */
export {
  handleFormattedDate,
  getDayOfWeek,
  getDayOfWeekFromIndex,
  formatTimeString,
  getNextMonth,
  getPreviousMonth,
};
