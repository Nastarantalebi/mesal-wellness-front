import { useForm } from "react-hook-form";
import clsx from "clsx";
import type { TDataById, TReqResourceType } from "../_types/types";
import { useLocation, useNavigate } from "react-router-dom";
import { schema, queryKey, url, initialValue } from "../_fixtures/data";
import useCreateData from "@/services/useCreateData";
import { FormInput, FormLabel, FormSelect } from "@/components/Form";
import Button from "@/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import useUpdateData from "@/services/useUpdateData";
import useGetById from "@/services/useGetById";
import { useEffect } from "react";

function ResourceTypeForm() {
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
  } = useForm<TReqResourceType>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: initialValue,
  });
  useEffect(() => {
    if (dataById) {
      const preparedData: TReqResourceType = {
        description: String(dataById.type.description ?? ""),
        is_active: !!dataById.type.is_active,
        name: dataById.type.name,
        code: dataById.type.code,
        icon: dataById.type.icon ?? null,
      };
      reset(preparedData);
    }
  }, [reset, dataById]);
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

        {/*  */}
        <div className="input-form">
          <FormLabel
            htmlFor="validation-form-4"
            className="flex flex-col w-full sm:flex-row">
            کد
          </FormLabel>
          <FormInput
            {...register("code")}
            id="validation-form-4"
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
            توضیحات
          </FormLabel>
          <FormInput
            {...register("description")}
            id="validation-form-2"
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
      </div>

      <Button variant="primary" type="submit" className="mt-5">
        ثبت نام
      </Button>
    </form>
  );
}

export default ResourceTypeForm;
