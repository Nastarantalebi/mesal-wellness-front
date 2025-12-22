import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/Button";
import {
  sendMobileInitialValues,
  sendMobilevalidationSchema,
} from "../_fixtures";
import type { ISendMobile } from "../_types/types";
import FormComponent from "@/components/Form/Form";
import MobileInput from "@/features/_components/MobileInput";

function SendMobileStep({ isPending, mutateAsync, startOtp }: any) {
  const form = useForm<ISendMobile>({
    resolver: zodResolver(sendMobilevalidationSchema),
    defaultValues: sendMobileInitialValues,
  });

  const handleSubmitForm = (values: ISendMobile) => {
    mutateAsync(values, {
      onSuccess: (data: any) => {
        startOtp({
          mobile: data.mobile,
          otp_expire: data.otp_expire,
          is_used: data.is_used,
        });
        form.reset();
      },
    });
  };

  return (
    <FormComponent
      form={form}
      onSubmit={handleSubmitForm}
      size="custom"
      button={
        <Button
          type="submit"
          variant="primary"
          isPending={isPending}
          rounded
          className="bg-gradient-to-r from-theme-1/70 to-theme-2/70 w-full py-3.5">
          {isPending ? "درحال ارسال..." : "ارسال کد تأیید"}
        </Button>
      }>
      <MobileInput control={form.control} name="mobile" disabled={isPending} />
    </FormComponent>
  );
}

export default SendMobileStep;
