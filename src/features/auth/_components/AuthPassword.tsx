import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/Button";
import { sendPasswordvalidationSchema } from "../_fixtures";
import useSendPassword from "../_services/useSendPassword";
import ForgotPassword from "./ForgotPassword";
import PasswordField from "@/features/_components/PasswordField";
import MobileInput from "@/features/_components/MobileInput";
import FormComponent from "@/components/Form/Form";

function AuthPasswordForm() {
  const { isPending, mutateAsync } = useSendPassword();
  const [forgotPass, setForgotPass] = useState(false);

  const form = useForm<any>({
    mode: "onChange",
    resolver: zodResolver(sendPasswordvalidationSchema),
  });

  if (forgotPass) return <ForgotPassword setForgotPass={setForgotPass} />;

  const handleSubmitForm = (values: any) => {
    mutateAsync(values);
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
          ورود
        </Button>
      }>
      <MobileInput control={form.control} name="mobile" />
      <PasswordField control={form.control} name="password" label="رمز عبور" />
      <span
        className="text-blue-800 tracking-wide cursor-pointer mt-2 inline-block"
        onClick={() => setForgotPass(true)}>
        فراموشی رمز عبور
      </span>
    </FormComponent>
  );
}

export default AuthPasswordForm;
