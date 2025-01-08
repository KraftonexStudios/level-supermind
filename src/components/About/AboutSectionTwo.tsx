const AboutSectionTwo = () => {
  return (
    <section className="py-16 px-10 md:py-20 lg:py-28 flex justify-center items-center">
      <div className="container">
        <div className="mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <div
              className="relative mx-auto mb-12 aspect-[25/24] max-w-[500px] text-center lg:m-0"
              data-wow-delay=".15s"
            >
              <img
                src="/images/about/about-image-2.svg"
                alt="about image"
                className="drop-shadow-three dark:hidden dark:drop-shadow-none"
              />
              <img
                src="/images/about/about-image-2-dark.svg"
                alt="about image"
                className="hidden drop-shadow-three dark:block dark:drop-shadow-none"
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="max-w-[470px]">
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-heading2-color sm:text-2xl lg:text-xl xl:text-2xl">
                  Accurate Insight Extraction
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  Seamlessly transform raw data into meaningful insights with
                  cutting-edge AI technology.
                </p>
              </div>
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-heading2-color sm:text-2xl lg:text-xl xl:text-2xl">
                  Reliable AI Integration
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  Harness the power of LangFlow and OpenAI for dependable and
                  efficient data processing.
                </p>
              </div>
              <div className="mb-1">
                <h3 className="mb-4 text-xl font-bold text-heading2-color sm:text-2xl lg:text-xl xl:text-2xl">
                  Scalable Solutions
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  Built to grow with your needs, offering flexibility and
                  reliability for every use case.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
