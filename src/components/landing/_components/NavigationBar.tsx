import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NAV_LINKS = [
  { href: "#features", label: "ویژگی‌ها" },
  { href: "#advantages", label: "برتری‌ها" },
  { href: "#why", label: "چرا پالیز؟" },
  { href: "#contact", label: "تماس" },
] as const;

const NavigationBar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => navigate("/login");

  return (
    <header role="banner">
      <nav
        aria-label="Navigation Bar"
        className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-green-100 z-50"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo — wrapped in <a> pointing to home for crawlability */}
            <a
              href="/"
              aria-label="پالیز – صفحه اصلی"
              className="flex items-center gap-3 no-underline"
            >
              <div className="h-10 w-10 rounded-xl flex items-center justify-center">
                <img
                  src="/wellnessLogo.png" // absolute path; avoid relative `./`
                  alt="" // decorative — text next to it is the label
                  width={40}
                  height={40}
                  loading="eager" // LCP asset; don't lazy-load
                />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-700 to-green-900 bg-clip-text text-transparent">
                پالیز
              </span>
            </a>

            {/* Primary navigation — <ul> gives screen readers a list landmark */}
            <ul
              role="list"
              className="hidden md:flex items-center gap-8 m-0 p-0 list-none"
            >
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-sm text-gray-700 hover:text-green-700 transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            {/* CTA — use <a> if it points to a page; keep <button> only for actions */}
            <Button
              onClick={handleLoginClick}
              aria-label="ورود به حساب کاربری"
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg shadow-green-200"
            >
              ورود
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavigationBar;
