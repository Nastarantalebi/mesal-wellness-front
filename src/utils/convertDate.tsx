import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
export function toGregorianDate(dateString: string): string {
  if (!dateString) return dateString;
  const date = new DateObject({
    date: dateString,
    calendar: persian,
    locale: persian_fa,
    format: "YYYY/MM/DD",
  });
  return date.convert(gregorian, gregorian_en).format("YYYY-MM-DD");
}
export function toPersianDate(dateString: string): string {
  if (!dateString) return dateString;
  const date = new DateObject({
    date: dateString,
    calendar: gregorian,
    locale: gregorian_en,
    format: "YYYY-MM-DD",
  });
  return date.convert(persian, persian_fa).format("YYYY/MM/DD");
}
export function toTimeWithLocalOffset(timeString: string): string | null {
  if (!timeString) return null;

  const [h, m, s] = timeString.split(":").map(Number);
  const sec = s || 0;

  const date = new Date();
  date.setHours(h, m, sec, 0);
  const offsetMinutes = -date.getTimezoneOffset();
  const sign = offsetMinutes >= 0 ? "+" : "-";
  const absOffset = Math.abs(offsetMinutes);
  const offsetH = Math.floor(absOffset / 60)
    .toString()
    .padStart(2, "0");
  const offsetM = (absOffset % 60).toString().padStart(2, "0");
  const pad = (num: number) => num.toString().padStart(2, "0");
  return `T${pad(h)}:${pad(m)}:${pad(sec)}${sign}${offsetH}:${offsetM}`;
}
export function toGregorianDateTimeISO(dateTimeString: string): string | null {
  if (!dateTimeString) return null;

  const [datePart, timePart] = dateTimeString.split(" ");

  if (!datePart || !timePart) return null;

  const dateObj = new DateObject({
    date: datePart,
    calendar: persian,
    locale: persian_fa,
    format: "YYYY/MM/DD",
  }).convert(gregorian, gregorian_en);
  const [h, m, s] = timePart.split(":").map(Number);
  dateObj.hour = h;
  dateObj.minute = m;
  dateObj.second = s || 0;
  const offsetMinutes = -dateObj.toDate().getTimezoneOffset();
  const sign = offsetMinutes >= 0 ? "+" : "-";
  const absOffset = Math.abs(offsetMinutes);
  const offsetH = Math.floor(absOffset / 60)
    .toString()
    .padStart(2, "0");
  const offsetM = (absOffset % 60).toString().padStart(2, "0");

  const pad = (num: number) => num.toString().padStart(2, "0");

  return `${dateObj.format("YYYY-MM-DD")}T${pad(dateObj.hour)}:${pad(
    dateObj.minute,
  )}:${pad(dateObj.second)}${sign}${offsetH}:${offsetM}`;
}

export function toPersianDateTimeISO(isoString: string): string | null {
  if (!isoString) return null;

  // تبدیل رشته ISO به Date جاوااسکریپت
  const date = new Date(isoString);

  // ساخت DateObject با تقویم میلادی
  const dateObj = new DateObject({
    date,
    calendar: gregorian,
    locale: gregorian_en,
  }).convert(persian, persian_fa); // تبدیل به شمسی

  const pad = (num: number) => num.toString().padStart(2, "0");

  return `${pad(dateObj.hour)}:${pad(
    dateObj.minute,
  )} ${dateObj.format("YYYY/MM/DD")}`;
}
//تبدیل از ساعت لوکال
export function toUTCFromLocal(timeString: string): string | null {
  if (!timeString) return null;

  const [h, m, s] = timeString.split(":").map(Number);
  const sec = s || 0;

  const localDate = new Date();
  localDate.setHours(h, m, sec, 0);

  const utcH = localDate.getUTCHours().toString().padStart(2, "0");
  const utcM = localDate.getUTCMinutes().toString().padStart(2, "0");
  return `${utcH}:${utcM}`;
}
//تبدیل به ساعت لوکال
export function toLocalFromUTC(timeString: string): string | null {
  if (!timeString) return null;

  const [h, m, s] = timeString.split(":").map(Number);
  const sec = s || 0;

  const utcDate = new Date();
  utcDate.setUTCHours(h, m, sec, 0);

  const localH = utcDate.getHours().toString().padStart(2, "0");
  const localM = utcDate.getMinutes().toString().padStart(2, "0");

  return `${localH}:${localM}`;
}
