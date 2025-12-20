import useGetById from "@/services/useGetById";
import { queryKey, url } from "../_fixtures/data";
import type { TDataById } from "../_types/type";
import clsx from "clsx";
type TProps = {
  selectedRecord?: any;
};
const PersonalInfo = ({ selectedRecord }: TProps) => {
  const id = selectedRecord?.id;
  const health = [
    "دیابت",
    "فشار خون",
    "ناراحتی قلبی",
    "مشکلات تیروئیدی",
    "اختلالات هورمونی",
    "مشکلات کبد",
    "آلرژی",
    "اختلالات عصبی",
    "هیپاتیت",
    "وجود پلاتین",
    "بیماری پوستی",
    "بیماری داخلی",
    "واریس",
    "بیماری استخوانی",
    "بیماری‌های مرتبط با مفاصل",
    "آسیب دیسک ستون فقرات",
    "دریافت پروتز",
    "دریافت اورتوز",
    "عوارض و بیماری‌های ناشی از تصادف",
  ];

  const sport = ["خیلی فعال", "فعال", "بی‌تحرک"];
  const beauty = [
    "جوش",
    "لک",
    "چین و چروک",
    "پاکسازی",
    "خشکی پوست",
    "لایه برداری",
  ];
  const { data: dataById } = useGetById<TDataById>({
    url: url,
    queryKey: [queryKey, String(id)],
    id: id,
  });
  type TInputProps = {
    label?: string;
    className?: string;
    placeholder?: string;
  };
  const InputComponents = ({
    label,
    className = "w-44",
    placeholder = ".....................................................................",
  }: TInputProps) => {
    return (
      <>
        {label && <label htmlFor="">{label}</label>}
        <input
          placeholder={placeholder}
          className={clsx("!border-none !outline-none !ring-0", className)}
        />
      </>
    );
  };
  return (
    <form className="mx-auto p-6 space-y-6 border border-gray-300 rounded-lg shadow-md overflow-y-scroll h-[75vh]">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-2">
          مجموعه ماساژ آسمان (آموزش و اجرا)
        </h1>
        <img src="/logo-192×192.png" alt="logo" className="mx-auto mb-2 w-32" />
      </div>

      {/* Personal Info */}
      <section className="border border-gray-300 rounded-lg p-4 space-y-4">
        <h2 className="font-bold text-center text-lg">مشخصات فردی</h2>
        <div className="flex flex-wrap gap-2">
          {dataById?.booking.customer_name ? (
            <>
              <span>نام و نام خانوادگی:</span>
              <span>{dataById?.booking.customer_name}</span>
            </>
          ) : (
            <InputComponents label="نام و نام‌خانوادگی" />
          )}
          <InputComponents label="تاریخ تولد" />
          <InputComponents label="شماره تماس" />
          <InputComponents label="آدرس" className="w-72" />
          <InputComponents label="معرف" />
          <InputComponents label="  شغل(دانستن حرفه‌ی شما برای انتخاب خدمات مناسب بسیار مهم است):" />
          <InputComponents label="آیا سابقه ماساژ دارید؟" />
        </div>
      </section>

      {/* Health Status */}
      <section className="border border-gray-300 rounded-lg p-4 space-y-4">
        <h2 className="font-bold text-center text-lg">وضعیت سلامتی</h2>
        <div className="flex flex-wrap gap-3">
          {health.map((item) => (
            <label key={item} className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" />
              {item}
            </label>
          ))}
        </div>
        <InputComponents label="سایر موارد (توضیح دهید)" className="w-96" />
        <InputComponents label="بیماری خاص" className="w-96" />
        <div className="flex items-center gap-4 mt-2">
          <span>مصرف هر نوع دارو: (خوراکی، موضعی، تزریق)</span>
          <label className="flex items-center gap-1">
            <input type="radio" name="drug" /> بلی
          </label>
          <label className="flex items-center gap-1">
            <input type="radio" name="drug" /> خیر
          </label>
        </div>
        <InputComponents label="نام دارو" className="w-96" />
      </section>

      {/* Body Status */}
      <section className="border border-gray-300 rounded-lg p-4 space-y-4">
        <h2 className="font-bold text-center text-lg">وضعیت عمومی بدن</h2>
        <div>
          <InputComponents label="وزن" className="w-16" />
          <InputComponents label="قد" className="w-16" />
          <InputComponents
            label="تغییر وزن شدید در یک سال اخیر"
            className="w-24"
          />
          <div>
            <div className="flex flex-wrap gap-3 items-center">
              <span>تحرک :</span>
              {sport.map((item) => (
                <label key={item} className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" />
                  {item}
                </label>
              ))}
            </div>
          </div>
          <InputComponents label="سوابق ورزش دارید؟" className="w-72" />
          <InputComponents label="توضیح دهید" className="w-72" />
        </div>
      </section>

      {/* Beauty Section */}
      <section className="border border-gray-300 rounded-lg p-4 space-y-4">
        <h2 className="font-bold text-center text-lg">
          زیبایی{" "}
          <span className="text-sm">(این قسمت مخصوص خدمات زیبایی میباشد)</span>
        </h2>
        <div className="flex flex-wrap gap-3 items-center">
          <span>علت مراجعه:</span>
          {beauty.map((item) => (
            <label key={item} className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" />
              {item}
            </label>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <InputComponents
            label="آیا عمل زیبایی انجام دادین؟"
            className="w-24"
          />
          <InputComponents
            label="درصورت انجام عمل زیبایی موضع و نوع عمل زیبایی را ذکر
کنید"
            className="w-72"
          />
          <InputComponents
            label="آیا تا کنون تزریق ژل و بوتاکس انجام داده اید ؟"
            className="w-24"
          />
          <InputComponents label="کدام قسمت" />
          <InputComponents label="تاریخ تزریق" />
          <InputComponents label="آیا در حال حاضردرمان های حرا رتی مانند سونا سوالریوم یا موارد دیگر انجام میدهید؟" />
          <InputComponents label="آیا یکماه پیش لیزر، پلینگ انجام داده اید؟" />
          <InputComponents
            label="در صورت وجود هر مورد مرتبط با زیبایی و ممنوعیت ها لطفا توضیح دهید"
            className="w-72"
          />
        </div>
      </section>

      {/* Female Section */}
      <section className="border border-gray-300 rounded-lg p-4 space-y-4">
        <h2 className="font-bold text-center text-lg">
          بانوان <span className="text-sm">(این قسمت مخصوص بانوان میباشد)</span>
        </h2>
        <div className="flex flex-wrap gap-4 items-center">
          <label className="flex items-center gap-2">
            بارداری <input type="checkbox" className="w-4 h-4" />
          </label>
          <InputComponents label="تعداد بارداری" className="w-16" />
          <label className="flex items-center gap-2">
            در حال شیردهی به کودک <input type="checkbox" className="w-4 h-4" />
          </label>
          <label className="flex items-center gap-2">
            کیست تخمدان <input type="checkbox" className="w-4 h-4" />
          </label>
          <label className="flex items-center gap-2">
            کیست سینه <input type="checkbox" className="w-4 h-4" />
          </label>
          <p>اگر در دوران قائدگی هستید حتما ماساژیست خود را آگاه کنید</p>
          <InputComponents label="تاریخ قائدگی" />
        </div>
      </section>

      {/* Signature */}
      <section className="border border-gray-300 rounded-lg p-4 space-y-2">
        <p>
          اینجانب {dataById?.booking.customer_name ?? <InputComponents />} با
          رضایت خود و مشورت با پزشک این مرکز را برای خدمات انتخاب نموده‌ام و
          متعهد می‌شوم که هیچگونه بیماری خاصی نداشته و از سلامت کامل برخوردارم.
          در غیر این صورت، بروز هرگونه اتفاق در هنگام و پس از ماساژ به عهده
          اینجانب می‌باشد.
        </p>
        <label className="block font-medium text-center">
          نام و امضاء مراجعه کننده:
        </label>
      </section>

      {/* Submit Button */}
      <div className="text-center mt-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
          ثبت فرم
        </button>
      </div>
    </form>
  );
};

export default PersonalInfo;
