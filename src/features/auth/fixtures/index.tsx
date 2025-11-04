import yup from "../../../libs/yup";

export const schema = yup.object({
  mobile: yup.string().required().min(11),
  password: yup.string().required(),
});
