import { CheckCircle2 } from "lucide-react";
import { whyPaliz } from "../_fixtures/data";

const WhyPalize = () => {
  return (
    <div>
      {/* Why Paliz Section */}
      <section
        id="why"
        className="py-20 bg-gradient-to-b from-green-900 to-green-950 text-white"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">چرا پالیز؟</h2>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              پلتفرمی جامع با رویکردهای نوین در مدیریت مراکز سلامتی و تندرستی
            </p>
          </div>

          <div className="space-y-12">
            {whyPaliz.map((section, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/10"
              >
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold mb-2">{section.title}</h3>
                  <p className="text-green-300 text-lg">{section.subtitle}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {section.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex items-start gap-4 p-6 rounded-xl bg-gradient-to-r from-green-800/30 to-transparent hover:from-green-700/40 transition-all duration-300 group"
                    >
                      <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      </div>
                      <p className="text-green-100 text-lg leading-relaxed group-hover:text-white transition-colors duration-300">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyPalize;
