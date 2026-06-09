const ABOUT_CARDS = [
  {
    id: "mission-heading",
    title: "رسالت ما",
    body: `خدمات تندرستی را به ابزاری ساده و قدرتمند تبدیل می‌کنیم تا
           با امنیت و دقت، به آرامش پایدار برسید و مسیر مدیریت هموارتر شود`,
  },
  {
    id: "goal-heading",
    title: "ماموریت ما",
    body: `ایجاد اکوسیستم دیجیتال برای مراکز ماساژ، حجامت و آرایش با
           نوبت‌دهی هوشمند، گزارش‌ها و مدیریت شعب`,
  },
  {
    id: "slogan-heading",
    title: "شعار ما",
    body: `این سامانه، خستگی مدیریت را به آرامش و اعتماد تبدیل می‌کند –
           برای متخصصانی که به دنبال کارایی بیشتر و مشتریانی که شایسته
           خدمات برترند`,
  },
] as const;

const GALLERY_IMAGES = [
  {
    src: "/Landing/wellness-center.jpg",
    alt: "فضای داخلی مرکز تندرستی و سلامت پالیز",
    className:
      "rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300",
  },
  {
    src: "/Landing/images.jpg",
    alt: "محیط آرامش‌بخش مرکز اسپا و ماساژ درمانی",
    className:
      "rounded-2xl mt-20 shadow-lg transform hover:scale-105 transition-transform duration-300",
  },
  {
    src: "/Landing/team-work.jpg",
    alt: "تیم متخصص مدیریت مرکز سلامتی و زیبایی",
    className:
      "rounded-2xl mr-20 shadow-lg transform hover:scale-105 transition-transform duration-300",
  },
] as const;

const AboutSection = () => {
  return (
    // ❶ Removed wrapper <div> — <section> is the correct root
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-10 bg-white"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            {/* ❷ <h2> with id for aria-labelledby */}
            <h2 id="about-heading" className="text-4xl font-bold text-gray-900">
              پالیز کیست؟{" "}
            </h2>
            <h3 className="text-xl text-gray-900">
              متخصص مدیریت مراکز سلامتی و تندرستی
            </h3>
            {/* ❸ Cards are a definition-like list — <dl> is the most accurate
                semantic element for term/description pairs               */}
            <dl className="space-y-4">
              {ABOUT_CARDS.map(({ id, title, body }) => (
                <div
                  key={id}
                  className="bg-gradient-to-r from-green-50 to-transparent p-6 rounded-xl border-r-4 border-green-600"
                >
                  {/* ❹ <dt> = term, <dd> = description — correct HTML for this pattern */}
                  <dt id={id} className="text-xl font-bold text-green-800 mb-2">
                    {title}
                  </dt>
                  <dd className="text-gray-700 leading-relaxed m-0">{body}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* ❺ <figure> groups related images as a single content unit */}
          <figure
            aria-label="تصاویر محیط و تیم مراکز تندرستی پالیز"
            className="grid grid-cols-2 gap-4 m-0"
          >
            {GALLERY_IMAGES.map(({ src, alt, className }) => (
              <img
                key={src}
                src={src}
                alt={alt} // ❻ Keyword-rich, unique alt per image
                width={300}
                height={300}
                loading="lazy" // ❼ Below the fold — lazy is correct
                decoding="async"
                className={className}
              />
            ))}
          </figure>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
