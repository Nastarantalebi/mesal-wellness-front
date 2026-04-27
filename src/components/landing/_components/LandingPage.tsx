import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Users,
  FileText,
  MessageSquare,
  BarChart3,
  Sparkles,
  CheckCircle2,
  Clock,
  Shield,
  TrendingUp,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Send,
} from "lucide-react";
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
      <AboutSection />
      <KeyFeatures />
      <WhyPalize />
      <CTASection />
      <Footer />
      
    </div>
  );
};

export default Index;
