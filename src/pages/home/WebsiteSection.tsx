import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import websites from "../../configs/all-websites";
import ArrowLeft from "../../components/arrows/ArrowLeft";
import ArrowRight from "../../components/arrows/ArrowRight";
import WebsiteCard from "../../components/cards/WebsiteCard";

const WebsiteSection = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);

  const onSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
    setIsAutoSliding(true);
  };

  const handleScrollComplete = () => {
    if (isAutoSliding) {
      let timer = setInterval(() => {
        swiperRef.current?.slideNext();
        clearInterval(timer);
      }, 200);
    }
  };

  const handleArrowClick = (direction: "prev" | "next") => {
    setIsAutoSliding(false);
    if (direction === "prev") swiperRef.current?.slidePrev();
    else swiperRef.current?.slideNext();
  };

  return (
    <div className="overflow-hidden my-4 h-[250px] md:h-[400px] relative px-4 md:px-6 lg:px-8">
      <div className="websiteHeading mb-4">
        <h2 className="uppercase text-gray-200 text-xl inline-block relative">
          <a href="#" className="flex font-bold items-center gap-1.5 ml-2">
            Website
          </a>
        </h2>
      </div>
      <div className="w-full group relative">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={15}
          slidesPerView="auto"
          breakpoints={{
            320: {
              slidesPerView: 1.2,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 1.5,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 2.5,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 2.8,
              spaceBetween: 20,
            },
          }}
          loop
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setActiveIndex(swiper.realIndex);
          }}
          onSlideChange={onSlideChange}
          className="mySwiper"
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          autoplay={false}
        >
          {websites.map((website, index) => (
            <SwiperSlide key={index} className="!h-auto">
              <WebsiteCard
                index={index}
                website={website}
                scrollActive={index === activeIndex}
                onScrollComplete={handleScrollComplete}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Arrows - Hidden on mobile, visible on tablet and up */}
        <div className=" sm:block">
          <ArrowLeft onClick={() => handleArrowClick("prev")} />
          <ArrowRight onClick={() => handleArrowClick("next")} />
        </div>
      </div>
    </div>
  );
};

export default WebsiteSection;
