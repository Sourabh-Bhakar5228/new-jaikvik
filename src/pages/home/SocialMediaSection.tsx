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
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

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

  const handleVideoClick = (src: string) => {
    if (window.innerWidth <= 768) {
      setSelectedVideo(src); // fullscreen only on mobile
    }
  };

  return (
    <div className="overflow-hidden h-auto my-4">
      {/* Heading */}
      <div className="websiteHeading mb-4">
        <h2 className="uppercase text-gray-200 text-xl inline-block relative">
          <a href="#" className="flex font-bold items-center gap-1.5 ml-2">
            Social Media Reels
          </a>
        </h2>
      </div>

      {/* Swiper Section */}
      <div className="w-full group relative">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={10}
          slidesPerView={4.5}
          breakpoints={{
            320: { slidesPerView: 1.2, spaceBetween: 10 },
            480: { slidesPerView: 1.5, spaceBetween: 10 },
            640: { slidesPerView: 2.5, spaceBetween: 10 },
            768: { slidesPerView: 3, spaceBetween: 10 },
            1024: { slidesPerView: 4, spaceBetween: 10 },
            1280: { slidesPerView: 4.5, spaceBetween: 10 },
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
            <SwiperSlide
              key={index}
              onClick={() => handleVideoClick(reel.video)}
            >
              <ReelVideoCard
                src={reel.video}
                poster={reel.poster}
                onHover={handleVideoHover}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation arrows */}
        <ArrowLeft onClick={() => swiperRef.current?.slidePrev()} />
        <ArrowRight onClick={() => swiperRef.current?.slideNext()} />
      </div>

      {/* Fullscreen Video Modal (only for mobile) */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center">
          {/* Back Arrow (←) */}
          <button
            className="absolute top-4 left-4 bg-black/60 p-2 rounded-full text-white text-2xl"
            onClick={() => (window.location.href = "/")} // go home
          >
            ←
          </button>

          {/* Close (×) */}
          <button
            className="absolute top-4 right-4 bg-black/60 p-2 rounded-full text-white text-2xl z-[9999]"
            onClick={() => setSelectedVideo(null)}
          >
            ×
          </button>

          {/* Video player */}
          <video
            src={selectedVideo}
            controls
            autoPlay
            className="max-w-full max-h-full rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default SocialMediaSection;
