import ItemForm from "./ItemFeilds";
import TotalFields from "./TotalFields";
import CustomerFields from "./CustomerFields";
import type { TDataById } from "../../_types/type";
type TProps = {
  form: any;
  selectedRecord: any;
  dataById?: TDataById;
};
const FormFeilds = ({
  form,
  selectedRecord,
  dataById,
}: TProps) => {
  return (
    <>
      <CustomerFields
        form={form}
        selectedRecord={selectedRecord}
        dataById={dataById}
      />
      <ItemForm
        form={form}
        selectedRecord={selectedRecord}
      />
      <TotalFields form={form} />
    </>
  );
};

export default FormFeilds;
