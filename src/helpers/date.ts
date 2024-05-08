import dayjs from "dayjs";

export const getDate = (date: string | number | Date | dayjs.Dayjs) => {
  return dayjs(date);
};
