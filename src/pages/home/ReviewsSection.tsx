import React from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { FaStar } from 'react-icons/fa';
import 'swiper/swiper-bundle.css';
import reviews from '../../configs/all-reviews';
import { useDispatch } from 'react-redux';
import { setAction } from '../../redux/reducers/action';

const Arrows: React.FC<{ direction?: 'left' | 'right'; className?: string }> = ({ direction = 'left', className }) => {
    const swiper = useSwiper();
    return (
        <div
            className={`border-2 border-solid border-red-500 text-red-500 rounded-full w-7 h-7 text-lg cursor-pointer flex justify-center items-center ${className}`}
            onClick={() => (direction === 'left' ? swiper.slidePrev() : swiper.slideNext())}
        >
            {direction === 'left' ? <MdKeyboardArrowLeft /> : <MdKeyboardArrowRight />}
        </div>
    );
};

const ReviewsSection = () => {
    const dispatch = useDispatch();
    const setIsOpen = () => dispatch(setAction({ isReviewModal: true }));

    return <>
        <section className="px-6 my-4 w-full max-w-full overflow-hidden">
            <div className="flex justify-between items-center mb-5">
                <h2 className="uppercase text-white text-[22px] font-medium">What Our Clients Say About Us</h2>
                <button className="bg-red-500 text-white border-none outline-none px-4 py-1.5 rounded-md transition-transform duration-300 hover:scale-90 cursor-pointer" onClick={() => setIsOpen()}>
                    Add Review
                </button>
            </div>
            <div className="w-full relative group max-w-full">
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={3.5}
                    autoplay
                    navigation={{
                        nextEl: '.swiper-button-next-review',
                        prevEl: '.swiper-button-prev-review',
                    }}
                    className="w-full max-w-full overflow-hidden"
                    breakpoints={{
                        320: { slidesPerView: 1, spaceBetween: 15 },
                        768: { slidesPerView: 2, spaceBetween: 20 },
                        1024: { slidesPerView: 3.5, spaceBetween: 20 },
                    }}
                    style={{ width: '100%', overflow: 'hidden' }}
                >
                    {reviews.map((review, index) => (
                        <SwiperSlide key={index} className="flex-shrink-0 w-full max-w-full">
                            <div className="w-full">
                                <div className="bg-main-secondary/80 h-[280px] p-5 rounded-md">
                                    <img
                                        src="https://jaikvik.in/lab/new-post-video/img/quote.png"
                                        alt="Quote"
                                        className="w-[30px] mb-2"
                                    />
                                    <p className="text-white text-sm line-clamp-6">{review.text}</p>
                                    <div className="flex gap-1 my-2">
                                        {Array(review.stars)
                                            .fill(0)
                                            .map((_, i) => (
                                                <FaStar key={i} className="text-yellow-400 text-xs" />
                                            ))}
                                    </div>
                                    <h3 className="text-white text-lg font-normal tracking-wide">{review.author}</h3>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                    <div className="flex absolute top-[40%] group-hover:opacity-100 opacity-0 w-full justify-between z-40 items-center gap-x-2 mt-4">
                        <Arrows direction="left" className="swiper-button-prev-review" />
                        <Arrows direction="right" className="swiper-button-next-review" />
                    </div>
                </Swiper>
            </div>
        </section>
    </>
};

export default ReviewsSection;