import type { TFormData } from "@/types";
import useGetData from "@/services/useGetData";
import { url } from "../_fixtures/data";
import type { TCreateData, TFilterData } from "../_types/types";

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
      placeholder: "مرتب سازی بر اساس",
      type: "select",
      option: data?.data.sortOptions,
      isLoading,
    },
    sortWatch
      ? {
          name: "sort_direction",
          label: "روش مرتب سازی",
          placeholder: "روش مرتب سازی",
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
      name: "search",
      label: "جستجو",
      placeholder: "جستجو",
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
    },
    {
      name: "end_date",
      label: "تاریخ پایان",
      placeholder: "تاریخ پایان",
      type: "date",
    },
    {
      name: "has_bookings",
      label: "فقط تراپیست‌های دارای رزرو",
      placeholder: "فقط تراپیست‌های دارای رزرو",
      type: "select",
      option: [
        {
          label: "بله",
          value: true,
        },
        {
          label: "خیر",
          value: false,
        },
      ],
    },
    {
      name: "booking_status",
      label: "وضعیت رزرو",
      placeholder: "وضعیت رزرو",
      type: "select",
      isLoading,
      option: data?.data.bookingStatuses ?? [],
    },

    {
      name: "category_id",
      label: "دسته‌بندی",
      placeholder: "دسته‌بندی",
      type: "select",
      isLoading,
      option: data?.data.categories ?? [],
    },
    {
      name: "company_id",
      label: "شرکت",
      placeholder: "شرکت",
      type: "select",
      isLoading,
      option: data?.data.companies ?? [],
    },
    {
      name: "gender_policy",
      label: "جنسیت",
      placeholder: "جنسیت",
      type: "select",
      isLoading,
      option: data?.data.genderPolicies ?? [],
    },
    {
      name: "status",
      label: "وضعیت",
      placeholder: "وضعیت",
      type: "select",
      isLoading,
      option: [
        {
          label: "فعال",
          value: "active",
        },
        {
          label: "غیرفعال",
          value: "inactive",
        },
      ],
    },

    {
      name: "separator",
    },
  ];
  return { fields };
};

export default useFormData;
