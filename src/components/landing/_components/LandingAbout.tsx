import Button from "@/components/Button";
import { dataLanding } from "../_fixtures/data";

const LandingAbout = () => {
  return (
    <section className="mt-40" id="section-about">
      <h2
        className="font-extrabold my-6 text-3xl flex items-center justify-center"
        id="section-capabilities"
      >
        {dataLanding.about.name}
      </h2>
      <div className="grid grid-cols-1">
        {dataLanding.about.data.map((item, index) => (
          <div
            key={index}
            className={`flex items-center`}
          >
            <Button className="rounded-full w-10 h-10 ml-5 bg-primary text-white">{index+1}</Button>
            <div className="flex items-start justify-center flex-col">
              <h3 className="font-bold text-xl my-1.5">{item.title} </h3>
              <span className="text-lg text-gray-500">{item.description}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LandingAbout;
