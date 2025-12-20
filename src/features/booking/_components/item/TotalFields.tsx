import { FormInput, FormLabel } from "@/components/Form";
import { useEffect } from "react";
import { Controller, useWatch } from "react-hook-form";
import type { TItems } from "../../_types/type";

const TotalFields = ({ form }: { form: any }) => {
  const items = useWatch({ control: form.control, name: "items" }) || [];
  const deposit = useWatch({ control: form.control, name: "deposit" }) || 0;
  const manualPayable =
    useWatch({ control: form.control, name: "payable_amount" }) || 0;
  useEffect(() => {
    const total = items.reduce(
      (sum: number, item: TItems) => sum + (Number(item?.total_price) || 0),
      0
    );

    const validDeposit = deposit > total ? total : deposit;
    const payableAmount = total - validDeposit;
    form.setValue("total_amount", total);
    form.setValue("deposit", validDeposit);
    form.setValue("payable_amount", payableAmount);
  }, [items, deposit, manualPayable, form]);
  const totalDiscount =
    form.getValues("items")?.reduce((sum: any, item: any) => {
      const unit = item.unit_price || 0;
      const total = item.total_price || 0;
      return sum + (unit - total);
    }, 0) || 0;
  useEffect(() => {
    form.setValue("discount_amount", totalDiscount);
  }, [form, totalDiscount]);
  return (
    <div
      className={`w-full mt-4 p-4 border rounded-lg bg-gray-50 col-span-full overflow-x-hidden`}>
      <div className="grid grid-cols-4 gap-2 mt-5">
        <div className="col-span-full md:col-span-1 mb-1 md:mb-4">
          <FormLabel>مبلغ بیعانه(تومان)</FormLabel>
          <Controller
            control={form.control}
            name="deposit"
            render={({ field }) => <FormInput {...field} dir="ltr" money />}
          />
        </div>
        <div className="col-span-full md:col-span-1 mb-1 md:mb-4">
          <FormLabel>مبلغ کل(تومان)</FormLabel>
          <Controller
            control={form.control}
            name="total_amount"
            render={({ field }) => (
              <FormInput {...field} dir="ltr" money readOnly />
            )}
          />
        </div>
        <div className="col-span-full md:col-span-1 mb-1 md:mb-4">
          <FormLabel>مبلغ قابل پرداخت(تومان)</FormLabel>
          <Controller
            control={form.control}
            name="payable_amount"
            render={({ field }) => <FormInput {...field} dir="ltr" money />}
          />
        </div>
      </div>
    </div>
  );
};

export default TotalFields;
