import { useForm } from "react-hook-form";
import clsx from "clsx";
import type { TCreateData, TDataById, TReqResources } from "../_types/types";
import { useLocation, useNavigate } from "react-router-dom";
import { schema, queryKey, url, initialValue } from "../_fixtures/data";
import useCreateData from "@/services/useCreateData";
import { FormInput, FormLabel, FormSelect } from "@/components/Form";
import Button from "@/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import useUpdateData from "@/services/useUpdateData";
import useGetById from "@/services/useGetById";
import { useEffect } from "react";
import useGetData from "@/services/useGetData";

function ResourcesForm() {
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
  const { data: dataCreate } = useGetData<TCreateData>({
    url: `${url}create`,
    queryKey: `${queryKey},"dataCreate"`,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TReqResources>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: initialValue,
  });
  useEffect(() => {
    if (dataById) {
      const preparedData: TReqResources = {
        description: dataById.resource.description,
        capacity: String(dataById.resource.capacity),
        code: dataById.resource.code,
        name: dataById.resource.name ?? null,
        status: dataById.resource.status,
        type_id: dataById.resource.type.id,
        facility_id: dataById.resource.facility.id,
      };
      reset(preparedData);
    }
  }, [reset, dataById]);
  return (
    <form
      className="validate-form"
      onSubmit={handleSubmit((values) => {
        const action = !!selectedRecord ? update : create;
        action(values, { onSuccess: () => navigate("/resources") });
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
            htmlFor="validation-form-5"
            className="flex flex-col w-full sm:flex-row">
            وضعیت
          </FormLabel>
          <FormSelect
            {...register("status")}
            id="validation-form-5"
            name="status"
            className={clsx({
              "border-danger": errors.status,
            })}>
            {dataCreate?.statuses?.map((item, index) => (
              <option value={String(item.value)} key={index}>
                {item.label}
              </option>
            ))}
          </FormSelect>

          {errors.status && (
            <div className="mt-2 text-danger">
              {typeof errors.status.message === "string" &&
                errors.status.message}
            </div>
          )}
        </div>
        {/*  */}
        <div className="input-form">
          <FormLabel
            htmlFor="validation-form-6"
            className="flex flex-col w-full sm:flex-row">
            ظرفیت
          </FormLabel>
          <FormInput
            {...register("capacity")}
            id="validation-form-6"
            type="number"
            name="capacity"
            className={clsx({
              "border-danger": errors.capacity,
            })}
          />
          {errors.capacity && (
            <div className="mt-2 text-danger">
              {typeof errors.capacity.message === "string" &&
                errors.capacity.message}
            </div>
          )}
        </div>
        {/*  */}
        <div className="input-form">
          <FormLabel
            htmlFor="validation-form-8"
            className="flex flex-col w-full sm:flex-row">
            امکانات
          </FormLabel>
          <FormSelect
            {...register("facility_id", {
              setValueAs: (v) => Number(v),
            })}
            id="validation-form-8"
            name="facility_id"
            className={clsx({
              "border-danger": errors.facility_id,
            })}>
            {dataCreate?.facilities?.map((item, index) => (
              <option value={String(item.value)} key={index}>
                {item.label}
              </option>
            ))}
          </FormSelect>

          {errors.facility_id && (
            <div className="mt-2 text-danger">
              {typeof errors.facility_id.message === "string" &&
                errors.facility_id.message}
            </div>
          )}
        </div>
        {/*  */}
        <div className="input-form">
          <FormLabel
            htmlFor="validation-form-8"
            className="flex flex-col w-full sm:flex-row">
            نوع
          </FormLabel>
          <FormSelect
            {...register("type_id", {
              setValueAs: (v) => Number(v),
            })}
            id="validation-form-8"
            name="type_id"
            className={clsx({
              "border-danger": errors.type_id,
            })}>
            {dataCreate?.types?.map((item, index) => (
              <option value={String(item.value)} key={index}>
                {item.label}
              </option>
            ))}
          </FormSelect>

          {errors.type_id && (
            <div className="mt-2 text-danger">
              {typeof errors.type_id.message === "string" &&
                errors.type_id.message}
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

export default ResourcesForm;
