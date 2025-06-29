'use client';

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Card from "@/components/home/card";
import HomeService from "@/services/Home";
import { useState, useEffect } from "react";
import { CardProps } from "@/types/home/cardType";

const Carousel = () => {
    const [slides, setSlides] = useState<CardProps[]>([])

    useEffect(() => {

        async function getData() {
            const Service = new HomeService()
            await Service.getCarouselData().then((response) => {
                setSlides(response)
            })
        }

        getData()
    }, [])


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
                    <SwiperSlide key={slide.id}>
                        <Card
                            content={slide.content}
                            image={slide.image}
                        />
                    </SwiperSlide>
                ))}

            </Swiper>
        </div>
    );
}

export default Carousel;