import { FormInput, FormLabel } from "@/components/Form";
import { useEffect } from "react";
import { Controller, useWatch } from "react-hook-form";
import type { TItems } from "../../_types/type";
import { numberToWords } from "@persian-tools/persian-tools";

const TotalFields = ({ form }: { form: any }) => {
  const items = useWatch({ control: form.control, name: "items" }) || [];
  const deposit = useWatch({ control: form.control, name: "deposit" }) || 0;
  const payableAmountValue =
    useWatch({ control: form.control, name: "payable_amount" }) || 0;
  const total = items.reduce(
    (sum: number, item: TItems) => sum + (Number(item?.total_price) || 0),
    0
  );

  useEffect(() => {
    const validDeposit = Number(deposit) > total ? total : Number(deposit);
    const calculatedPayable = total - validDeposit;
    form.setValue("total_amount", total);
    form.setValue("deposit", validDeposit);
    form.setValue("payable_amount", calculatedPayable);
  }, [items, deposit, total, form]);
  const totalDiscount =
    items?.reduce((sum: any, item: any) => {
      const unit = Number(item.unit_price) || 0;
      const currentTotal = Number(item.total_price) || 0;
      return sum + (unit - currentTotal);
    }, 0) || 0;

  useEffect(() => {
    form.setValue("discount_amount", totalDiscount);
  }, [totalDiscount, form]);
  const safeNumberToWords = (value: number) => {
    try {
      return numberToWords(value);
    } catch {
      return "";
    }
  };
  const depositInWords =
    Number(deposit) > 0 ? safeNumberToWords(Number(deposit)) : "";
  const totalInWords = total > 0 ? safeNumberToWords(total) : "";
  const payableInWords =
    payableAmountValue > 0 ? safeNumberToWords(payableAmountValue) : "";
  return (
    <div className="w-full mt-4 p-4 border rounded-lg bg-gray-50 col-span-full overflow-x-hidden">
      <div className="grid grid-cols-4 gap-4 mt-5">
        <div className="col-span-full md:col-span-1">
          <FormLabel>مبلغ بیعانه (تومان)</FormLabel>
          <Controller
            control={form.control}
            name="deposit"
            render={({ field }) => (
              <div>
                <FormInput {...field} dir="ltr" money maxLength={20} />
                {depositInWords && (
                  <p className="text-[13px] text-success mt-1  p-1">
                    {String(depositInWords)} تومان
                  </p>
                )}
              </div>
            )}
          />
        </div>
        <div className="col-span-full md:col-span-1">
          <FormLabel>مبلغ کل (تومان)</FormLabel>
          <Controller
            control={form.control}
            name="total_amount"
            render={({ field }) => (
              <div>
                <FormInput
                  maxLength={20}
                  {...field}
                  dir="ltr"
                  money
                  readOnly
                  className="bg-gray-100"
                />
                {totalInWords && (
                  <p className="text-[13px] text-success mt-1  p-1">
                    {String(totalInWords)} تومان
                  </p>
                )}
              </div>
            )}
          />
        </div>
        <div className="col-span-full md:col-span-1">
          <FormLabel>مبلغ قابل پرداخت (تومان)</FormLabel>
          <Controller
            control={form.control}
            name="payable_amount"
            render={({ field }) => (
              <div>
                <FormInput {...field} dir="ltr" money maxLength={20} />
                {payableInWords && (
                  <p className="text-[13px] text-success mt-1  p-1">
                    {String(payableInWords)} تومان
                  </p>
                )}
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default TotalFields;
