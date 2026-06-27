import useGetData from "@/services/useGetData";
import type { TFormData } from "@/types";
import { DateObject } from "react-multi-date-picker";
import type { TCreateData, TFilterData } from "../_types/types";
import { url } from "../_fixtures/data";

const useFormData = (sortWatch: any) => {
  const { data, isLoading } = useGetData<TCreateData>({
    url: `${url}create-data`,
    queryKey: [url, "dataCreate"],
  });
  const fields: (TFormData<TFilterData> | undefined)[] = [
    {
      name: "separator",
      label: "مرتب سازی",
    },
    {
      name: "sort_by",
      label: "مرتب سازی بر اساس",
      type: "select",
      option: data?.data.sortableFields,
      isLoading,
    },
    sortWatch
      ? {
          name: "sort_direction",
          label: "روش مرتب سازی",
          type: "select",
          option: data?.data.sortDirections,
          isLoading,
        }
      : undefined,
    {
      name: "separator",
      label: "فیلترکردن",
    },
    {
      name: "status",
      label: "وضعیت رزرو",
      placeholder: "وضعیت",
      type: "select",
      isLoading,
      option: data?.data.statuses,
    },
    {
      name: "company",
      label: "شرکت",
      placeholder: "شرکت",
      type: "select",
      isLoading,
      option: data?.data.companies,
    },
    {
      name: "start_from",
      label: "تاریخ شروع رزرو از",
      placeholder: "تاریخ شروع قرارداد از",
      type: "date",
      maxDate: new DateObject(),
    },
    {
      name: "start_to",
      label: "تاریخ شروع رزرو تا",
      placeholder: "تاریخ شروع قرارداد تا",
      type: "date",
    },
    {
      name: "end_from",
      label: "تاریخ پایان رزرو از",
      placeholder: "تاریخ پایان قرارداد از",
      type: "date",
    },
    {
      name: "end_to",
      label: "تاریخ پایان رزرو تا",
      placeholder: "تاریخ پایان قرارداد تا",
      type: "date",
    },
    {
      name: "created_from",
      label: "تاریخ ثبت از ",
      placeholder: "تاریخ ثبت از",
      type: "date",
      maxDate: new DateObject(),
    },
    {
      name: "created_to",
      label: "تاریخ ثبت تا",
      placeholder: "تاریخ ثبت تا",
      type: "date",
      maxDate: new DateObject(),
    },
    {
      name: "total_amount_min",
      label: "مینیمم مجموع قیمت(تومان)",
      placeholder: "مینیمم مجموع قیمت",
      inputType: "number",
      money: true,
    },
    {
      name: "total_amount_max",
      label: "ماکزیمم مجموع قیمت(تومان)",
      placeholder: "ماکزیمم مجموع قیمت",
      inputType: "number",
      money: true,
    },
    {
      name: "payable_amount_min",
      label: "مینیمم مبلغ پرداختی(تومان)",
      placeholder: "مینیمم مبلغ پرداختی",
      inputType: "number",
      money: true,
    },
    {
      name: "payable_amount_max",
      label: "ماکزیمم مبلغ پرداختی(تومان)",
      placeholder: "ماکزیمم مبلغ پرداختی",
      inputType: "number",
      money: true,
    },
    {
      name: "payment_status",
      label: "پرداخت شده",
      type: "select",
      isLoading,
      option: data?.data.paymentStatuses,
    },
    {
      name: "has_deposit",
      label: "واریز بیعانه",
      type: "select",
      isLoading,
      option: data?.data.booleanOptions,
    },
    {
      name: "staff_id",
      label: "تراپیست",
      type: "select",
      isLoading,
      option: data?.data.therapists ?? [],
    },
    {
      name: "customer_id",
      label: "مشتری",
      type: "select",
      isLoading,
      option: data?.data.customers ?? [],
    },
    {
      name: "service_id",
      label: "نام سرویس",
      type: "select",
      isLoading,
      option: data?.data.services ?? [],
    },
    {
      name: "max_booking_count",
      label: "مینیمم تعداد رزروها",
      inputType: "number",
    },
    {
      name: "min_booking_count",
      label: "ماکزیمم تعداد رزروها",
      inputType: "number",
    },
    // {
    //   name: "with_stats",
    //   label: "مینیمم تعداد رزروها",
    //   type: "select",
    //   isLoading,
    //   option: data?.data.contractStatuses ?? [],
    // },
    {
      name: "separator",
    },
  ];
  return { fields };
};

export default useFormData;
