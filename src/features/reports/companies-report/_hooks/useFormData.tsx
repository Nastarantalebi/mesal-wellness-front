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
      name: "contract_start_from",
      label: "تاریخ شروع قرارداد از",
      placeholder: "تاریخ شروع قرارداد از",
      type: "date",
       maxDate: new DateObject(),
    },
    {
      name: "contract_start_to",
      label: "تاریخ شروع قرارداد تا",
      placeholder: "تاریخ شروع قرارداد تا",
      type: "date",
    },
    {
      name: "contract_end_from",
      label: "تاریخ پایان قرارداد از",
      placeholder: "تاریخ پایان قرارداد از",
      type: "date",
      maxDate: new DateObject(),
    },
    {
      name: "contract_end_to",
      label: "تاریخ پایان قرارداد تا",
      placeholder: "تاریخ پایان قرارداد تا",
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
      label: "فقط شرکت‌های دارای رزرو",
      type: "select",
      option: data?.data.booleanOptions,
    },
    {
      name: "has_contracts",
      label: "دارای قرارداد",
      type: "select",
      option: data?.data.booleanOptions,
    },
    {
      name: "booking_status",
      label: "وضعیت رزرو",
      type: "select",
      isLoading,
      option: data?.data.bookingStatuses ?? [],
    },
    {
      name: "contract_status",
      label: "شعبه",
      type: "select",
      isLoading,
      option: data?.data.contractStatuses ?? [],
    },

    {
      name: "separator",
    },
  ];
  return { fields };
};

export default useFormData;
