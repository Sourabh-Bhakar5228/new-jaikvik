import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Navigation, Autoplay } from "swiper/modules";
import { X, ArrowLeft as BackIcon } from "lucide-react"; // icons
import ArrowLeft from "../../components/arrows/ArrowLeft";
import ArrowRight from "../../components/arrows/ArrowRight";
import ReelVideoCard from "../../components/cards/ReelVideoCard";
import teamVideos from "../../configs/team-videos";

const TeamVideoSlider = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<{
    video: string;
    poster: string;
  } | null>(null);

  const handleVideoHover = (value: boolean) => {
    if (swiperRef.current) {
      if (value) {
        swiperRef.current.autoplay.stop();
      } else {
        swiperRef.current.autoplay.start();
      }
    }
  };

  return (
    <div className="overflow-hidden h-auto my-4">
      <div className="websiteHeading mb-4">
        <h2 className="uppercase text-gray-200 text-xl inline-block relative">
          <a href="#" className="flex font-bold items-center gap-1.5 ml-2">
            Meet Our Team
          </a>
        </h2>
      </div>

      {/* Swiper */}
      <div className="w-full group relative">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={10}
          slidesPerView={4.5}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          loop
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="mySwiper !overflow-visible"
          breakpoints={{
            320: { slidesPerView: 1.2 },
            640: { slidesPerView: 2.5 },
            1024: { slidesPerView: 3.5 },
            1280: { slidesPerView: 4.5 },
          }}
        >
          {teamVideos.map((item, index) => (
            <SwiperSlide key={index} className="hover:z-50">
              <div
                className="cursor-pointer"
                onClick={() => {
                  if (window.innerWidth <= 768) {
                    setSelectedVideo(item);
                  }
                }}
              >
                <ReelVideoCard
                  src={item.video}
                  onHover={handleVideoHover}
                  aspectRatio="16/9"
                  scale="hover:scale-125"
                  poster={item.poster}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <ArrowLeft onClick={() => swiperRef.current?.slidePrev()} />
        <ArrowRight onClick={() => swiperRef.current?.slideNext()} />
      </div>

      {/* Fullscreen Overlay for Mobile */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[9999] bg-black bg-opacity-95 flex items-center justify-center">
          {/* Back Icon */}
          <button
            className="absolute top-4 left-4 text-white p-2 rounded-full bg-black/40"
            onClick={() => setSelectedVideo(null)}
          >
            <BackIcon size={24} />
          </button>

          {/* Close Icon */}
          <button
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/40"
            onClick={() => setSelectedVideo(null)}
          >
            <X size={26} />
          </button>

          {/* Video */}
          <video
            src={selectedVideo.video}
            poster={selectedVideo.poster}
            controls
            autoPlay
            className="max-w-full max-h-[90vh] rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default TeamVideoSlider;
