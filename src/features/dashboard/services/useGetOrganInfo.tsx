import useGetData from "@/services/useGetData";

function useGetOrganInfo() {
  return useGetData<any>({
    queryKey: ["organ-info"],
    url: `/selected_organization/`,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}

export default useGetOrganInfo;
