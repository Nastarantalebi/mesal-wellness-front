import ItemForm from "./ItemFeilds";
import TotalFields from "./TotalFields";
import CustomerFields from "./CustomerFields";
import type { TDataById } from "../../_types/type";
import LoadingSpin from "@/components/Loading";
import { useState } from "react";
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
  const [companyDiscount, setCompanyDiscount] = useState<number>(0);
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
            setCompanyDiscount={setCompanyDiscount}
          />
          <ItemForm
            form={form}
            selectedRecord={selectedRecord}
            companyDiscount={companyDiscount}
          />
          <TotalFields form={form} />
        </>
      )}
    </>
  );
};

export default FormFeilds;
