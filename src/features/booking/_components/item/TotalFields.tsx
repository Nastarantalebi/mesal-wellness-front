import { FormInput, FormLabel } from "@/components/Form";
import { Controller } from "react-hook-form";

const TotalFields = ({ form }: { form: any }) => {
  return (
    <div
      className={`w-full mt-4 p-4 border rounded-lg bg-gray-50 col-span-full`}>
      <div className="grid grid-cols-3 gap-2 mt-5">
        <div className="mb-4">
          <FormLabel>مبلغ بیعانه(تومان)</FormLabel>
          <Controller
            control={form.control}
            name="deposit"
            render={({ field }) => <FormInput {...field} dir="ltr" />}
          />
        </div>
        <div className="total_amount">
          <FormLabel>مبلغ کل(تومان)</FormLabel>
          <Controller
            control={form.control}
            name="total_amount"
            render={({ field }) => <FormInput {...field} dir="ltr" />}
          />
        </div>
        <div className="mb-4">
          <FormLabel>مبلغ قابل پرداخت(تومان)</FormLabel>
          <Controller
            control={form.control}
            name="payable_amount"
            render={({ field }) => <FormInput {...field} dir="ltr" />}
          />
        </div>
      </div>
    </div>
  );
};

export default TotalFields;
