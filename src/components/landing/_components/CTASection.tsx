import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";

const CTASection = () => {
  return (
    // ❶ Removed wrapper <div> — <section> is the correct root
    <section
      aria-labelledby="cta-heading"
      className="py-24 bg-gradient-to-br from-green-50 to-green-100"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-3xl shadow-2xl p-12 border-2 border-green-200">
          {/* ❷ Decorative icon — aria-hidden, no content value */}
          <div
            aria-hidden="true"
            className="h-20 w-20 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center mx-auto mb-8 shadow-xl"
          >
            <TrendingUp className="h-10 w-10 text-white" />
          </div>

          {/* ❸ id ties to aria-labelledby on <section> */}
          <h2
            id="cta-heading"
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            آماده تحول در مدیریت مرکز خود هستید؟
          </h2>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            همین امروز به هزاران مرکز موفق بپیوندید که با پالیز، مدیریت را به
            آرامش تبدیل کرده‌اند
          </p>

          {/* ❹ <nav> with aria-label groups CTA actions as a named landmark */}
          <nav
            aria-label="اقدامات اصلی"
            className="flex flex-wrap justify-center gap-4"
          >
            {/* ❺ <a> instead of <button> — both CTAs navigate to pages,
                so <a> is semantically correct and crawlable             */}
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-10 shadow-xl shadow-green-200 text-lg h-14"
            >
              <a
                href="/register"
                aria-label="شروع دوره آزمایشی رایگان ۱۴ روزه پالیز"
              >
                شروع رایگان ۱۴ روزه
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-green-600 text-green-700 hover:bg-green-50 px-10 text-lg h-14"
            >
              <a
                href="/contact"
                aria-label="درخواست مشاوره رایگان از تیم پالیز"
              >
                درخواست مشاوره
              </a>
            </Button>
          </nav>

          {/* ❻ <ul> for trust signals — structured list, not a bare <p> */}
          <ul
            aria-label="مزایای استفاده از پالیز"
            className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-8 list-none p-0 m-0"
          >
            {[
              "بدون نیاز به کارت بانکی",
              "لغو در هر زمان",
              "پشتیبانی اختصاصی",
            ].map((item) => (
              <li key={item} className="text-sm text-gray-500">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
