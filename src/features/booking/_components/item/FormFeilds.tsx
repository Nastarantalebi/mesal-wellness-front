import ItemForm from "./ItemFeilds";
import TotalFields from "./TotalFields";
import CustomerFields from "./CustomerFields";
import type { TDataById } from "../../_types/type";
import LoadingSpin from "@/components/Loading";
type TProps = {
  form: any;
  selectedRecord: any;
  isFetchingById: boolean;
  dataById?: TDataById;
};
const FormFeilds = ({
  form,
  selectedRecord,
  isFetchingById,
  dataById,
}: TProps) => {
  return (
    <>
      {isFetchingById ? (
        <LoadingSpin />
      ) : (
        <>
          <CustomerFields
            form={form}
            selectedRecord={selectedRecord}
            dataById={dataById}
          />
          <ItemForm form={form} selectedRecord={selectedRecord} />
          <TotalFields form={form} />
        </>
      )}
    </>
  );
};

export default FormFeilds;
