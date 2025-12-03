import AuthOTP from "../_components/AuthOTP";
import AuthPassword from "../_components/AuthPassword";

const useTabItems = () => {
  const tabItems = [
    {
      key: "password_login",
      title: "ورود با رمزعبور",
      content: <AuthPassword />,
    },
    {
      key: "otp_login",
      title: "ورود با کد یکبارمصرف",
      content: <AuthOTP/>,
    },
  ];
  return { tabItems };
};

export default useTabItems;
