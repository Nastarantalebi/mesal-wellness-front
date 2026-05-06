const AboutSection = () => {
  return (
    <div>
      {/* About Section */}
      <section className="py-10 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">ما کیستیم؟</h2>

              <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-50 to-transparent p-6 rounded-xl border-r-4 border-green-600">
                  <h3 className="text-xl font-bold text-green-800 mb-2">
                    رسالت ما
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    خدمات تندرستی را به ابزاری ساده و قدرتمند تبدیل می‌کنیم تا
                    با امنیت و دقت، به آرامش پایدار برسید و مسیر مدیریت هموارتر
                    شود
                  </p>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-transparent p-6 rounded-xl border-r-4 border-green-600">
                  <h3 className="text-xl font-bold text-green-800 mb-2">
                    ماموریت ما
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    ایجاد اکوسیستم دیجیتال برای مراکز ماساژ، حجامت و آرایش با
                    نوبت‌دهی هوشمند، گزارش‌ها و مدیریت شعب
                  </p>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-transparent p-6 rounded-xl border-r-4 border-green-600">
                  <h3 className="text-xl font-bold text-green-800 mb-2">
                    شعار ما
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    این سامانه، خستگی مدیریت را به آرامش و اعتماد تبدیل می‌کند –
                    برای متخصصانی که به دنبال کارایی بیشتر و مشتریانی که شایسته
                    خدمات برترند
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <img
                src="/Landing/wellness-center.jpg"
                alt="مرکز wellness"
                className="rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300"
              />
              <img
                src="Landing/images.jpg"
                alt="داخلی spa"
                className="rounded-2xl mt-20 shadow-lg transform hover:scale-105 transition-transform duration-300"
              />
              <img
                src="Landing/team-work.jpg"
                alt="داخلی spa"
                className="rounded-2xl mr-20 shadow-lg transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutSection;
