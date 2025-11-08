import { useForm } from "react-hook-form";
import clsx from "clsx";
import type { TReqServices } from "../_types/types";
import { useNavigate } from "react-router-dom";
import {
  initialValues,
  schema,
  servicesQuerykey,
  servicesUrl,
} from "../_fixtures/data";
import useCreateData from "@/services/useCreateData";
import { FormInput, FormLabel, FormSelect } from "@/components/Form";
import Button from "@/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import useGetData from "@/services/useGetData";
import type { TOption } from "@/types";

function SevicesForm() {
  const navigate = useNavigate();

  const { mutate } = useCreateData({
    url: servicesUrl,
    queryKey: servicesQuerykey,
  });
  const { data } = useGetData<{ categories: TOption[] }>({
    url: `${servicesUrl}/create`,
    queryKey: `${servicesQuerykey},"test"`,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TReqServices>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });

  return (
    <form
      className="validate-form"
      onSubmit={handleSubmit((values) =>
        mutate(values, { onSuccess: () => navigate("/services") })
      )}>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {/*  */}
        <div className="input-form">
          <FormLabel
            htmlFor="validation-form-1"
            className="flex flex-col w-full sm:flex-row">
            نام سرویس
          </FormLabel>
          <FormInput
            {...register("title")}
            id="validation-form-8"
            name="title"
            className={clsx({
              "border-danger": errors.title,
            })}
          />
          {errors.title && (
            <div className="mt-2 text-danger">
              {typeof errors.title.message === "string" && errors.title.message}
            </div>
          )}
        </div>
        {/*  */}
        <div className="input-form">
          <FormLabel
            htmlFor="validation-form-8"
            className="flex flex-col w-full sm:flex-row">
            دسته بندی سرویس
          </FormLabel>
           <FormSelect
            {...register("category_id")}
            id="validation-form-1"
            name="category_id"
            className={clsx({
              "border-danger": errors.category_id,
            })}>
            {data?.categories?.map((item, index) => (
              <option value={String(item.value)} key={index}>
                {item.label}
              </option>
            ))}
          </FormSelect>
          
          {errors.category_id && (
            <div className="mt-2 text-danger">
              {typeof errors.category_id.message === "string" &&
                errors.category_id.message}
            </div>
          )}
        </div>
        {/*  */}
        <div className="input-form">
          <FormLabel
            htmlFor="validation-form-2"
            className="flex flex-col w-full sm:flex-row">
            کد
          </FormLabel>
          <FormInput
            {...register("code")}
            id="validation-form-2"
            type="text"
            name="code"
            className={clsx({
              "border-danger": errors.code,
            })}
          />
          {errors.code && (
            <div className="mt-2 text-danger">
              {typeof errors.code.message === "string" && errors.code.message}
            </div>
          )}
        </div>
        {/*  */}
        <div className="input-form">
          <FormLabel
            htmlFor="validation-form-3"
            className="flex flex-col w-full sm:flex-row">
            مدت زمان
          </FormLabel>
          <FormInput
            {...register("duration_minutes")}
            id="validation-form-3"
            type="number"
            name="duration_minutes"
            className={clsx({
              "border-danger": errors.duration_minutes,
            })}
          />
          {errors.duration_minutes && (
            <div className="mt-2 text-danger">
              {typeof errors.duration_minutes.message === "string" &&
                errors.duration_minutes.message}
            </div>
          )}
        </div>
        {/*  */}
        <div className="input-form">
          <FormLabel
            htmlFor="validation-form-4"
            className="flex flex-col w-full sm:flex-row">
            ارزش پایه
          </FormLabel>
          <FormInput
            {...register("base_price")}
            id="validation-form-4"
            type="number"
            name="base_price"
            className={clsx({
              "border-danger": errors.base_price,
            })}
          />
          {errors.base_price && (
            <div className="mt-2 text-danger">
              {typeof errors.base_price.message === "string" &&
                errors.base_price.message}
            </div>
          )}
        </div>
        {/*  */}
        <div className="input-form">
          <FormLabel
            htmlFor="validation-form-5"
            className="flex flex-col w-full sm:flex-row">
            واحد پول
          </FormLabel>
          <FormInput
            {...register("currency")}
            id="validation-form-5"
            type="text"
            name="currency"
            className={clsx({
              "border-danger": errors.currency,
            })}
          />
          {errors.currency && (
            <div className="mt-2 text-danger">
              {typeof errors.currency.message === "string" &&
                errors.currency.message}
            </div>
          )}
        </div>
        {/*  */}
        <div className="input-form">
          <FormLabel
            htmlFor="validation-form-6"
            className="flex flex-col w-full sm:flex-row">
            جنسیت مجاز
          </FormLabel>
          <FormSelect
            {...register("gender_policy")}
            id="validation-form-6"
            name="gender_policy"
            className={clsx({
              "border-danger": errors.gender_policy,
            })}>
            <option value="male_only">فقط آقایان</option>
            <option value="female_only">فقط بانوان</option>
          </FormSelect>
          {errors.gender_policy && (
            <div className="mt-2 text-danger">
              {typeof errors.gender_policy.message === "string" &&
                errors.gender_policy.message}
            </div>
          )}
        </div>
        {/*  */}
        <div className="input-form">
          <FormLabel
            htmlFor="validation-form-7"
            className="flex flex-col w-full sm:flex-row">
            توضیحات
          </FormLabel>
          <FormInput
            {...register("description")}
            id="validation-form-7"
            type="text"
            name="description"
            className={clsx({
              "border-danger": errors.description,
            })}
          />
          {errors.description && (
            <div className="mt-2 text-danger">
              {typeof errors.description.message === "string" &&
                errors.description.message}
            </div>
          )}
        </div>

        {/*  */}
        <div className="input-form">
          <FormLabel
            htmlFor="validation-form-9"
            className="flex flex-col w-full sm:flex-row">
            وضعیت
          </FormLabel>
          <FormSelect
            {...register("is_active", {
              setValueAs: (v) => v === "true",
            })}
            id="validation-form-9"
            name="is_active"
            className={clsx({
              "border-danger": errors.is_active,
            })}>
            <option value="true">فعال</option>
            <option value="false">غیرفعال </option>
          </FormSelect>
          {errors.is_active && (
            <div className="mt-2 text-danger">
              {typeof errors.is_active.message === "string" &&
                errors.is_active.message}
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
