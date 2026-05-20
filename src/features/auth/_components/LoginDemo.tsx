import { InfoIcon } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

type TProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};
const LoginDemo = ({ setOpen }: TProps) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => setOpen(false)}
      />

      <div className="relative bg-gray-200 rounded-3xl p-8 w-full max-w-sm shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-blue-200 text-blue-600 rounded-full flex items-center justify-center mb-6">
            <InfoIcon className="w-8 h-8" />
          </div>

          <h3 className="text-xl font-bold text-gray-800 mb-4">
            اطلاعات ورود به دمو
          </h3>

          <p className="text-gray-600 mb-6 leading-relaxed">
            برای تجربه محیط کاربری، می‌توانید با مشخصات زیر وارد شوید:
          </p>

          <div className="bg-gray-50 p-4 rounded-xl w-full mb-6 border border-gray-100">
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">شماره موبایل:</span>
              <strong className="text-gray-800">0999111222</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">کد یکبارمصرف:</span>
              <strong className="text-blue-600 ">123456</strong>
            </div>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors">
            متوجه شدم
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginDemo;
