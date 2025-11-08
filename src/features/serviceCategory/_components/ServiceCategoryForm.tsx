import { useForm } from "react-hook-form";
import clsx from "clsx";
import type { TReqServiceCategory } from "../_types/types";
import { useNavigate } from "react-router-dom";
import { schema, queryKey, url, initialValue } from "../_fixtures/data";
import useCreateData from "@/services/useCreateData";
import { FormInput, FormLabel } from "@/components/Form";
import Button from "@/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";

function ServiceCategoryForm() {
  const navigate = useNavigate();

  const { mutate } = useCreateData({
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
    defaultValues: initialValue,
  });

  return (
    <form
      className="validate-form"
      onSubmit={handleSubmit((values) =>
        mutate(values, { onSuccess: () => navigate("/service-category") })
      )}>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        <div className="input-form">
          <FormLabel
            htmlFor="validation-form-1"
            className="flex flex-col w-full sm:flex-row">
            نوع خدمت
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
              {typeof errors.title.message === "string" && errors.title.message}
            </div>
          )}
        </div>

        <div className="input-form">
          <FormLabel
            htmlFor="validation-form-1"
            className="flex flex-col w-full sm:flex-row">
            توضیحات
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
            وضعیت
          </FormLabel>
          <FormInput
            {...register("is_active")}
            id="validation-form-1"
            type="checkbox"
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

export default ServiceCategoryForm;
