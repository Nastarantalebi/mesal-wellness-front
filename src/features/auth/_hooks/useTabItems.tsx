import AuthOTP from "../_components/AuthOTP";
import AuthPassword from "../_components/AuthPassword";

const useTabItems = () => {
  const tabItems = [
    {
      key: "otp_login",
      title: "ورود با کد یکبارمصرف",
      content: <AuthOTP />,
    },
    {
      key: "password_login",
      title: "ورود با رمزعبور",
      content: <AuthPassword />,
    },
  ];
  return { tabItems };
};

export default useTabItems;
