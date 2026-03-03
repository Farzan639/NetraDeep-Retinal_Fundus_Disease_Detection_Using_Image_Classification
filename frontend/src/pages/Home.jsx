import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import RetinaCarousel from "../components/RetinaCarousel";

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
      <RetinaCarousel />

      <section
        id="diseases"
        className="mx-auto mt-8 w-full max-w-6xl rounded-2xl border border-blue-100 bg-white px-6 py-8 shadow-sm"
      >
        <h2 className="text-2xl font-semibold text-blue-700">Diseases</h2>
        <p className="mt-3 text-gray-600">
          This section can highlight retinal diseases, symptoms, and sample
          fundus images.
        </p>
      </section>
    </>
  );
};

export default Home;
