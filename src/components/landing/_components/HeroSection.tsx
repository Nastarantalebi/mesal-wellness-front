import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

const STATS = [
  { value: "۵۰۰+", label: "مرکز فعال" },
  { value: "۱۰K+", label: "نوبت روزانه" },
  { value: "۹۸٪", label: "رضایت مشتریان" },
] as const;

const HeroSection = () => {
  return (
    // ❶ <main> wraps page-level content — signals primary content to crawlers
    <main id="main-content">
      <section
        aria-labelledby="hero-heading"
        className="relative pt-32 pb-20 overflow-hidden"
      >
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-green-600/10 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              {/* ❷ Badge is decorative UI — not a heading or landmark */}
              <Badge
                aria-hidden="true"
                className="bg-green-100 text-green-800 border-green-200 px-4 py-2 text-sm font-medium"
              >
                پلتفرم هوشمند مدیریت مراکز سلامتی
              </Badge>

              {/* ❸ Single <h1> per page — id ties to aria-labelledby on <section> */}
              <h1
                id="hero-heading"
                className="text-5xl lg:text-6xl font-bold leading-tight"
              >
                <span className="text-gray-900">سامانه</span>
                <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                  {" "}
                  تندرستی
                </span>
                {/* ❹ <span> with block display — avoids nesting block inside inline */}
                <span className="text-3xl lg:text-4xl text-gray-700 mt-4 block">
                  قلب تپنده مرکز سلامتی و زیبایی
                </span>
              </h1>

              {/* ❺ Keyword-rich description in <p> — crawlers index this as page summary */}
              <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                در دنیای پرسرعت امروز، بستری نوین برای سازماندهی خدمات ماساژ،
                حجامت، آرایش و مراکز سلامتی و تندرستی فراهم می‌کنیم.
                <br />
                <br />
                اینجا جلسات درمانی، نوبت‌دهی‌ها و تعاملات در یک داشبورد یکپارچه
                جمع می‌شوند، بدون پیچیدگی و با حداکثر کارایی.
              </p>

              <div className="flex flex-wrap gap-4">
                {/* ❻ Use <a> for page navigation — better for crawlers than onClick button */}
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-green-200 text-green-700 hover:bg-green-50 px-8 text-lg"
                >
                  <a href="/login" aria-label="ورود به پنل مدیریت پالیز">
                    ورود
                  </a>
                </Button>
              </div>

              {/* ❼ Stats in <ul> — structured list is more meaningful than bare divs */}
              <ul
                aria-label="آمار پلتفرم پالیز"
                className="flex items-center gap-8 pt-4 list-none p-0 m-0"
              >
                {STATS.map(({ value, label }, index) => (
                  <>
                    <li key={label} className="text-center">
                      {/* ❽ <strong> signals importance to crawlers */}
                      <strong className="block text-3xl font-bold text-green-700">
                        {value}
                      </strong>
                      <span className="text-sm text-gray-600">{label}</span>
                    </li>
                    {/* Decorative divider — hidden from assistive tech */}
                    {index < STATS.length - 1 && (
                      <li
                        key={`divider-${index}`}
                        aria-hidden="true"
                        className="w-px h-12 bg-green-200"
                      />
                    )}
                  </>
                ))}
              </ul>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative">
                {/* ❾ Descriptive alt text with keywords — critical for image SEO */}
                <img
                  src="/Landing/hero.webp"
                  alt="داشبورد مدیریت نوبت‌دهی و خدمات ماساژ و حجامت در پلتفرم پالیز"
                  width={600}
                  height={450}
                  loading="eager" // LCP image — never lazy-load
                  decoding="async"
                  className="rounded-3xl shadow-2xl shadow-green-200/50 transform hover:scale-105 transition-transform duration-500 w-full h-auto"
                />

                {/* ❿ aria-hidden — floating card is visual decoration, not content */}
                <div
                  aria-hidden="true"
                  className="absolute bottom-5 bg-white rounded-2xl shadow-xl p-4 border border-green-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                      <Clock
                        className="h-6 w-6 text-green-700"
                        aria-hidden="true"
                      />
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
    </main>
  );
};

export default HeroSection;
