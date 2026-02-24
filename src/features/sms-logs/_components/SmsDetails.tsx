import useGetById from "@/services/useGetById";
import { queryKey, url } from "../_fixtures/data";

const SmsDetails = ({ id }: { id: number | null }) => {
  const { data } = useGetById<any>({
    queryKey,
    url,
    id,
  });
  console.log(data);
  return <div>{id}</div>;
};

export default SmsDetails;
