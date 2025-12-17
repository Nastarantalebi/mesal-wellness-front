import { Controller, useWatch } from "react-hook-form";
import { FormInput, FormLabel } from "@/components/Form";
import useGetData from "@/services/useGetData";
import type {
  TCreateData,
  TCustomerSearch,
  TDataById,
} from "../../_types/type";
import Button from "@/components/Button";
import Lucide from "@/components/Lucide";
import { useEffect, useState } from "react";
import Modal from "@/components/Headless/Dialog/Modal";
import CustomersForm from "@/features/customers/_components/CustomersForm";
import ReactSelect from "@/components/Form/FormSelect/ReactSelect";
import clsx from "clsx";
import { queryKey, url } from "../../_fixtures/data";

type TProps = {
  form: any;
  selectedRecord: any;
  setCompanyDiscount: React.Dispatch<React.SetStateAction<number>>;
  dataCreate?: TCreateData;
  dataById?: TDataById;
};

const CustomerFields = ({
  form,
  selectedRecord,
  dataById,
  setCompanyDiscount,
}: TProps) => {
  const isEdit = !!selectedRecord;
  const [openModal, setOpenModal] = useState<boolean>(false);
  const search_item = useWatch({
    control: form.control,
    name: "search_customer",
  });
  const selectedCustomerId = useWatch({
    control: form.control,
    name: "customer_id",
  });
  const { data, refetch, isFetching } = useGetData<TCustomerSearch>({
    url: `/wellness/customers/search?q=${
      isEdit && !search_item ? dataById?.booking.customer_name : search_item
    }`,
    queryKey: ["customer_search", search_item],
    enabled: false,
  });
  const { data: dataCreate } = useGetData<TCreateData>({
    url: `${url}create`,
    queryKey: `${queryKey},"dataCreate"`,
  });
  const errorField = form.formState.errors;
  useEffect(() => {
    if (isEdit && dataById?.booking?.customer_name) {
      form.setValue("search_customer", dataById.booking.customer_name);
      form.setValue("customer_id", dataById.booking.customer_id);
      refetch();
    }
  }, [isEdit, dataById, form, refetch]);
  useEffect(() => {
    if (!data?.data) {
      form.setValue("phone", "");
      return;
    }
    if (!selectedCustomerId) {
      form.setValue("phone", "");
      return;
    }
    const selectedCustomer = data.data.find(
      (item: any) => item.id === Number(selectedCustomerId)
    );
    if (selectedCustomer) {
      form.setValue("phone", selectedCustomer.phone || "");
    } else {
      form.setValue("phone", "");
    }
  }, [selectedCustomerId, data]);
  const selectedCompanyId = useWatch({
    control: form.control,
    name: "company_id",
  });
  useEffect(() => {
    if (!selectedCompanyId || !dataCreate?.data?.companies) {
      setCompanyDiscount(0);
      return;
    }
    const selectedCompany = dataCreate.data.companies.find(
      (item) => item.id === Number(selectedCompanyId)
    );
    setCompanyDiscount(selectedCompany?.discount_percent ?? 0);
  }, [selectedCompanyId, dataCreate]);
  return (
    <>
      <div className="grid grid-cols-12 gap-4 w-full mt-4 p-4 border rounded-lg bg-gray-50 col-span-full overflow-x-hidden">
        {/* ردیف جستجو مشتری */}
        <div className="col-span-12 md:col-span-4 xl:col-span-3">
          <FormLabel>یافتن مشتری</FormLabel>

          <div className="relative">
            <Controller
              control={form.control}
              name="search_customer"
              render={({ field }) => (
                <FormInput
                  {...field}
                  placeholder="نام یا شماره تلفن مشتری"
                  className={clsx([
                    "pl-20",
                    {
                      "!border !border-danger": errorField?.customer_id,
                    },
                  ])}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (!isFetching) {
                        refetch();
                      }
                    }
                  }}
                />
              )}
            />
            <div className="absolute inset-y-0 end-1 flex items-center gap-1">
              {!!search_item && (
                <Button
                  type="button"
                  size="sm"
                  variant="primary"
                  onClick={() => refetch()}>
                  <Lucide
                    icon={isFetching ? "Loader" : "Search"}
                    className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`}
                  />
                </Button>
              )}
              <Button
                type="button"
                size="sm"
                variant="success"
                onClick={() => setOpenModal(true)}>
                <Lucide icon="Plus" className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* پیام راهنما */}
        {!search_item ? (
          <div className="col-span-12 text-gray-500 text-sm">
            برای یافتن مشتری، نام یا شماره تلفن را وارد کنید.
          </div>
        ) : !data ? (
          <div className="col-span-12 text-gray-500 text-sm">
            برای دریافت نتیجه، روی دکمه جستجو کلیک کنید.
          </div>
        ) : null}

        {/* مشتری پیدا نشد */}
        {data && data.data.length === 0 ? (
          <div className="col-span-12 flex justify-between items-center gap-2 bg-red-50 text-red-700 p-3 rounded-lg border border-red-200">
            <span>مشتری یافت نشد.</span>
            <Button
              type="button"
              variant="outline-primary"
              size="sm"
              onClick={() => setOpenModal(true)}>
              + مشتری جدید
            </Button>
          </div>
        ) : null}

        {/* مشتری پیدا شد */}
        {data && data.data.length > 0 && (
          <>
            <div className="col-span-12 md:col-span-6 xl:col-span-3">
              <FormLabel>مشتری</FormLabel>
              <Controller
                control={form.control}
                name="customer_id"
                render={({ field }) => (
                  <>
                    <ReactSelect
                      field={field}
                      options={
                        data?.data?.map((item) => ({
                          label: item.label,
                          value: item.id,
                        })) ?? []
                      }
                      placeholder="انتخاب مشتری"
                      isSearchable
                      isClearable={false}
                    />
                  </>
                )}
              />
            </div>
            <div className="col-span-12 md:col-span-6 xl:col-span-3">
              <FormLabel>شرکت</FormLabel>
              <Controller
                control={form.control}
                name="company_id"
                render={({ field }) => (
                  <>
                    <ReactSelect
                      field={field}
                      options={
                        dataCreate?.data?.companies.map((item) => ({
                          label: item.name,
                          value: item.id,
                        })) ?? []
                      }
                      placeholder="انتخاب شرکت"
                      isSearchable
                    />
                  </>
                )}
              />
            </div>
          </>
        )}

        {/* یادداشت */}
        <div className="col-span-12">
          <FormLabel>یادداشت</FormLabel>
          <Controller
            control={form.control}
            name="notes"
            render={({ field }) => <FormInput {...field} />}
          />
        </div>
      </div>

      {/* مودال افزودن مشتری */}
      <Modal
        close={() => setOpenModal(false)}
        open={openModal}
        title="افزودن شخص جدید"
        cancelBtn={false}
        size="xxl">
        <CustomersForm setOpenModal={setOpenModal} />
      </Modal>
    </>
  );
};

export default CustomerFields;
