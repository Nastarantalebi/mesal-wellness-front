import NavigationBar from "./NavigationBar";
import HeroSection from "./HeroSection";
import KeyFeatures from "./KeyFeatures";
import WhyPalize from "./WhyPalize";
import CTASection from "./CTASection";
import Footer from "./Footer";
import AboutSection from "./AboutSection";
import KeyMessageSection from "./KeyMessageSection";

const Index = () => {
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-slate-50 to-green-50/30"
      dir="rtl"
    >
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
