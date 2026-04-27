import { Separator } from "@/components/ui/separator";
import { Instagram, Mail, MapPin, Phone, Send, Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <div>
      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center">
                  <Sparkles className="h-7 w-7 text-white" />
                </div>
                <span className="text-2xl font-bold">پالیز</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                پلتفرم هوشمند مدیریت مراکز سلامتی و تندرستی
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-600 transition-colors duration-300"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-600 transition-colors duration-300"
                >
                  <Send className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-4">دسترسی سریع</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a
                    href="#features"
                    className="hover:text-green-400 transition-colors"
                  >
                    ویژگی‌ها
                  </a>
                </li>
                <li>
                  <a
                    href="#advantages"
                    className="hover:text-green-400 transition-colors"
                  >
                    برتری‌ها
                  </a>
                </li>
                <li>
                  <a
                    href="#why"
                    className="hover:text-green-400 transition-colors"
                  >
                    چرا پالیز
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    قیمت‌گذاری
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-bold mb-4">پشتیبانی</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    مرکز راهنما
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    مستندات
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    تماس با ما
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-green-400 transition-colors"
                  >
                    سوالات متداول
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-bold mb-4">تماس با ما</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-green-500" />
                  <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-green-500" />
                  <span>info@paliz.ir</span>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-green-500" />
                  <span>تهران، خیابان ولیعصر</span>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="my-8 bg-gray-800" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>© ۱۴۰۵ پالیز. تمامی حقوق محفوظ است.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-green-400 transition-colors">
                حریم خصوصی
              </a>
              <a href="#" className="hover:text-green-400 transition-colors">
                قوانین استفاده
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
