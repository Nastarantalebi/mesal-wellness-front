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
      name: "min_revenue",
      label: "حداقل درآمد",
      placeholder: "حداقل درآمد",
      money: true,
    },
    {
      name: "max_revenue",
      label: "حداکثر درآمد",
      placeholder: "حداکثر درآمد",
      money: true,
    },

    {
      name: "joined_from",
      label: "تاریخ ورود از",
      placeholder: "تاریخ ورود از",
      type: "date",
      maxDate: new DateObject(),
    },
    {
      name: "joined_to",
      label: "تاریخ ورود تا",
      placeholder: "تاریخ ورود تا",
      type: "date",
      maxDate: new DateObject(),
    },
    {
      name: "booking_start_from",
      label: "تاریخ رزرو از",
      placeholder: "تاریخ رزرو از",
      type: "date",
      maxDate: new DateObject(),
    },
    {
      name: "booking_start_to",
      label: "تاریخ رزرو تا",
      placeholder: "تاریخ رزرو تا",
      type: "date",
      maxDate: new DateObject(),
    },

    {
      name: "has_bookings",
      label: "فقط مشتریان دارای رزرو",
      type: "select",
      isLoading: isLoading,
      option: data?.data.booleanOptions ?? [],
    },

    {
      name: "booking_status",
      label: "وضعیت رزرو",
      type: "select",
      isLoading: isLoading,
      option: data?.data.bookingStatuses ?? [],
    },
    {
      name: "membership_type",
      label: "نوع کاربر",
      type: "select",
      isLoading: isLoading,
      option: data?.data.membershipTypes ?? [],
    },
    {
      name: "gender",
      label: "جنسیت",
      type: "select",
      isLoading: isLoading,
      option: data?.data.genders ?? [],
    },

    {
      name: "separator",
    },
  ];
  return { fields };
};

export default useFormData;
