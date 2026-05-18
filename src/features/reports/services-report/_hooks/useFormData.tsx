import type { TFormData } from "@/types";
import useGetData from "@/services/useGetData";
import { url } from "../_fixtures/data";
import type { TCreateData, TFilterData } from "../_types/types";
import { DateObject } from "react-multi-date-picker";

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
      option: data?.data.sortOptions,
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
      name: "min_price",
      label: "کمترین قیمت",
      placeholder: "کمترین قیمت",
      money: true,
    },
    {
      name: "max_price",
      label: "بیشترین قیمت",
      placeholder: "بیشترین قیمت",
      money: true,
    },

    {
      name: "start_date",
      label: "تاریخ شروع",
      placeholder: "تاریخ شروع",
      type: "date",
      maxDate: new DateObject(),
    },
    {
      name: "end_date",
      label: "تاریخ پایان",
      placeholder: "تاریخ پایان",
      type: "date",
      maxDate: new DateObject(),
    },
    {
      name: "has_bookings",
      label: "فقط سرویس‌های دارای رزرو",
      type: "select",
      option: data?.data.booleanOptions ?? [],
    },
    {
      name: "booking_status",
      label: "وضعیت رزرو",
      type: "select",
      isLoading,
      option: data?.data.bookingStatuses ?? [],
    },

    {
      name: "category_id",
      label: "دسته‌بندی",
      type: "select",
      isLoading,
      option: data?.data.categories ?? [],
    },
    {
      name: "company_id",
      label: "شرکت",
      type: "select",
      isLoading,
      option: data?.data.companies ?? [],
    },
    {
      name: "gender_policy",
      label: "جنسیت",
      type: "select",
      isLoading,
      option: data?.data.genderPolicies ?? [],
    },
    {
      name: "separator",
    },
  ];
  return { fields };
};

export default useFormData;
