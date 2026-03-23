import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import Cover from "../assets/Cover.png";


import "swiper/css";
import "swiper/css/pagination";

const MotionDiv = motion.div;

const RetinaCarousel = () => {
  const slides = [
    {
      src: Cover,
      title: "Clinical-Grade Retinal Intelligence",
      fit: "object-cover",
    },
    
  ];

  return (
    <section className="relative h-[82vh] w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4200 }}
        speed={900}
        pagination={{ clickable: true }}
        loop={true}
        className="h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.title}>
            <div className="relative h-full w-full">
              <img
                src={slide.src}
                alt={slide.title}
                className={`h-full w-full ${slide.fit}`}
              />
              <div className="absolute inset-0 " />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <MotionDiv
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="pointer-events-none absolute inset-x-0 top-1/2 z-20 mx-auto w-full max-w-6xl -translate-y-1/2 px-6"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-300">
          Retinal Disease Intelligence
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-slate-100 md:text-6xl">
          Advanced Screening Interface For Faster Eye-Care Decisions
        </h1>
        <p className="mt-6 max-w-2xl text-base text-slate-300 md:text-lg">
          Upload, analyze, and review high-confidence retinal predictions in a
          premium diagnostic workflow.
        </p>
      </MotionDiv>
    </section>
  );
};

export default RetinaCarousel;
