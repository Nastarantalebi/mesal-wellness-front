import { FormInput, FormLabel } from "@/components/Form";
import { useEffect } from "react";
import { Controller, useWatch } from "react-hook-form";
import type { TItems } from "../../_types/type";
import { numberToWords } from "@persian-tools/persian-tools";

const TotalFields = ({
  form,
  companyName,
}: {
  form: any;
  companyName: string;
}) => {
  const safeNumberToWords = (num: number | string) => {
    try {
      return numberToWords(String(num ?? 0));
    } catch {
      return "0";
    }
  };
  console.log(form.watch());
  const items = useWatch({ control: form.control, name: "items" }) || [];
  const deposit = useWatch({ control: form.control, name: "deposit" }) || 0;
  const manualPayable =
    useWatch({ control: form.control, name: "payable_amount" }) || 0;
  useEffect(() => {
    const total = items.reduce(
      (sum: number, item: TItems) => sum + (Number(item?.unit_price) || 0),
      0
    );
    const payble = items.reduce(
      (sum: number, item: TItems) => sum + (Number(item?.total_price) || 0),
      0
    );
    const validDeposit = deposit > total ? total : deposit;
    form.setValue("deposit", validDeposit);
    form.setValue("total_amount", total);
    form.setValue("payable_amount", payble);
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
      {companyName && (
        <div className="flex items-center gap-1">
          <span className="text-success">
            تخفیف اعمال شده(
            {companyName}
            ):
          </span>
          <span className="text-primary">
            {safeNumberToWords(totalDiscount) as string}
          </span>
          <span className="text-primary">تومان</span>
        </div>
      )}
    </div>
  );
};

export default TotalFields;
