import FormComponent from "@/components/Form/Form";
import useUpdateData from "@/services/useUpdateData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { queryKey, url } from "../_fixtures/data";
import type { TCreateData } from "../_types/type";
import useGetData from "@/services/useGetData";

const ChangeStatus = ({
  selectedRecord,
  setOpenStatus,
}: {
  selectedRecord: number | null;
  setOpenStatus: any;
}) => {
  const { mutate, isPending } = useUpdateData({
    url: `/wellness/bookings/${selectedRecord}/status/`,
    queryKey: queryKey,
  });
  const { data, isLoading } = useGetData<TCreateData>({
    url: `${url}create`,
    queryKey: `${queryKey},"dataCreate"`,
  });
  const form = useForm<{ status: string }>({
    resolver: zodResolver(
      z.object({
        status: z.string(),
      })
    ),
    defaultValues: { status: "" },
  });
  return (
    <FormComponent
      form={form}
      formFields={[
        {
          name: "status",
          label: "وضعیت",
          placeholder: "وضعیت",
          required: true,
          className: "col-span-full",
          type: "select",
          option: data?.data.statuses,
          isLoading,
        },
      ]}
      isSubmitting={isPending}
      onSubmit={(values) => {
        mutate(values, {
          onSuccess: () => setOpenStatus(false),
        });
      }}
    />
  );
};

export default ChangeStatus;
