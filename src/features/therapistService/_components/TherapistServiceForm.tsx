import { useForm } from "react-hook-form";
import clsx from "clsx";
import type { TDataById, TReqTherapistService } from "../_types/types";
import { useLocation, useNavigate } from "react-router-dom";
import { schema, queryKey, url, initialValue } from "../_fixtures/data";
import useCreateData from "@/services/useCreateData";
import { FormInput, FormLabel, FormSelect } from "@/components/Form";
import Button from "@/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import useUpdateData from "@/services/useUpdateData";
import useGetById from "@/services/useGetById";
import { useEffect } from "react";

function TherapistServiceForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedRecord = location.state?.record.id;
  const { mutate: create } = useCreateData({
    url: url,
    queryKey: queryKey,
  });
  const { mutate: update } = useUpdateData({
    url: url,
    queryKey: queryKey,
    id: selectedRecord,
  });
  const { data: dataById } = useGetById<TDataById>({
    queryKey: [queryKey, selectedRecord],
    url: url,
    id: selectedRecord,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TReqTherapistService>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: initialValue,
  });
  // useEffect(() => {
  //   if (dataById) {
  //     const preparedData: TReqTherapistService = {
  //       is_active: !!dataById.type.is_active,
  //       name: dataById.type.name,
  //       code: dataById.type.code,
  //       icon: dataById.type.icon ?? null,
  //     };
  //     reset(preparedData);
  //   }
  // }, [reset, dataById]);
  return (
    <form
      className="validate-form"
      onSubmit={handleSubmit((values) => {
        const action = !!selectedRecord ? update : create;
        action(values, { onSuccess: () => navigate("/resource-type") });
      })}>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        <div className="input-form">
          <FormLabel
            htmlFor="validation-form-1"
            className="flex flex-col w-full sm:flex-row">
            درصد کمیسیون
          </FormLabel>
          <FormInput
            {...register("commission_rate")}
            id="validation-form-1"
            type="text"
            name="commission_rate"
            className={clsx({
              "border-danger": errors.commission_rate,
            })}
          />
          {errors.commission_rate && (
            <div className="mt-2 text-danger">
              {typeof errors.commission_rate.message === "string" && errors.commission_rate.message}
            </div>
          )}
        </div>

        {/*  */}
        <div className="input-form">
          <FormLabel
            htmlFor="validation-form-4"
            className="flex flex-col w-full sm:flex-row">
            سرویس
          </FormLabel>
          <FormInput
            {...register("service_id")}
            id="validation-form-4"
            type="text"
            name="service_id"
            className={clsx({
              "border-danger": errors.service_id,
            })}
          />
          {errors.service_id && (
            <div className="mt-2 text-danger">
              {typeof errors.service_id.message === "string" && errors.service_id.message}
            </div>
          )}
        </div>
        {/*  */}
        <div className="input-form">
          <FormLabel
            htmlFor="validation-form-6"
            className="flex flex-col w-full sm:flex-row">
            تراپیست
          </FormLabel>
          <FormInput
            {...register("therapist_id")}
            id="validation-form-6"
            type="text"
            name="therapist_id"
            className={clsx({
              "border-danger": errors.therapist_id,
            })}
          />
          {errors.therapist_id && (
            <div className="mt-2 text-danger">
              {typeof errors.therapist_id.message === "string" && errors.therapist_id.message}
            </div>
          )}
        </div>
        {/*  */}
        <div className="input-form">
          <FormLabel
            htmlFor="validation-form-3"
            className="flex flex-col w-full sm:flex-row">
            وضعیت
          </FormLabel>
          <FormSelect
            {...register("is_active", {
              setValueAs: (v) => v === "true",
            })}
            id="validation-form-3"
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
        {/*  */}
        <div className="input-form">
          <FormLabel
            htmlFor="validation-form-2"
            className="flex flex-col w-full sm:flex-row">
            قیمت سفارشی
          </FormLabel>
          <FormInput
            {...register("custom_price")}
            id="validation-form-2"
            type="text"
            name="custom_price"
            className={clsx({
              "border-danger": errors.custom_price,
            })}
          />
          {errors.custom_price && (
            <div className="mt-2 text-danger">
              {typeof errors.custom_price.message === "string" &&
                errors.custom_price.message}
            </div>
          )}
        </div>
        {/*  */}
        <div className="input-form">
          <FormLabel
            htmlFor="validation-form-5"
            className="flex flex-col w-full sm:flex-row">
            مدت زمان
          </FormLabel>
          <FormInput
            {...register("estimated_duration")}
            id="validation-form-5"
            type="text"
            name="estimated_duration"
            className={clsx({
              "border-danger": errors.estimated_duration,
            })}
          />
          {errors.estimated_duration && (
            <div className="mt-2 text-danger">
              {typeof errors.estimated_duration.message === "string" &&
                errors.estimated_duration.message}
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

export default TherapistServiceForm;
