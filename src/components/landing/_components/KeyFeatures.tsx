import { CheckCircle2 } from "lucide-react";
import { features } from "../_fixtures/data";

const KeyFeatures = () => {
  return (
    <div>
      {/* Key Features */}
      <section id="features" className=" bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center md:gap-12 relative">
            <div className="w-full lg:w-1/2 h-[400px] lg:h-[600px]">
              <img
                src="/Landing/detail.webp"
                alt="رزرو و مدیریت"
                className="w-full h-full object-contain rounded-3xl shadow-2xl shadow-gray-100"
              />
              {/* <div className="absolute inset-0 bg-white/60"></div> */}

              {/* گرادیانت */}
              <div className="absolute inset-0 bg-linear-to-b from-white via-transparent to-white"></div>
            </div>

            <div className="w-full lg:w-1/2 space-y-8">
              <div className="text-center lg:text-right">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  برتری‌های کلیدی
                </h2>
                <p className="text-base sm:text-lg text-gray-600">
                  تمام ابزارهای مورد نیاز برای مدیریت حرفه‌ای مرکز تندرستی شما
                </p>
              </div>

              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-green-50 to-transparent hover:from-green-100 transition-colors duration-300 group cursor-default"
                  >
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    </div>
                    <span className="text-base sm:text-lg font-medium text-gray-900">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KeyFeatures;
