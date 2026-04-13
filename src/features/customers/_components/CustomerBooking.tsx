import CustomTable from "@/components/Tabulator";
import useGetById from "@/services/useGetById";

type TProps = {
  id: number;
};
const CustomerBooking = ({ id }: TProps) => {
  const url = `/wellness/bookings/?customer_id=${id}`;
  const { data, isFetching } = useGetById<any>({
    queryKey: url,
    url,
    enabled: !!id,
  });
  return (
    <div>
      <CustomTable
        isLoading={isFetching}
        title="لیست رزروها"
        columns={data?.columns}
        data={data?.data}
        dataPagination={data?.paginate}
        showActions={false}
      />
    </div>
  );
};

export default CustomerBooking;
