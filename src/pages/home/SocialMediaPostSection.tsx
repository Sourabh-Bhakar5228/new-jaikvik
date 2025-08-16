import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Navigation, Autoplay } from "swiper/modules";
import ArrowLeft from "../../components/arrows/ArrowLeft";
import ArrowRight from "../../components/arrows/ArrowRight";
import posts from "../../configs/all-posts";
import { X, ArrowLeft as BackArrow } from "lucide-react"; // icons

const SocialMediaPostSection = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleVideoHover = (value: boolean) => {
    setIsHovered(value);
    if (swiperRef.current) {
      if (value) {
        swiperRef.current.autoplay.stop();
      } else {
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
            320: { slidesPerView: 1.2, spaceBetween: 8 },
            480: { slidesPerView: 1.5, spaceBetween: 8 },
            640: { slidesPerView: 2, spaceBetween: 8 },
            768: { slidesPerView: 2.5, spaceBetween: 10 },
            1024: { slidesPerView: 3.5, spaceBetween: 10 },
            1280: { slidesPerView: 4.5, spaceBetween: 10 },
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
                onClick={() => {
                  // ✅ open fullscreen only on mobile
                  if (window.innerWidth < 768) setSelectedImage(item);
                }}
              >
                <img
                  src={item}
                  alt="Social media post"
                  className="w-full h-full object-cover hover:brightness-110 transition-all duration-300"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <ArrowLeft
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block"
          onClick={() => swiperRef.current?.slidePrev()}
        />
        <ArrowRight
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block"
          onClick={() => swiperRef.current?.slideNext()}
        />
      </div>

      {/* ✅ Fullscreen overlay for mobile */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[9999] md:hidden">
          {/* Back to Home */}
          <button
            className="absolute top-4 left-4 text-white text-2xl"
            onClick={() => (window.location.href = "/")}
          >
            <BackArrow size={28} />
          </button>

          {/* Close */}
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={() => setSelectedImage(null)}
          >
            <X size={28} />
          </button>

          {/* Enlarged Image */}
          <img
            src={selectedImage}
            alt="Expanded Post"
            className="max-h-[90%] max-w-[90%] object-contain rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default SocialMediaPostSection;
