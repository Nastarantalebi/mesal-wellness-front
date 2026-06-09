import { CheckCircle2 } from "lucide-react";
import { whyPaliz } from "../_fixtures/data";

const WhyPaliz = () => {
  return (
    // ❶ Removed wrapper <div> — <section> is the correct root
    <section
      id="why"
      aria-labelledby="why-paliz-heading"
      className="py-20 bg-gradient-to-b from-green-900 to-green-950 text-white"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* ❷ id ties to aria-labelledby on <section> */}
          <h2
            id="why-paliz-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
          >
            چرا پالیز؟
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-green-100 max-w-2xl mx-auto">
            پلتفرمی جامع با رویکردهای نوین در مدیریت مراکز سلامتی و تندرستی
          </p>
        </div>

        {/* ❸ <ul> for the list of category blocks */}
        <ul className="space-y-12 list-none p-0 m-0">
          {whyPaliz.map((section, index) => (
            <li
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-12 border border-white/10"
            >
              <div className="text-center mb-8">
                {/* ❹ <h3> correct here — one level below <h2> "چرا پالیز؟" */}
                <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                  {section.title}
                </h3>
                {/* ❺ <p> instead of bare text — gives crawlers paragraph context */}
                <p className="text-green-300 text-base sm:text-lg">
                  {section.subtitle}
                </p>
              </div>

              {/* ❻ Nested <ul> for feature items within each category */}
              <ul className="grid md:grid-cols-2 gap-6 list-none p-0 m-0">
                {section.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="flex items-start gap-4 p-6 rounded-xl bg-gradient-to-r from-green-800/30 to-transparent hover:from-green-700/40 transition-all duration-300 group"
                  >
                    {/* ❼ Decorative icon — aria-hidden */}
                    <div
                      aria-hidden="true"
                      className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-1"
                    >
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                    <p className="text-green-100 text-base sm:text-lg leading-relaxed group-hover:text-white transition-colors duration-300">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default WhyPaliz;
