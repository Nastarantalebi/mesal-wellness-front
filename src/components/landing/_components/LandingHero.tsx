import Button from "@/components/Button";
import { Link } from "react-router-dom";

const LandingHero = () => {
  return (
    <section className="flex items-center justify-center flex-col md:flex-row-reverse p-8 gap-15 ">
      <figure className="flex items-center justify-center w-full">
        <img
          className="rounded-4xl xl:max-w-[500px] lg:max-w-[450px] md:max-w-[400px] xl:min-w-[500px] lg:min-w-[450px] md:min-w-[400px] w-full"
          src="/women in hair salon-pana.svg"
          alt="image of wellness website dashboard"
        />
      </figure>
      <div className="md:text-start md:mt-15 text-center mt-5">
        <h1 className="font-extrabol text-2xl">
          پلتفرم هوشمندِ مدیریت ، قلب تپنده مرکز شما
        </h1>
        <p className="text-lg max-w-4xl mt-5">
          پالیز در دنیای پر سرعت امروز، بستری نوین برای سازماندهی و مدیریت مراکز
          سلامتی و زیبایی فراهم می کند. سامانه پالیز ، تمامی نیاز های مدیریتی
          مراکز ماساژ ، طب سنتی وسالن های زیبایی را در یک پلتفرم ساده ، در دسترس
          ، قابل تحلیل و برنامه ریزی متمرکز نموده است .
        </p>
        <Button className="mt-5 bg-primary text-white">
          <Link to="/login">نسخه رایگان</Link>
        </Button>
      </div>
    </section>
  );
};

//add comment

export default LandingHero;
