import { Link } from "react-router-dom";
import { ShieldAlert } from "lucide-react";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
            <ShieldAlert className="w-10 h-10 text-red-500" />
          </div>
        </div>

        <h1 className="text-5xl font-extrabold text-slate-800 mb-2">403</h1>

        <h2 className="text-lg font-semibold text-slate-700 mb-3">
          دسترسی غیرمجاز
        </h2>

        <p className="text-slate-500 mb-8">
          شما مجوز دسترسی به این صفحه را ندارید.
          <br />
          اگر فکر می‌کنید خطایی رخ داده است، با مدیر سیستم تماس بگیرید.
        </p>

        <Link
          to="/dashboard"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-800 text-white hover:bg-slate-700 transition">
          بازگشت به خانه
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
