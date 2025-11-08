import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import type { TReqServices } from "../_types/types";
import { useNavigate } from "react-router-dom";
import { schema, servicesQuerykey, servicesUrl } from "../_fixtures/data";
import useCreateData from "@/services/useCreateData";
import { FormInput, FormLabel } from "@/components/Form";
import Button from "@/components/Button";

function SevicesForm() {
  const navigate = useNavigate();

  const { mutate } = useCreateData({
    url: servicesUrl,
    queryKey: servicesQuerykey,
  });
//   const { data,isFetching } = useGetData({
//     url: `${servicesUrl}/create`,
//     queryKey: servicesQuerykey,
//   });
// console.log(data)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TReqServices>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  return (
    <form
      className="validate-form"
      onSubmit={handleSubmit((values) =>
        mutate(values, { onSuccess: () => navigate("/customers") })
      )}
    >
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        <div className="input-form">
          <FormLabel
            htmlFor="validation-form-1"
            className="flex flex-col w-full sm:flex-row"
          >
            نام
          </FormLabel>
          <FormInput
            {...register("first_name")}
            id="validation-form-1"
            type="text"
            name="first_name"
            className={clsx({
              "border-danger": errors.first_name,
            })}
          />
          {errors.first_name && (
            <div className="mt-2 text-danger">
              {typeof errors.first_name.message === "string" &&
                errors.first_name.message}
            </div>
          )}
        </div>
        <div className="input-form">
          <FormLabel
            htmlFor="validation-form-1"
            className="flex flex-col w-full sm:flex-row"
          >
            نام خانوادگی
          </FormLabel>
          <FormInput
            {...register("last_name")}
            id="validation-form-1"
            type="text"
            name="last_name"
            className={clsx({
              "border-danger": errors.last_name,
            })}
          />
          {errors.last_name && (
            <div className="mt-2 text-danger">
              {typeof errors.last_name.message === "string" &&
                errors.last_name.message}
            </div>
          )}
        </div>
        <div className="input-form">
          <FormLabel
            htmlFor="validation-form-1"
            className="flex flex-col w-full sm:flex-row"
          >
            کد ملی
          </FormLabel>
          <FormInput
            {...register("national_code")}
            id="validation-form-1"
            type="number"
            name="national_code"
            maxLength={10}
            minLength={10}
            className={clsx({
              "border-danger": errors.national_code,
            })}
          />
          {errors.national_code && (
            <div className="mt-2 text-danger">
              {typeof errors.national_code.message === "string" &&
                errors.national_code.message}
            </div>
          )}
        </div>
        <div className="input-form">
          <FormLabel
            htmlFor="validation-form-1"
            className="flex flex-col w-full sm:flex-row"
          >
            شماره همراه
          </FormLabel>
          <FormInput
            {...register("mobile")}
            id="validation-form-1"
            type="number"
            name="mobile"
            maxLength={11}
            minLength={11}
            className={clsx({
              "border-danger": errors.mobile,
            })}
          />
          {errors.mobile && (
            <div className="mt-2 text-danger">
              {typeof errors.mobile.message === "string" &&
                errors.mobile.message}
            </div>
          )}
        </div>
        <div className="input-form">
          <FormLabel
            htmlFor="validation-form-1"
            className="flex flex-col w-full sm:flex-row"
          >
            کد پزشکی
          </FormLabel>
          <FormInput
            {...register("medical_code")}
            id="validation-form-1"
            type="number"
            name="medical_code"
            className={clsx({
              "border-danger": errors.medical_code,
            })}
          />
          {errors.medical_code && (
            <div className="mt-2 text-danger">
              {typeof errors.medical_code.message === "string" &&
                errors.medical_code.message}
            </div>
          )}
        </div>
      </div>

      <Button variant="primary" type="submit" className="mt-5">
        ثبت نام
      </Button>
    </form>
  );
}

export default SevicesForm;
