import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-green-100 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl flex items-center justify-center">
                <img src="./wellnessLogo.png" alt="logo" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-700 to-green-900 bg-clip-text text-transparent">
                پالیز
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                className="text-sm text-gray-700 hover:text-green-700 transition-colors"
              >
                ویژگی‌ها
              </a>
              <a
                href="#advantages"
                className="text-sm text-gray-700 hover:text-green-700 transition-colors"
              >
                برتری‌ها
              </a>
              <a
                href="#why"
                className="text-sm text-gray-700 hover:text-green-700 transition-colors"
              >
                چرا پالیز؟
              </a>
              <a
                href="#contact"
                className="text-sm text-gray-700 hover:text-green-700 transition-colors"
              >
                تماس
              </a>
            </div>
            <Button
              onClick={() => navigate("/login")}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg shadow-green-200"
            >
              ورود
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;
