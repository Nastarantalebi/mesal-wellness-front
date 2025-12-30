import { meInfo } from "@/features/auth/_services/authServices";
import { useQuery } from "@tanstack/react-query";
export type TMe = {
  avatar: string;
  mobile: string;
};
function useMe() {
  const { data, isLoading, refetch } = useQuery<TMe>({
    queryKey: ["meInfo"],
    queryFn: meInfo,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, refetch };
}

export default useMe;
