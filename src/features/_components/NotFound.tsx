import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-100 via-green-50 to-green-100 p-4 text-center">
      <h1 className="text-6xl md:text-8xl font-bold text-green-800 mb-4">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-green-700 mb-6">
        صفحه مورد نظر پیدا نشد
      </h2>
      <p className="text-green-600 mb-8 max-w-md">
        به نظر می‌رسد صفحه‌ای که دنبال آن هستید وجود ندارد یا آدرس اشتباه وارد
        شده است.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors">
        بازگشت به صفحه اصلی
      </button>
    </div>
  );
};

export default NotFound;
