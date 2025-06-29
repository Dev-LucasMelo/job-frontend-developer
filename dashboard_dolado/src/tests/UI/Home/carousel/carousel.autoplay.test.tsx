import React from 'react';
import { render, screen, act } from '@testing-library/react';
import HomeService from '@/services/Home';

jest.mock('@/components/home/card', () => {
    return ({ content }: any) => <div>{content}</div>;
});

jest.mock('swiper/react', () => {
    const React = require('react');
    return {
        Swiper: ({ children, autoplay }: any) => {
            const slides = React.Children.toArray(children);
            const [currentIndex, setCurrentIndex] = React.useState(0);

            React.useEffect(() => {
                if (!autoplay) return;
                const timer = setInterval(() => {
                    setCurrentIndex((i: any) => (i + 1) % slides.length);
                }, 3000);
                return () => clearInterval(timer);
            }, [autoplay, slides.length]);

            return (
                <div data-testid="mock-swiper">
                    {slides[currentIndex]}
                    {autoplay && <div data-testid="autoplay-enabled" />}
                </div>
            );
        },
        SwiperSlide: ({ children }: any) => <div data-testid="mock-slide">{children}</div>,
    };
});

jest.mock('swiper/modules', () => ({
    Autoplay: {},
    Navigation: {},
    Pagination: {},
}));

jest.mock('swiper/css', () => ({}));
jest.mock('swiper/css/navigation', () => ({}));
jest.mock('swiper/css/pagination', () => ({}));

jest.mock('@/services/Home');

describe('Carousel autoplay', () => {
    const mockSlides = [
        {
            id: 1,
            content: 'Slide 1 content with some text here.',
            image: "/images/slide1.png",
        },
        {
            id: 2,
            content: 'Slide 2 content with some different text.',
            image: "/images/slide2.png",
        },
        {
            id: 3,
            content: 'Slide 3 content with more text for testing.',
            image: "/images/slide3.png",
        },
    ];

    beforeEach(() => {
        (HomeService as jest.Mock).mockImplementation(() => ({
            getCarouselData: jest.fn().mockResolvedValue(mockSlides),
        }));
    });

    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('automatically changes slides when autoplay is enabled', async () => {
        const { default: Carousel } = await import('@/components/home/carousel');
        render(<Carousel />);

        expect(await screen.findByTestId('autoplay-enabled')).toBeInTheDocument();

        expect(await screen.findByText(content =>
            content.includes(mockSlides[0].content.substring(0, 20).trim())
        )).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(3000);
        });

        expect(await screen.findByText(content =>
            content.includes(mockSlides[1].content.substring(0, 20).trim())
        )).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(3000);
        });

        expect(await screen.findByText(content =>
            content.includes(mockSlides[2].content.substring(0, 20).trim())
        )).toBeInTheDocument();
    });
});