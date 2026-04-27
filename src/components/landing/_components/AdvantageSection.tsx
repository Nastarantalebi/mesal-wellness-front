import { advantages } from "../_fixtures/data";

const AdvantageSection = () => {
  return (
    <div>
      {/* Advantages Section */}
      <section
        id="advantages"
        className="py-20 bg-gradient-to-b from-slate-50 to-green-50/20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              برتری‌های منحصر به فرد
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              با مجموعه‌ای کامل از ابزارهای مدیریت، مرکز خود را به سطح بالاتری
              از کارایی برسانید
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-200 transform hover:-translate-y-2"
              >
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <advantage.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {advantage.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {advantage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdvantageSection;
