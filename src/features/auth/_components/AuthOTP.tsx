import useLogin from "../_services/useLogin";
import useSendMobile from "../_services/useSendMobile";
import { useOtpStore } from "../store/otpState";

import SendMobileStep from "./SendMobileStep";
import SendOTPStep from "./SendOTPStep";
export default function AuthOTP() {
  const {
    isPending: isPendingSendMobile,
    mutateAsync: mutateAsyncSendMobile,
    data: dataOTP,
  } = useSendMobile();
  const { isPending: isPendingVerifyOTP, mutateAsync: mutateAsyncVerifyOTP } =
    useLogin();
  const { isPending: isPendingResendOTP, mutateAsync: mutateAsyncResendOTP } =
    useSendMobile();
  const mobile = useOtpStore((s) => s.mobile);
  const startOtp = useOtpStore((s) => s.start);
  if (mobile && !!dataOTP) {
    return (
      <SendOTPStep
        isPending={isPendingVerifyOTP}
        mutateAsync={mutateAsyncVerifyOTP}
        isPendingOPT={isPendingResendOTP}
        mutateAsyncOPT={mutateAsyncResendOTP}
        dataOTP={dataOTP}
      />
    );
  }

  return (
    <SendMobileStep
      isPending={isPendingSendMobile}
      mutateAsync={mutateAsyncSendMobile}
      startOtp={startOtp}
    />
  );
}
