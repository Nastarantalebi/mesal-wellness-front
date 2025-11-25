import ItemForm from "./ItemFeilds";
import TotalFields from "./TotalFields";
import CustomerFields from "./CustomerFields";
import type { TCreateData } from "../../_types/type";
type TProps = {
  form: any;
  selectedRecord: any;
  dataCreate?: TCreateData ;
  dataById?: any;
};
const FormFeilds = ({
  form,
  dataCreate,
  selectedRecord,
  dataById,
}: TProps) => {
  return (
    <>
      <CustomerFields
        form={form}
        selectedRecord={selectedRecord}
        dataCreate={dataCreate}
        dataById={dataById}
      />
      <ItemForm
        form={form}
        selectedRecord={selectedRecord}
        dataCreate={dataCreate}
      />
      <TotalFields form={form} />
    </>
  );
};

export default FormFeilds;
