import useGetData from "@/services/useGetData";
import type { TSidebarMenu } from "../dashboard/_types/types";

const queryKey = "sideBarItemsQueryKey";
const url = "/basics/menus/sidebar/";

const useSideBar = () => {
  const { data, isFetching, refetch } = useGetData<TSidebarMenu>({
    queryKey,
    url: url,
  });
  return { data, isFetching, refetch };
};

export default useSideBar;
