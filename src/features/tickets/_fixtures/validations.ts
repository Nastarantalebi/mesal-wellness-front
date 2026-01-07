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
  priorty: null,
};

export const ticketListvalidationSchema = z.object({
  title: z.string(),
  description: z.string(),
  priorty: z.string().nullable(),
});
