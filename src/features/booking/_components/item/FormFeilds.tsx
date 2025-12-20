import ItemForm from "./ItemFeilds";
import TotalFields from "./TotalFields";
import CustomerFields from "./CustomerFields";
import type { TCreateData, TDataById } from "../../_types/type";
import LoadingSpin from "@/components/Loading";
import { useEffect, useState } from "react";
import useGetData from "@/services/useGetData";
import { queryKey, url } from "../../_fixtures/data";
import { useWatch } from "react-hook-form";
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
  const { data: dataCreate } = useGetData<TCreateData>({
    url: `${url}create`,
    queryKey: `${queryKey},"dataCreate"`,
  });
  const company_id = useWatch({
    control: form.control,
    name: "company_id",
  });
  const [companyDiscount, setCompanyDiscount] = useState<number>(0);
  const [companyName, setCompanyName] = useState<string>("");
  useEffect(() => {
    if (!company_id || !dataCreate?.data?.companies) {
      setCompanyDiscount(0);
      setCompanyName("");
      return;
    }
    const selectedCompany = dataCreate.data.companies.find(
      (item) => item.id === Number(company_id)
    );
    setCompanyDiscount(selectedCompany?.discount_percent ?? 0);
    setCompanyName(selectedCompany?.name ?? "");
  }, [company_id, dataCreate]);
  return (
    <>
      {isFetchingById ? (
        <LoadingSpin />
      ) : (
        <>
          <CustomerFields
            dataCreate={dataCreate}
            form={form}
            selectedRecord={selectedRecord}
            dataById={dataById}
          />
          <ItemForm
            form={form}
            selectedRecord={selectedRecord}
            companyDiscount={companyDiscount}
          />
          <TotalFields form={form} companyName={companyName} />
        </>
      )}
    </>
  );
};

export default FormFeilds;
