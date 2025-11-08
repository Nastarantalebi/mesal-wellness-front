import yup from "@/libs/yup";

export const customersUrl = "/wellness/customers";
export const customersQuerykey = "customers";

export const schema = yup.object({
  medical_code: yup.string().required(),
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  mobile: yup.string().required(),
  national_code: yup.string().required(),
});
