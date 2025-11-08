import { useForm } from "react-hook-form";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { schema, queryKey, url, initialValue } from "../_fixtures/data";
import useCreateData from "@/services/useCreateData";
import { FormInput, FormLabel, FormSelect } from "@/components/Form";
import Button from "@/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import type { TReqFacilities } from "../_types/types";

function FacilitiesForm() {
  const navigate = useNavigate();

  const { mutate } = useCreateData({
    url: url,
    queryKey: queryKey,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TReqFacilities>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: initialValue,
  });

  return (
    <form
      className="validate-form"
      onSubmit={handleSubmit((values) =>
        mutate(values, { onSuccess: () => navigate("/services") })
      )}>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        <div className="input-form">
          <FormLabel
            htmlFor="validation-form-1"
            className="flex flex-col w-full sm:flex-row">
            نام
          </FormLabel>
          <FormInput
            {...register("name")}
            id="validation-form-1"
            type="text"
            name="name"
            className={clsx({
              "border-danger": errors.name,
            })}
          />
          {errors.name && (
            <div className="mt-2 text-danger">
              {typeof errors.name.message === "string" && errors.name.message}
            </div>
          )}
        </div>
        <div className="input-form">
          <FormLabel
            htmlFor="validation-form-1"
            className="flex flex-col w-full sm:flex-row">
            شهر
          </FormLabel>
          <FormInput
            {...register("city")}
            id="validation-form-1"
            type="text"
            name="city"
            className={clsx({
              "border-danger": errors.city,
            })}
          />
          {errors.city && (
            <div className="mt-2 text-danger">
              {typeof errors.city.message === "string" && errors.city.message}
            </div>
          )}
        </div>
        <div className="input-form">
          <FormLabel
            htmlFor="validation-form-2"
            className="flex flex-col w-full sm:flex-row">
            آدرس
          </FormLabel>
          <FormInput
            {...register("address")}
            id="validation-form-2"
            type="text"
            name="address"
            className={clsx({
              "border-danger": errors.address,
            })}
          />
          {errors.address && (
            <div className="mt-2 text-danger">
              {typeof errors.address.message === "string" &&
                errors.address.message}
            </div>
          )}
        </div>
        <div className="input-form">
          <FormLabel
            htmlFor="validation-form-3"
            className="flex flex-col w-full sm:flex-row">
            نام مربی
          </FormLabel>
          <FormInput
            {...register("manager_name")}
            id="validation-form-3"
            type="text"
            name="manager_name"
            className={clsx({
              "border-danger": errors.manager_name,
            })}
          />
          {errors.manager_name && (
            <div className="mt-2 text-danger">
              {typeof errors.manager_name.message === "string" &&
                errors.manager_name.message}
            </div>
          )}
        </div>
        <div className="input-form">
          <FormLabel
            htmlFor="validation-form-4"
            className="flex flex-col w-full sm:flex-row">
            تلفن
          </FormLabel>
          <FormInput
            {...register("phone")}
            id="validation-form-4"
            type="text"
            name="phone"
            className={clsx({
              "border-danger": errors.phone,
            })}
          />
          {errors.phone && (
            <div className="mt-2 text-danger">
              {typeof errors.phone.message === "string" && errors.phone.message}
            </div>
          )}
        </div>
        <div className="input-form">
          <FormLabel
            htmlFor="validation-form-5"
            className="flex flex-col w-full sm:flex-row">
            کد
          </FormLabel>
          <FormInput
            {...register("code")}
            id="validation-form-5"
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
        <div className="input-form">
          <FormLabel
            htmlFor="validation-form-6"
            className="flex flex-col w-full sm:flex-row">
            توضیحات
          </FormLabel>
          <FormInput
            {...register("description")}
            id="validation-form-6"
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
            htmlFor="validation-form-7"
            className="flex flex-col w-full sm:flex-row">
            وضعیت
          </FormLabel>
          <FormSelect
            {...register("is_active", {
              setValueAs: (v) => v === "true",
            })}
            id="validation-form-7"
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

      <Button
        variant="primary"
        type="submit"
        className="mt-5"
        onSubmit={() => console.log("object")}>
        ثبت نام
      </Button>
    </form>
  );
}

export default FacilitiesForm;
