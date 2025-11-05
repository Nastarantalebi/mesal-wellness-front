import { useForm } from "react-hook-form";
import clsx from "clsx";
import type { TReqServiceCategory } from "../_types/types";
import { useNavigate } from "react-router-dom";
import { schema, queryKey, url } from "../_fixtures/data";
import useCreateData from "@/services/useCreateData";
import { FormInput, FormLabel } from "@/components/Form";
import Button from "@/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";

function ServiceCategoryForm() {
  const navigate = useNavigate();

  const { mutate } = useCreateData({
    category: "medical",
    url: url,
    queryKey: queryKey,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TReqServiceCategory>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  return (
    <form
      className="validate-form"
      onSubmit={handleSubmit((values) =>
        mutate(values, { onSuccess: () => navigate("/customers") })
      )}>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        <div className="input-form">
          <FormLabel
            htmlFor="validation-form-1"
            className="flex flex-col w-full sm:flex-row">
            نام
          </FormLabel>
          <FormInput
            {...register("title")}
            id="validation-form-1"
            type="text"
            name="title"
            className={clsx({
              "border-danger": errors.title,
            })}
          />
          {errors.title && (
            <div className="mt-2 text-danger">
              {typeof errors.title.message === "string" &&
                errors.title.message}
            </div>
          )}
        </div>
        <div className="input-form">
          <FormLabel
            htmlFor="validation-form-1"
            className="flex flex-col w-full sm:flex-row">
            نام خانوادگی
          </FormLabel>
          <FormInput
            {...register("description")}
            id="validation-form-1"
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
        <div className="input-form">
          <FormLabel
            htmlFor="validation-form-1"
            className="flex flex-col w-full sm:flex-row">
            کد ملی
          </FormLabel>
          <FormInput
            {...register("is_active")}
            id="validation-form-1"
            type="number"
            name="is_active"
            maxLength={10}
            minLength={10}
            className={clsx({
              "border-danger": errors.is_active,
            })}
          />
          {errors.is_active && (
            <div className="mt-2 text-danger">
              {typeof errors.is_active.message === "string" &&
                errors.is_active.message}
            </div>
          )}
        </div>
        <div className="input-form">
          <FormLabel
            htmlFor="validation-form-1"
            className="flex flex-col w-full sm:flex-row">
            شماره همراه
          </FormLabel>
          <FormInput
            {...register("parent_id")}
            id="validation-form-1"
            type="number"
            name="parent_id"
            maxLength={11}
            minLength={11}
            className={clsx({
              "border-danger": errors.parent_id,
            })}
          />
          {errors.parent_id && (
            <div className="mt-2 text-danger">
              {typeof errors.parent_id.message === "string" &&
                errors.parent_id.message}
            </div>
          )}
        </div>
        <div className="input-form">
          <FormLabel
            htmlFor="validation-form-1"
            className="flex flex-col w-full sm:flex-row">
            کد پزشکی
          </FormLabel>
          <FormInput
            {...register("branch_id")}
            id="validation-form-1"
            type="number"
            name="branch_id"
            className={clsx({
              "border-danger": errors.branch_id,
            })}
          />
          {errors.branch_id && (
            <div className="mt-2 text-danger">
              {typeof errors.branch_id.message === "string" &&
                errors.branch_id.message}
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

export default ServiceCategoryForm;
