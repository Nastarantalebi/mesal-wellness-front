import { z } from "zod";
export const booleanSchema = z.union([
  z.literal("true").transform(() => true),
  z.literal("false").transform(() => false),
  z.boolean(),
]);
export const booleanNullableSchema = z.union([
  z.literal("true").transform(() => true),
  z.literal("false").transform(() => false),
  z.boolean(),
  z.null(),
]);

export const mobileValidationSchema = z.union([
  z.literal(""),
  z.string().regex(/^09\d{9}$/, "شماره موبایل وارد شده صحیح نیست"),
]);
export const mobileRequireValidationSchema = z
  .string()
  .regex(/^09\d{9}$/, "شماره موبایل وارد شده صحیح نیست");

export const phoneValidationSchema = z.union([
  z.literal(""),
  z.string().regex(/^0\d{2}\d{8}$/, "شماره تلفن ثابت وارد شده صحیح نیست"),
]);
export const phoneRequireValidationSchema = z
  .string()
  .regex(/^0\d{2}\d{8}$/, "شماره تلفن ثابت وارد شده صحیح نیست");
// تابع اعتبارسنجی کد ملی
const isValidNationalCode = (value: string) => {
  if (/^(\d)\1{9}$/.test(value)) return false; // همه ارقام یکسان نباشند

  const check = +value[9];
  const sum = value
    .slice(0, 9)
    .split("")
    .reduce((acc, digit, i) => acc + +digit * (10 - i), 0);

  const remainder = sum % 11;

  return (
    (remainder < 2 && check === remainder) ||
    (remainder >= 2 && check === 11 - remainder)
  );
};

// 1) اختیاری
export const nationalCodeValidationSchema = z.union([
  z.literal("").nullable(),
  z
    .string()
    .regex(/^\d{10}$/, "کد ملی باید ۱۰ رقم باشد")
    .refine(isValidNationalCode, { message: "کد ملی وارد شده صحیح نیست" }),
]);

// 2) اجباری
export const nationalCodeRequireValidationSchema = z
  .string()
  .regex(/^\d{10}$/, "کد ملی باید ۱۰ رقم باشد")
  .refine(isValidNationalCode, { message: "کد ملی وارد شده صحیح نیست" });
