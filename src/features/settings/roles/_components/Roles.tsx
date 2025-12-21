import useGetData from "@/services/useGetData";

const Roles = () => {
  const { data } = useGetData<any>({
    queryKey: "testststts",
    url: "/basics/acl/roles/",
  });
  console.log(data);
  return <div>مدیریت نقش‌ها</div>;
};

export default Roles;
