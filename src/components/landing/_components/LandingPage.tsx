import { Link } from "react-router-dom";
import LandingCapabilities from "./LandingCapabilities";
import Button from "@/components/Button";
import LandingAbout from "./LandingAbout";
import LandingHero from "./LandingHero";

const LandingPage = () => {
  return (
    <div className="m-3">
      <div className="container max-w-7xl mx-auto flex flex-col items-center">
        <header className="flex items-center justify-between w-full">
          <div className="flex items-center justify-center flex-col">
            <img
              src="../public/Landing/trust.svg"
              alt="scales"
              className="w-12.5 h-12.5"
            />
            <strong className="text-sm">پالیز</strong>
          </div>
          <nav className="flex items-center justify-center gap-5 text-lg">
            <a href="#section-capabilities" className="">
              قابلیت ها
            </a>
            <a href="#section-features">ویژگی ها</a>
            <a href="#section-about">درباره ما</a>
          </nav>
          <div className="flex items-center justify-center gap-1">
            <Button className=" ml-0.5 bg-primary text-white">
              <Link to="/login">ورود</Link>
            </Button>
          </div>
        </header>
        <LandingHero />
        <LandingCapabilities />
        <LandingAbout />
        {/* <LandingHero />
        <LandingCapabilities />
        <LandingFeatures />
        <LandingAbout /> */}
      </div>
      <footer className=" border-t border-t-primary mt-20 mb-20 mx-10 flex flex-col md:flex-row justify-around md:items-center">
        <div className="flex flex-row items-center gap-5 mt-5">
          <div className="flex flex-col items-center justify-center">
            <img
              src="../public/landing/trust.svg"
              alt="scales"
              className="w-12.5 h-12.5"
            />
            <h3 className="text-lg">پالیز</h3>
          </div>
          <p className="max-w-110">
            پلتفرم هوشمندِ مدیریت ، قلب تپنده مرکز شما
          </p>
        </div>
        <div className="flex flex-col mt-5">
          <h3 className="text-lg">دسترسی سریع</h3>
          <ul>
            <li>
              <a href="#section-capabilities" className="text-blue-600">
                قابلیت ها
              </a>
            </li>
            <li>
              <a href="#section-features" className="text-blue-600">
                ویژگی ها
              </a>
            </li>
            <li>
              <a href="#section_about" className="text-blue-600">
                درباره ما
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
