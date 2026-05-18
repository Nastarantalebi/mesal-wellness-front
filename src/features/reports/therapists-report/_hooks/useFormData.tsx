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
      option: [
        {
          label: "شناسه",
          value: "id",
        },
        {
          label: "تاریخ استخدام",
          value: "hire_date",
        },
        {
          label: "تعداد رزرو",
          value: "bookings_count",
        },
        {
          label: "درآمد کل",
          value: "total_revenue",
        },
      ],
    },
    sortWatch
      ? {
          name: "sort_dir",
          label: "روش مرتب سازی",
          type: "select",
          option: [
            {
              label: "صعودی",
              value: "asc",
            },
            {
              label: "نزولی",
              value: "desc",
            },
          ],
        }
      : undefined,
    {
      name: "separator",
      label: "فیلترکردن",
    },
    {
      name: "first_name",
      label: "نام",
      placeholder: "نام",
    },
    {
      name: "last_name",
      label: "نام‌خانوادگی",
      placeholder: "نام‌خانوادگی",
    },
    {
      name: "mobile",
      label: "موبایل",
      placeholder: "موبایل",
      maxLength: 11,
      inputType: "number",
    },
    {
      name: "national_code",
      label: "کدملی",
      placeholder: "کدملی",
      maxLength: 10,
      inputType: "number",
    },
    {
      name: "license_number",
      label: "شماره مجوز",
      placeholder: "شماره مجوز",
      inputType: "number",
    },
    {
      name: "hire_date_from",
      label: "تاریخ استخدام از",
      placeholder: "تاریخ استخدام از",
      type: "date",
      maxDate: new DateObject(),
    },
    {
      name: "hire_date_to",
      label: "تاریخ استخدام تا",
      placeholder: "تاریخ استخدام تا",
      type: "date",
      maxDate: new DateObject(),
    },
    {
      name: "booking_date_from",
      label: "تاریخ رزرو از",
      placeholder: "تاریخ رزرو از",
      type: "date",
      maxDate: new DateObject(),
    },
    {
      name: "booking_date_to",
      label: "تاریخ رزرو تا",
      placeholder: "تاریخ رزرو تا",
      type: "date",
      maxDate: new DateObject(),
    },
    {
      name: "commission_rate_min",
      label: "حداقل درصد کمیسیون",
      placeholder: "حداقل درصد کمیسیون",
      maxLength: 2,
      max: 99.9,
    },
    {
      name: "commission_rate_max",
      label: "حداکثر درصد کمیسیون",
      placeholder: "حداکثر درصد کمیسیون",
      maxLength: 2,
      max: 99.9,
    },
    {
      name: "has_bookings",
      label: "فقط تراپیست‌های دارای رزرو",
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
      name: "with_stats",
      label: "شامل امار رزروها",
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
      type: "select",
      isLoading: isLoading,
      option: data?.data.bookingStatuses ?? [],
    },
    {
      name: "facility_id",
      label: "شعبه",
      type: "select",
      isLoading: isLoading,
      option: data?.data.facilities ?? [],
    },
    {
      name: "gender",
      label: "جنسیت",
      type: "select",
      isLoading: isLoading,
      option: data?.data.genders ?? [],
    },
    {
      name: "specialty",
      label: "تخصص‌ها",
      type: "select",
      isLoading: isLoading,
      option: data?.data.specialties ?? [],
    },
    {
      name: "status",
      label: "وضعیت",
      type: "select",
      isLoading: isLoading,
      option: data?.data.statuses ?? [],
    },
    {
      name: "separator",
    },
  ];
  return { fields };
};

export default useFormData;
