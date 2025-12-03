import { mobileRequireValidationSchema } from "@/fixtures/zodValidations";
import { z } from "zod";
import type { IForgotPassword, ISendMobile, ISendPassword } from "../_types/types";
const passwordSchema = z
  .string()
  .min(8, "کلمه عبور باید حداقل ۸ کاراکتر باشد")
  .regex(/[a-z]/, "کلمه عبور باید حداقل یک حرف کوچک انگلیسی داشته باشد")
  .regex(/[A-Z]/, "کلمه عبور باید حداقل یک حرف بزرگ انگلیسی داشته باشد")
  .regex(/[^A-Za-z0-9]/, "کلمه عبور باید حداقل یک کاراکتر خاص داشته باشد");
const otpSchema = z.string().length(6, "کد یکبار مصرف باید 6 رقم باشد.");

const mobileSchema = z.object({
  mobile: mobileRequireValidationSchema.min(11),
});

export const sendMobileInitialValues: ISendMobile = {
  mobile: "",
};

export const sendMobilevalidationSchema = mobileSchema;

export const sendPasswordInitialValues: ISendPassword = {
  mobile: "",
  password: "",
};

export const sendPasswordvalidationSchema = z.object({
  ...mobileSchema.shape,
  password: z.string().min(1, "رمز عبور را وارد کنید"),
});
export const forgotPasswordInitialValues: IForgotPassword = {
  mobile: "",
  new_password: "",
  confirm_password: "",
  otp: "",
};

export const forgotPasswordvalidationSchema = z
  .object({
    ...mobileSchema.shape,
    new_password: passwordSchema,
    confirm_password: z.string().min(1, "تکرار کلمه عبور را وارد کنید"),
    otp: otpSchema,
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "رمز جدید با تکرار آن یکسان نیست",
    path: ["confirm_password"],
  });

export const OtpInitialValues = {
  otp: "",
};

export const OtpValidationSchema = z.object({
  otp: otpSchema,
});
export const OtpPassInitialValues = {
  otp: "",
  new_password: "",
  confirm_password: "",
};
export const OtpPassValidationSchema = z
  .object({
    otp: otpSchema,
    new_password: passwordSchema,
    confirm_password: z.string().min(1, "تکرار کلمه عبور را وارد کنید"),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "رمز جدید با تکرار آن یکسان نیست",
    path: ["confirm_password"],
  });
