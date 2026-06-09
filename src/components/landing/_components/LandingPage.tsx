import NavigationBar from "./NavigationBar";
import HeroSection from "./HeroSection";
import KeyFeatures from "./KeyFeatures";
import WhyPalize from "./WhyPalize";
import CTASection from "./CTASection";
import Footer from "./Footer";
import AboutSection from "./AboutSection";
import KeyMessageSection from "./KeyMessageSection";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-slate-50 to-green-50/30"
      dir="rtl"
    >
      <Helmet>
        <title>پالیز | مدیریت هوشمند مراکز سلامتی و تندرستی</title>

        <meta
          name="description"
          content="پالیز، پلتفرم هوشمند مدیریت مراکز سلامتی، ماساژ و حجامت. مدیریت خدمات، نوبت‌دهی و گزارش‌های یکپارچه برای مراکز تندرستی — همین امروز رایگان امتحان کنید."
        />

        <link rel="canonical" href="https://wellness.mesal.ir/" />
      </Helmet>
      <NavigationBar />
      <HeroSection />
      <KeyMessageSection />
      <KeyFeatures />
      <AboutSection />
      <WhyPalize />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
