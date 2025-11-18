import z from "zod";

export const schema = z.object({
  mobile: z.string().min(11,"فیلد اجباری است."),
  password: z.string().min(4,"فیلد اجباری است."),
});
