import useMe from "@/features/auth/_services/useMe";
import UserAvatar from "./UserAvatar";
import LoadingSpin from "@/components/Loading";

const ProfileInfo = () => {
  const { data: dataMe, isLoading, refetch } = useMe();
  if (isLoading) return <LoadingSpin />;
  return (
    <div>
      <UserAvatar data={dataMe} refetch={refetch} />
    </div>
  );
};

export default ProfileInfo;
