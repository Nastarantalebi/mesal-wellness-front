import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormComponent from "@/components/Form/Form";
import useGetData from "@/services/useGetData";
import type { TCreateData } from "@/features/booking/_types/type";
import { queryKey, url } from "@/features/booking/_fixtures/data";
import useFormData from "../_hooks/useFormData";
import { initialValues, schema } from "../_fixtures/data";
import type { TRequest, TResponse } from "../_types/type";
import { useEffect, useState } from "react";
import CalendarRangeList from "./CalendarRangeList";

function CalendarRange() {
  const form = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
    mode: "onChange",
  });
  const [filters, setFilters] = useState<TRequest>(initialValues);

  const { data: dataCreate, isLoading: isLoadingCreate } =
    useGetData<TCreateData>({
      url: `${url}create`,
      queryKey: `${queryKey},"dataCreate"`,
    });
  const { from, to, status } = filters;
  const { data, isLoading, refetch } = useGetData<TResponse>({
    url: `${url}calendar-range?from=${from}&to=${to}${
      status ? `&status=${status}` : ""
    }`,
    queryKey: [queryKey, from, to],
    enabled: false,
  });
  const handleSubmit = (values: any) => {
    setFilters({
      from: values.from,
      to: values.to,
      status: values.status || "",
    });
  };
  useEffect(() => {
    if (filters.from && filters.to) {
      refetch();
    }
  }, [filters, refetch]);

  const { fields } = useFormData({ isLoadingCreate, dataCreate });
  return (
    <>
      <FormComponent
        form={form}
        formFields={fields}
        isSubmitting={isLoading}
        onSubmit={handleSubmit}
        btnSubmitText="مشاهده گزارش"
      />
      <CalendarRangeList data={data} />
    </>
  );
}

export default CalendarRange;
