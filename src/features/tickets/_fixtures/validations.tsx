import { z } from "zod";
import type { TChat, TReqList } from "../_types/type";

export const chatInitialValues: TChat = {
  message: "",
  image: null,
};
const allowedExtensions = ["jpg", "jpeg", "png", "webp"];
const maxSize = 10 * 1024 * 1024;
export const chatvalidationSchema = z.object({
  message: z.string(),
  image: z
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
      message: "حجم فایل نباید بیشتر از 10 مگابایت باشد",
    }),
});

export const ticketListInitialValues: TReqList = {
  title: "",
  description: "",
  priorty: "",
};

export const ticketListvalidationSchema = z.object({
  title: z.string().min(1, " "),
  description: z.string().min(1, " "),
  priorty: z.string().min(1, " "),
});
