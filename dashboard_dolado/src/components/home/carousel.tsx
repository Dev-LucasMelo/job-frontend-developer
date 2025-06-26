'use client';

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Card from "@/components/home/card";

const Carrousel = () => {

    const slides = ["1", "2", "3", "4", "5", "6"];

    return (
        <div className="w-full mx-auto mt-6">
            <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                loop={true}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }}
                navigation
                pagination={{ clickable: true }}
                slidesPerView={1}
                spaceBetween={16}
                breakpoints={{
                    320: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
            >

                {slides.map((slide) => (
                    <SwiperSlide key={slide}>
                        <Card
                            content={slide}
                        />
                    </SwiperSlide>
                ))}

            </Swiper>
        </div>
    );
}

export default Carrousel;