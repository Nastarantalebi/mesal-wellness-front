import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormComponent from "@/components/Form/Form";
import useGetData from "@/services/useGetData";
import { queryKey, url } from "@/features/booking/_fixtures/data";
import useFormData from "../_hooks/useFormData";
import { initialValues, schema } from "../_fixtures/data";
import type { TRequest, TResponse } from "../_types/type";
import { useEffect, useState } from "react";
import CalendarMatrixList from "./CalendarMatrixList";

function CalendarMatrix() {
  const form = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });
  const [filters, setFilters] = useState<TRequest>(initialValues);

  const { from, to, type } = filters;
  const { data, isLoading, refetch } = useGetData<TResponse>({
    url: `${url}calendar-range?from=${from}&to=${to}
     &type=${type}`,
    queryKey: [queryKey, from, to],
    enabled: false,
  });
  const handleSubmit = (values: TRequest) => {
    setFilters({
      id: values.id,
      from: values.from,
      to: values.to,
      type: values.type,
    });
  };
  useEffect(() => {
    if (filters.from && filters.to) {
      refetch();
    }
  }, [filters, refetch]);
  const { fields } = useFormData();
  return (
    <>
      <FormComponent
        form={form}
        formFields={fields}
        isSubmitting={isLoading}
        onSubmit={handleSubmit}
        btnSubmitText="مشاهده گزارش"
      />
      <CalendarMatrixList data={data} />
    </>
  );
}

export default CalendarMatrix;
