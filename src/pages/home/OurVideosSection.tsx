import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Navigation, Autoplay } from "swiper/modules";
import ArrowLeft from "../../components/arrows/ArrowLeft";
import ArrowRight from "../../components/arrows/ArrowRight";
import ReelVideoCard from "../../components/cards/ReelVideoCard";
import videos from "../../configs/all-videos";

const OurVideosSection = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  const handleVideoHover = (value: boolean) => {
    if (swiperRef.current) {
      if (value) {
        swiperRef.current.autoplay.stop(); // Pause autoplay on hover
      } else {
        swiperRef.current.autoplay.start(); // Resume autoplay when mouse leaves
      }
    }
  };

  return (
    <div className="overflow-hidden h-auto my-4 ">
      <div className="websiteHeading mb-4">
        <h2 className="uppercase text-gray-200 text-xl inline-block relative">
          <a href="#" className="flex font-bold items-center gap-1.5 ml-2">
            Our Videos
          </a>
        </h2>
      </div>
      <div className="w-full group relative">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={10}
          slidesPerView={4.5}
          breakpoints={{
            // Mobile first approach
            320: {
              // Small smartphones
              slidesPerView: 1.2,
              spaceBetween: 8,
            },
            480: {
              // Larger smartphones
              slidesPerView: 1.3,
              spaceBetween: 8,
            },
            640: {
              // Small tablets
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              // Tablets
              slidesPerView: 2.5,
              spaceBetween: 10,
            },
            1024: {
              // Small laptops
              slidesPerView: 3.5,
              spaceBetween: 10,
            },
            1280: {
              // Desktop
              slidesPerView: 4.5,
              spaceBetween: 10,
            },
            1536: {
              // Large screens
              slidesPerView: 5,
              spaceBetween: 12,
            },
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          loop
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true, // Added pause on hover
            waitForTransition: true, // Smoother autoplay transitions
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          speed={600} // Slightly faster transitions
          className="mySwiper !overflow-visible"
        >
          {videos.map((item, index) => (
            <SwiperSlide
              key={index}
              className="!overflow-visible hover:z-10 transition-transform duration-200"
            >
              <ReelVideoCard
                src={item.src}
                poster={item.poster}
                onHover={handleVideoHover}
                aspectRatio="16/9"
                scale="hover:scale-[1.15]" // Reduced from 125 for better UX
                classname="transition-all duration-300 ease-in-out" // Changed className to classname
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

export default OurVideosSection;
