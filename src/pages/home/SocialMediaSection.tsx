import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Navigation, Autoplay } from "swiper/modules";
import ArrowLeft from "../../components/arrows/ArrowLeft";
import ArrowRight from "../../components/arrows/ArrowRight";
import ReelVideoCard from "../../components/cards/ReelVideoCard";
import reels from "../../configs/all-reels";

const SocialMediaSection = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);

  const handleVideoHover = (value: boolean) => {
    if (!swiperRef.current) return;
    setIsAutoplayPaused(value);

    requestAnimationFrame(() => {
      if (value) {
        swiperRef.current?.autoplay.stop();
      } else {
        setTimeout(() => {
          if (swiperRef.current && !isAutoplayPaused) {
            swiperRef.current.autoplay.start();
          }
        }, 100);
      }
    });
  };

  return (
    <div className="overflow-hidden h-auto my-4">
      <div className="websiteHeading mb-4">
        <h2 className="uppercase text-gray-200 text-xl inline-block relative">
          <a href="#" className="flex font-bold items-center gap-1.5 ml-2">
            Social Media Reels
          </a>
        </h2>
      </div>
      <div className="w-full group relative">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={10}
          slidesPerView={4.5}
          breakpoints={{
            // when window width is >= 320px
            320: {
              slidesPerView: 1.2,
              spaceBetween: 10,
            },
            // when window width is >= 480px
            480: {
              slidesPerView: 1.5,
              spaceBetween: 10,
            },
            // when window width is >= 640px
            640: {
              slidesPerView: 2.5,
              spaceBetween: 10,
            },
            // when window width is >= 768px
            768: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            // when window width is >= 1024px
            1024: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            // when window width is >= 1280px
            1280: {
              slidesPerView: 4.5,
              spaceBetween: 10,
            },
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          loop
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            waitForTransition: true,
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          speed={500}
          className="mySwiper !overflow-visible"
        >
          {reels.map((reel, index) => (
            <SwiperSlide key={index}>
              <ReelVideoCard
                src={reel.video}
                poster={reel.poster}
                onHover={handleVideoHover}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <ArrowLeft
          onClick={() => {
            swiperRef.current?.slidePrev();
          }}
        />
        <ArrowRight
          onClick={() => {
            swiperRef.current?.slideNext();
          }}
        />
      </div>
      <div className="swiper-pagination top-3 text-right pr-5 -z-10"></div>
    </div>
  );
};

export default SocialMediaSection;
