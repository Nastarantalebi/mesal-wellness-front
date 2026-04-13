import useGetById from "@/services/useGetById";
import type { TServicesInfo } from "../_types/types";

type TProps = {
  id: number;
};
const ServiceInfo = ({ id }: TProps) => {
  const url = `/wellness/services/${id}/statistics/`;
  const { data } = useGetById<TServicesInfo>({
    queryKey: url,
    url,
    enabled: !!id,
  });
  if (!data?.data) return;
  return <div>ServiceInfo</div>;
};

export default ServiceInfo;
