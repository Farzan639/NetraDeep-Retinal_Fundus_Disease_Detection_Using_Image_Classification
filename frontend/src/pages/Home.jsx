import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import RetinaCarousel from "../components/RetinaCarousel";
import DiseasesGrid from "../components/DiseasesGrid";

const MotionDiv = motion.div;

const Home = () => {
  const navigate = useNavigate();
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === "#diseases") {
      const section = document.getElementById("diseases");
      if (section) {
        const targetTop = section.offsetTop - 180;
        if (window.scrollY < targetTop) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }
  }, [hash]);

  useEffect(() => {
    const section = document.getElementById("diseases");
    if (!section) return;

    const handleScroll = () => {
      const triggerPoint = section.offsetTop - 180;
      const isInDiseasesSection = window.scrollY >= triggerPoint;

      if (isInDiseasesSection && hash !== "#diseases") {
        navigate("/#diseases", { replace: true });
      } else if (!isInDiseasesSection && hash === "#diseases") {
        navigate("/", { replace: true });
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hash, navigate]);

  return (
    <>
      <RetinaCarousel />

      <section id="diseases" className="w-full  ">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full  bg-slate-900/70 px-6 py-12   backdrop-blur-sm sm:px-10 lg:px-14"
        >
          <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-sky-300">
            Conditions We Detect
          </p>
          <h2 className="mt-3 text-center text-3xl font-semibold text-slate-100 md:text-4xl">
            Comprehensive Retinal Disease Coverage
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-slate-300 md:text-lg">
            NetraDeep identifies 11 major retinal conditions with confidence
            scoring designed for triage support and clinical review workflows.
          </p>
          <DiseasesGrid />
        </MotionDiv>
      </section>
    </>
  );
};

export default Home;
