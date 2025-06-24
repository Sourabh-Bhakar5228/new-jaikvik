import React from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import BlogCard from '../../components/cards/BlogCard';
import allBlogs from '../../configs/all-blogs';
import 'swiper/swiper-bundle.css';

const Arrows: React.FC<{ direction?: 'left' | 'right'; className?: string }> = ({ direction = 'left', className }) => {
  const swiper = useSwiper();
  return (
    <div
      className={`border-2 border-solid border-red-500 text-red-500 rounded-full w-6 h-6 group text-lg cursor-pointer flex justify-center items-center ${className}`}
      onClick={() => (direction === 'left' ? swiper.slidePrev() : swiper.slideNext())}
    >
      {
        direction === 'left' ?
          <MdKeyboardArrowLeft className='group-hover:-translate-x-0.5 transition-all duration-300' />
          : <MdKeyboardArrowRight className='group-hover:translate-x-0.5 transition-all duration-300' />
      }
    </div>
  );
};

const BlogsSection = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] px-4 gap-6 w-full max-w-full overflow-hidden">
      <div className="w-full h-full flex flex-col gap-2 justify-start items-start overflow-hidden">
        <div className="flex justify-between items-center w-full">
          <h2 className="uppercase text-gray-200 text-xl inline-block relative">
            <a href="#" className="flex font-bold items-center gap-1.5">
              Our Latest News
            </a>
          </h2>
          <div className="flex justify-center items-center gap-x-2">
            <Arrows direction="left" className="swiper-button-prev-left" />
            <Arrows direction="right" className="swiper-button-next-left" />
          </div>
        </div>
        <div className="w-full max-w-full overflow-hidden">
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={2}
            loop
            navigation={{
              nextEl: '.swiper-button-next-left',
              prevEl: '.swiper-button-prev-left',
            }}
            className="w-full"
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 15 },
              768: { slidesPerView: 2, spaceBetween: 20 },
            }}
          >
            {allBlogs.slice(0, 3).map((blog, index) => (
              <SwiperSlide key={index} className="!h-auto">
                <BlogCard {...blog} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="w-full h-full flex flex-col justify-start gap-2 items-start overflow-hidden">
        <div className="flex justify-between items-center w-full">
          <h2 className="uppercase text-gray-200 text-xl inline-block relative">
            <a href="#" className="flex font-bold items-center gap-1.5">
              Latest Updates
            </a>
          </h2>
          <div className="flex justify-center items-center gap-x-2">
            <Arrows direction="left" className="swiper-button-prev-right" />
            <Arrows direction="right" className="swiper-button-next-right" />
          </div>
        </div>
        <div className="w-full max-w-full overflow-hidden">
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            loop
            navigation={{
              nextEl: '.swiper-button-next-right',
              prevEl: '.swiper-button-prev-right',
            }}
            className="w-full"
          >
            {allBlogs.slice(3, 5).map((blog, index) => (
              <SwiperSlide key={index} className="!h-auto">
                <BlogCard {...blog} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;