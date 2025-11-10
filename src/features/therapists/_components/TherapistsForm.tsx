import { useForm } from "react-hook-form";
import clsx from "clsx";
import { useLocation, useNavigate } from "react-router-dom";
import useCreateData from "@/services/useCreateData";
import { initialValues, queryKey, schema, url } from "../_fixtures/data";
import type { TCreateData, TDataById, TReqTherapists } from "../_types/types";
import { FormInput, FormLabel, FormSelect } from "@/components/Form";
import Button from "@/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import useGetData from "@/services/useGetData";
import useUpdateData from "@/services/useUpdateData";
import useGetById from "@/services/useGetById";
import { useEffect } from "react";

function TherapistsForm() {
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
    url: url,
    queryKey: [queryKey, selectedRecord],
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
  } = useForm<TReqTherapists>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });
  // useEffect(() => {
  //   if (dataById) {
  //     const praparedData: TReqTherapists = {
  //       first_name: dataById.customer.first_name,
  //       last_name: dataById.customer.last_name,
  //       national_code: dataById.customer.national_code,
  //       notes: dataById.customer.notes,
  //       phone: dataById.customer.phone,
  //       gender: dataById.customer.gender,
  //       membership_type: dataById.customer.membership_type,
  //       status: dataById.customer.status,
  //       birth_date: dataById.customer.birth_date,
  //       joined_at: dataById.customer.joined_at,
  //       user_id: null,
  //     };
  //     reset(praparedData);
  //   }
  // }, [reset, dataById]);
  return (
    <form
      className="validate-form"
      onSubmit={handleSubmit((values) => {
        const action = selectedRecord ? update : create;
        action(values, { onSuccess: () => navigate("/therapists") });
      })}>
      {/*  */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        <div className="input-form">
          <FormLabel
            htmlFor="validation-form-1"
            className="flex flex-col w-full sm:flex-row">
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
            htmlFor="validation-form-2"
            className="flex flex-col w-full sm:flex-row">
            نام خانوادگی
          </FormLabel>
          <FormInput
            {...register("last_name")}
            id="validation-form-2"
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
            htmlFor="validation-form-3"
            className="flex flex-col w-full sm:flex-row">
            کد ملی
          </FormLabel>
          <FormInput
            {...register("national_code")}
            id="validation-form-3"
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
            htmlFor="validation-form-4"
            className="flex flex-col w-full sm:flex-row">
            شماره همراه
          </FormLabel>
          <FormInput
            {...register("mobile")}
            id="validation-form-4"
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
            htmlFor="validation-form-5"
            className="flex flex-col w-full sm:flex-row">
            بیوگرافی
          </FormLabel>
          <FormInput
            {...register("bio")}
            id="validation-form-5"
            type="text"
            name="bio"
            className={clsx({
              "border-danger": errors.bio,
            })}
          />
          {errors.bio && (
            <div className="mt-2 text-danger">
              {typeof errors.bio.message === "string" && errors.bio.message}
            </div>
          )}
        </div>
        {/*  */}
        <div className="input-form">
          <FormLabel
            htmlFor="validation-form-6"
            className="flex flex-col w-full sm:flex-row">
            تاریخ حضور
          </FormLabel>
          <FormInput
            {...register("hire_date")}
            id="validation-form-6"
            type="date"
            name="hire_date"
            className={clsx({
              "border-danger": errors.hire_date,
            })}
          />
          {errors.hire_date && (
            <div className="mt-2 text-danger">
              {typeof errors.hire_date.message === "string" &&
                errors.hire_date.message}
            </div>
          )}
        </div>

        {/*  */}
        <div className="input-form">
          <FormLabel
            htmlFor="validation-form-7"
            className="flex flex-col w-full sm:flex-row">
            جنسیت
          </FormLabel>
          <FormSelect
            {...register("gender")}
            id="validation-form-7"
            name="gender"
            className={clsx({
              "border-danger": errors.gender,
            })}>
            {dataCreate?.genders?.map((item, index) => (
              <option value={String(item.value)} key={index}>
                {item.label}
              </option>
            ))}
          </FormSelect>

          {errors.gender && (
            <div className="mt-2 text-danger">
              {typeof errors.gender.message === "string" &&
                errors.gender.message}
            </div>
          )}
        </div>

        {/*  */}
        <div className="input-form">
          <FormLabel
            htmlFor="validation-form-8"
            className="flex flex-col w-full sm:flex-row">
            وضعیت کاربر
          </FormLabel>
          <FormSelect
            {...register("status")}
            id="validation-form-8"
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
            htmlFor="validation-form-9"
            className="flex flex-col w-full sm:flex-row">
            شماره ثبت
          </FormLabel>
          <FormInput
            {...register("license_number")}
            id="validation-form-9"
            type="text"
            name="license_number"
            className={clsx({
              "border-danger": errors.license_number,
            })}
          />
          {errors.license_number && (
            <div className="mt-2 text-danger">
              {typeof errors.license_number.message === "string" &&
                errors.license_number.message}
            </div>
          )}
        </div>
        {/*  */}
        <div className="input-form">
          <FormLabel
            htmlFor="validation-form-9"
            className="flex flex-col w-full sm:flex-row">
            اواتار
          </FormLabel>
          <FormInput
            {...register("avatar_path")}
            id="validation-form-9"
            type="text"
            name="avatar_path"
            className={clsx({
              "border-danger": errors.avatar_path,
            })}
          />
          {errors.avatar_path && (
            <div className="mt-2 text-danger">
              {typeof errors.avatar_path.message === "string" &&
                errors.avatar_path.message}
            </div>
          )}
        </div>
        {/*  */}
        <div className="input-form">
          <FormLabel
            htmlFor="validation-form-10"
            className="flex flex-col w-full sm:flex-row">
            یوزر
          </FormLabel>
          <FormInput
            {...register("specialties")}
            id="validation-form-10"
            type="text"
            name="specialties"
            className={clsx({
              "border-danger": errors.specialties,
            })}
          />
          {errors.specialties && (
            <div className="mt-2 text-danger">
              {typeof errors.specialties.message === "string" &&
                errors.specialties.message}
            </div>
          )}
        </div>
        {/*  */}
        <div className="input-form">
          <FormLabel
            htmlFor="validation-form-11"
            className="flex flex-col w-full sm:flex-row">
            امکانات
          </FormLabel>
          <FormSelect
            {...register("facility_id")}
            id="validation-form-11"
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
      </div>

      <Button variant="primary" type="submit" className="mt-5">
        ثبت نام
      </Button>
    </form>
  );
}

export default TherapistsForm;
