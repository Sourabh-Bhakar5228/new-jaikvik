import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Navigation, Autoplay } from "swiper/modules";
import ArrowLeft from "../../components/arrows/ArrowLeft";
import ArrowRight from "../../components/arrows/ArrowRight";
import posts from "../../configs/all-posts";

const SocialMediaPostSection = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleVideoHover = (value: boolean) => {
    setIsHovered(value);
    if (swiperRef.current) {
      if (value) {
        swiperRef.current.autoplay.stop();
      } else {
        // Add a small delay to prevent immediate restart glitch
        setTimeout(() => {
          if (swiperRef.current && !isHovered) {
            swiperRef.current.autoplay.start();
          }
        }, 100);
      }
    }
  };

  return (
    <div className="relative">
      <div className="mb-2">
        <h2 className="text-gray-200 text-xl font-bold uppercase">
          <a href="/" className="flex items-center gap-1.5">
            Social Media Posts
          </a>
        </h2>
      </div>

      <div className="relative group">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={10}
          slidesPerView={4.5}
          breakpoints={{
            // when window width is >= 320px
            320: {
              slidesPerView: 1.2,
              spaceBetween: 8,
            },
            // when window width is >= 480px
            480: {
              slidesPerView: 1.5,
              spaceBetween: 8,
            },
            // when window width is >= 640px
            640: {
              slidesPerView: 2,
              spaceBetween: 8,
            },
            // when window width is >= 768px
            768: {
              slidesPerView: 2.5,
              spaceBetween: 10,
            },
            // when window width is >= 1024px
            1024: {
              slidesPerView: 3.5,
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
            delay: 1000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            waitForTransition: true,
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          className="!overflow-visible"
          speed={500}
        >
          {posts.map((item, index) => (
            <SwiperSlide
              key={index}
              className="hover:z-50 transition-all duration-200"
            >
              <div
                className="hover:scale-[1.15] transition-all duration-300 hover:z-50 hover:shadow-xl rounded-lg overflow-hidden"
                onMouseEnter={() => handleVideoHover(true)}
                onMouseLeave={() => handleVideoHover(false)}
              >
                <img
                  src={item}
                  alt="Social media post"
                  className="w-full h-full object-cover hover:brightness-110 transition-all duration-300"
                  // loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <ArrowLeft
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => swiperRef.current?.slidePrev()}
        />
        <ArrowRight
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => swiperRef.current?.slideNext()}
        />
      </div>
    </div>
  );
};

export default SocialMediaPostSection;
