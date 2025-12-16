import z from "zod";
import type { TAvatar, TChangePass } from "../_types/type";

export const changePassValidationSchema = z
  .object({
    old_password: z.string().min(1, "رمز قبلی را وارد کنید"),
    new_password: z
      .string()
      .min(8, "کلمه عبور باید حداقل ۸ کاراکتر باشد")
      .regex(/[a-z]/, "کلمه عبور باید حداقل یک حرف کوچک انگلیسی داشته باشد")
      .regex(/[A-Z]/, "کلمه عبور باید حداقل یک حرف بزرگ انگلیسی داشته باشد")
      .regex(/[^A-Za-z0-9]/, "کلمه عبور باید حداقل یک کاراکتر خاص داشته باشد"),

    confirm_password: z.string().min(1, "تکرار کلمه عبور را وارد کنید"),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "رمز جدید با تکرار آن یکسان نیست",
    path: ["confirm_password"],
  })
  .refine((data) => data.new_password !== data.old_password, {
    message: "رمز جدید نباید با رمز قبلی یکسان باشد",
    path: ["new_password"],
  });
export const changePassInitialValue: TChangePass = {
  confirm_password: "",
  new_password: "",
  old_password: "",
};
export const avatarInitialValue: TAvatar = {
  avatar: null,
};
const allowedExtensions = ["jpg", "jpeg", "png", "webp"];
const maxSize = 2 * 1024 * 1024;
export const avatarValidationSchema = z.object({
  avatar: z
    .instanceof(File)
    .nullable()
    .refine(
      (file) => {
        if (!file) return true; // اگر چیزی انتخاب نشده بود، مشکلی نیست
        const extension = file.name.split(".").pop()?.toLowerCase();
        return extension ? allowedExtensions.includes(extension) : false;
      },
      { message: "فقط فایل تصویری با پسوند jpg, jpeg, png, webp مجاز است" }
    )
    .refine((file) => !file || file.size <= maxSize, {
      message: "حجم فایل نباید بیشتر از ۲ مگابایت باشد",
    }),
});
