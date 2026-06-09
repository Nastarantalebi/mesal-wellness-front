import { Separator } from "@/components/ui/separator";
import { Instagram, Mail, MapPin, Phone, Send, Sparkles } from "lucide-react";

const Footer = () => {
  return (
    // ❶ Removed wrapper <div> — <footer> is the correct root
    // ❷ <footer> implicitly has role="contentinfo" when a direct child of <body>
    <footer id="contact" className="bg-gray-900 text-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            {/* ❸ Logo wrapped in <a> — crawlable link back to homepage */}
            <a
              href="/"
              aria-label="پالیز – بازگشت به صفحه اصلی"
              className="flex items-center gap-3 no-underline"
            >
              <div
                aria-hidden="true"
                className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center"
              >
                <Sparkles className="h-7 w-7 text-white" />
              </div>
              <span className="text-2xl font-bold">پالیز</span>
            </a>

            <p className="text-gray-400 leading-relaxed">
              پلتفرم هوشمند مدیریت مراکز سلامتی و تندرستی
            </p>

            {/* ❹ Social links — real hrefs + aria-label per icon */}
            <div role="list" className="flex gap-4">
              <a
                role="listitem"
                href="https://instagram.com/paliz.ir"
                aria-label="صفحه اینستاگرام پالیز"
                rel="noopener noreferrer"
                target="_blank"
                className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-600 transition-colors duration-300"
              >
                <Instagram className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                role="listitem"
                href="https://t.me/paliz_ir"
                aria-label="کانال تلگرام پالیز"
                rel="noopener noreferrer"
                target="_blank"
                className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-600 transition-colors duration-300"
              >
                <Send className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          {/* ❺ <nav> with aria-label — footer nav is a distinct landmark from header nav */}
          <nav aria-label="دسترسی سریع">
            <h2 className="text-lg font-bold mb-4">دسترسی سریع</h2>
            <ul className="space-y-3 text-gray-400">
              {[
                { href: "#features", label: "ویژگی‌ها" },
                { href: "#advantages", label: "برتری‌ها" },
                { href: "#why", label: "چرا پالیز" },
                { href: "/pricing", label: "قیمت‌گذاری" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="hover:text-green-400 transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Support */}
          <nav aria-label="پشتیبانی">
            <h2 className="text-lg font-bold mb-4">پشتیبانی</h2>
            <ul className="space-y-3 text-gray-400">
              {[
                { href: "/help", label: "مرکز راهنما" },
                { href: "/docs", label: "مستندات" },
                { href: "/contact", label: "تماس با ما" },
                { href: "/faq", label: "سوالات متداول" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="hover:text-green-400 transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          {/* ❻ <address> — semantic element for contact info, indexed by crawlers */}
          <address className="not-italic">
            <h2 className="text-lg font-bold mb-4 text-white">تماس با ما</h2>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-3">
                <Phone
                  className="h-5 w-5 text-green-500 flex-shrink-0"
                  aria-hidden="true"
                />
                {/* ❼ tel: link — machine-readable, crawlable, clickable on mobile */}
                <a
                  href="tel:+982112345678"
                  className="hover:text-green-400 transition-colors"
                >
                  ۰۲۱-۱۲۳۴۵۶۷۸
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail
                  className="h-5 w-5 text-green-500 flex-shrink-0"
                  aria-hidden="true"
                />
                {/* ❽ mailto: link — crawlable, signals contact info to Google */}
                <a
                  href="mailto:info@paliz.ir"
                  className="hover:text-green-400 transition-colors"
                >
                  info@paliz.ir
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin
                  className="h-5 w-5 text-green-500 flex-shrink-0"
                  aria-hidden="true"
                />
                <span>تهران، خیابان ولیعصر</span>
              </li>
            </ul>
          </address>
        </div>

        <Separator className="my-8 bg-gray-800" />

        {/* ❾ <small> is semantically correct for legal/copyright text */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <small className="text-gray-400 text-sm">
            © ۱۴۰۵ پالیز. تمامی حقوق محفوظ است.
          </small>
          <nav aria-label="قوانین و حریم خصوصی" className="flex gap-6">
            <a
              href="/privacy"
              className="hover:text-green-400 transition-colors"
            >
              حریم خصوصی
            </a>
            <a href="/terms" className="hover:text-green-400 transition-colors">
              قوانین استفاده
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
