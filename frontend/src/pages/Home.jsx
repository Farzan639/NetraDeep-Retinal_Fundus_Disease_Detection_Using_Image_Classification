import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import RetinaCarousel from "../components/RetinaCarousel";
import DiseasesGrid from "../components/DiseasesGrid";

const Home = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === "#diseases") {
      const section = document.getElementById("diseases");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [hash]);

  return (
    <>
      {/* Hero Section */}
      <RetinaCarousel />

      {/* Diseases Section */}
      <section
  id="diseases"
  className="relative mx-auto mt-20 w-full max-w-6xl px-6"
>
  <div className="text-center">
    <h2 className="text-4xl font-bold text-gray-800">
      Detectable Retinal Conditions
    </h2>

    <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
      Our AI system identifies 11 major retinal diseases using advanced deep learning models trained on fundus imaging datasets.
    </p>
  </div>

  <DiseasesGrid />
</section>
    </>
  );
};

export default Home;