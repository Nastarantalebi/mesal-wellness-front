import { useQuery } from "@tanstack/react-query";
import { organization } from "./authServices";

type TOrg = {
  logo: string;
  title: string;
};

const useOrganization = () => {
  const { data } = useQuery<TOrg>({
    queryKey: ["organ-info"],
    queryFn: organization,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return { data };
};

export default useOrganization;
