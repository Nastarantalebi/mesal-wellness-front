import type { TPermissionItem } from "../_types/type";
import PermissionsForm from "./PermissionsForm";
type TProps = {
  permissions: TPermissionItem[];
};

const PermissionsContent = ({ permissions }: TProps) => {
  return (
    <div>
      {permissions.map((item) => (
        <PermissionsForm key={item.id} item={item} />
      ))}
    </div>
  );
};

export default PermissionsContent;
