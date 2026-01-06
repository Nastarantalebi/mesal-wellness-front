import z from "zod";

export const url = "/basics/acl/permissions/";
export const queryKey = "permissionsQueryKey";

export const schema = z.object({
  title: z.string(),
  is_global: z.number(),
});
