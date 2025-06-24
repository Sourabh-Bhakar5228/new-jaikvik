import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Navigation, Autoplay } from "swiper/modules";
import ArrowLeft from "../../components/arrows/ArrowLeft";
import ArrowRight from "../../components/arrows/ArrowRight";
import ServiceCard from "../../components/cards/ServiceCard";
import services from "../../configs/all-services";

const OurServices = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const isHovered = useRef(false);

  const handleHover = (value: boolean) => {
    isHovered.current = value;
    if (swiperRef.current) {
      if (value) {
        swiperRef.current.autoplay.stop();
      } else {
        if (!swiperRef.current.autoplay.paused) {
          swiperRef.current.autoplay.start();
        }
      }
    }
  };

  return (
    <section className="overflow-hidden h-auto my-8 px-4">
      <div className="websiteHeading mb-6">
        <h2 className="uppercase text-gray-200 text-2xl inline-block relative font-bold">
          <a
            href="#"
            className="flex items-center gap-2 ml-2 hover:text-white transition-colors"
          >
            Our Services
          </a>
        </h2>
      </div>

      <div className="w-full group relative">
        <div
          onMouseEnter={() => handleHover(true)}
          onMouseLeave={() => handleHover(false)}
        >
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView="auto"
            breakpoints={{
              320: {
                slidesPerView: 1.2,
                spaceBetween: 10,
              },
              400: {
                slidesPerView: 1,
                spaceBetween: 12,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 18,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1536: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            loop
            autoplay={{
              delay: 900,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="mySwiper"
          >
            {services.map((item, index) => (
              <SwiperSlide key={index} className="pb-8">
                <div className="relative rounded-lg overflow-hidden transition-all duration-500 ease-in-out hover:z-10">
                  <ServiceCard
                    {...item}
                    handleHover={handleHover}
                    className="hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <ArrowLeft
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 rounded-full p-2 hover:bg-black/80 transition-colors"
        />
        <ArrowRight
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 rounded-full p-2 hover:bg-black/80 transition-colors"
        />
      </div>
    </section>
  );
};

export default OurServices;
