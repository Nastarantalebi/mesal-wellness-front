import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";


const HeroSection = () => {
const navigate = useNavigate();
  return (
    <div>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-green-600/10 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <Badge className="bg-green-100 text-green-800 border-green-200 px-4 py-2 text-sm font-medium">
                پلتفرم هوشمند مدیریت مراکز سلامتی
              </Badge>

              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-gray-900">سامانه</span>
                <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                  {" "}
                  تندرستی
                </span>
                <br />
                <span className="text-3xl lg:text-4xl text-gray-700 mt-4 block">
                  قلب تپنده مرکز سلامتی و زیبایی
                </span>
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                در دنیای پرسرعت امروز، بستری نوین برای سازماندهی خدمات ماساژ،
                حجامت، آرایش و مراکز سلامتی و تندرستی فراهم می‌کنیم.
                <br />
                <br />
                اینجا جلسات درمانی، نوبت‌دهی‌ها و تعاملات در یک داشبورد یکپارچه
                جمع می‌شوند، بدون پیچیدگی و با حداکثر کارایی.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                onClick={() => navigate("/login")}
                  size="lg"
                  variant="outline"
                  className="border-2 border-green-200 text-green-700 hover:bg-green-50 px-8 text-lg"
                >
                  ورود
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-700">۵۰۰+</div>
                  <div className="text-sm text-gray-600">مرکز فعال</div>
                </div>
                <div className="w-px h-12 bg-green-200"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-700">۱۰K+</div>
                  <div className="text-sm text-gray-600">نوبت روزانه</div>
                </div>
                <div className="w-px h-12 bg-green-200"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-700">۹۸٪</div>
                  <div className="text-sm text-gray-600">رضایت</div>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative scale-150 ">
                <img
                  src="/Landing/hero.webp"
                  alt="خدمات ماساژ درمانی"
                  className="rounded-3xl shadow-2xl shadow-green-200/50 transform hover:scale-105 transition-transform duration-500 w-full h-auto"
                />
                <div className="absolute bottom-5  bg-white rounded-2xl shadow-xl p-4 border border-green-100">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-green-700" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">
                        صرفه‌جویی در زمان
                      </div>
                      <div className="text-xs text-gray-600">
                        تا ۷۰٪ کاهش کارهای اداری
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
