import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import image from "../assets/image.png";
import Cover from "../assets/cover.png";

import "swiper/css";
import "swiper/css/pagination";

const RetinaCarousel = () => {
  return (
    <div className="w-full h-[70vh]">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        loop={true}
        className="h-full"
      >
        <SwiperSlide>
          <img
            src={Cover}
            alt="Retina 1"
            className="w-full h-full bg-black object-cover"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src={image}
            alt="Retina 2"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="https://images.unsplash.com/photo-1597764699519-5b28cba3b6f5"
            alt="Retina 3"
            className="w-full h-full object-contain"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default RetinaCarousel;
