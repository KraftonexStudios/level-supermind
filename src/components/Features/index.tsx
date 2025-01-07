import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

const Features = () => {
  return (
    <>
      <section id="features" className="py-16 md:py-20 lg:py-28 px-10">
        <div className="container">
          <SectionTitle
            title="Main Features"
            paragraph="Explore the main features of our application, designed to provide you with the best user experience and functionality. Each feature is crafted to enhance your productivity and streamline your workflow."
            center
          />

          <div className="grid place-items-center grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map((feature) => (
              <SingleFeature key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
