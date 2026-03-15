import { dataLanding } from "../_fixtures/data"

const LandingCapabilities = () => {
  return (
      <section className="mt-10">
        <h2 className="font-extrabold my-6 text-3xl flex items-center justify-center" id="section-capabilities">
          {dataLanding.capabilities.name}
        </h2>

        <div className="grid drid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {dataLanding.capabilities.data.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-center flex-col pb-4 border rounded-2xl cursor-pointer transition duration-400 hover:scale-105 hover:bg-gray-100">
              <img src={item.src} alt="card images" />
              <div className="flex items-center justify-center flex-col mx-2">
                <h3 className="font-bold">{item.title} </h3>
                <span className="text-sm text-gray-700 px-2 flex items-center justify-content">
                  {item.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
  )
}

export default LandingCapabilities
