import { z } from "zod";
import type { TChat, TReqList } from "../_types/type";

export const chatInitialValues: TChat = {
  message: "",
};

export const chatvalidationSchema = z.object({
  message: z.string(),
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
