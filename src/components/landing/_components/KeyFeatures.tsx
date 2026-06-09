import { CheckCircle2 } from "lucide-react";
import { features } from "../_fixtures/data";

const KeyFeatures = () => {
  return (
    // ❶ Removed wrapper <div> — <section> is the correct root
    <section
      id="advantages"
      aria-labelledby="advantages-heading"
      className="bg-white"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-col lg:flex-row justify-between items-center md:gap-12 relative">
          <div className="w-full lg:w-1/2 h-[400px] lg:h-[600px]">
            {/* ❷ Descriptive alt with keywords — vague "رزرو و مدیریت" replaced */}
            <img
              src="/Landing/detail.webp"
              alt="نمایی از قابلیت‌های مدیریت نوبت و خدمات درمانی در پلتفرم پالیز"
              width={600}
              height={600}
              loading="lazy" // ❸ Below the fold — lazy is correct here
              decoding="async"
              className="w-full h-full object-contain rounded-3xl shadow-2xl shadow-gray-100"
            />

            {/* ❹ Decorative gradient — aria-hidden so crawlers skip it */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-b from-white via-transparent to-white"
            />
          </div>

          <div className="w-full lg:w-1/2 space-y-8 mt-10">
            <div className="text-center lg:text-right">
              {/* ❺ id ties to aria-labelledby on <section> */}
              <h2
                id="advantages-heading"
                className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
              >
                برتری‌های کلیدی
              </h2>
              <p className="text-base sm:text-lg text-gray-600">
                تمام ابزارهای مورد نیاز برای مدیریت حرفه‌ای مرکز تندرستی شما
              </p>
            </div>

            {/* ❻ <ul> instead of bare <div>s — list semantics help crawlers
                understand this is an enumerated set of features            */}
            <ul
              aria-label="فهرست برتری‌های پلتفرم پالیز"
              className="space-y-4 list-none p-0 m-0"
            >
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-green-50 to-transparent hover:from-green-100 transition-colors duration-300 group cursor-default"
                >
                  {/* ❼ Icon is decorative — aria-hidden keeps it out of the content tree */}
                  <div
                    aria-hidden="true"
                    className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                  >
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-base sm:text-lg font-medium text-gray-900">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
