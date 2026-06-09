const KeyMessageSection = () => {
  return (
    // ❶ Semantic section with aria-labelledby — no wrapper <div> needed
    <section
      aria-labelledby="key-message-heading"
      className="py-16 bg-gradient-to-r from-green-700 to-green-900"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white space-y-4">
          {/* ❷ <h2> is correct here — sits below <h1> in HeroSection in the outline */}
          <h2
            id="key-message-heading"
            className="text-3xl lg:text-4xl font-bold"
          >
            مدیریت هوشمند مراکز سلامتی، قابل اتکا و پایدار
          </h2>

          {/* ❸ <p> with keyword-rich content — crawlers index this as section summary */}
          <p className="text-green-100 text-lg max-w-3xl mx-auto">
            ما باور داریم خدمات تندرستی باید آسان، قابل پیش‌بینی و همگام با
            زندگی روزمره‌تان باشند – برای انتخابی آگاهانه‌تر و زندگی سالم‌تر
          </p>
        </div>
      </div>
    </section>
  );
};

export default KeyMessageSection;
