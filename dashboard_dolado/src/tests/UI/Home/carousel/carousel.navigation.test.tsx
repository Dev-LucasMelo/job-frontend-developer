
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HomeService from '@/services/Home';

jest.mock('@/components/home/card', () => {
    return ({ content }: any) => <div>{content}</div>;
});

jest.mock('swiper/react', () => {
    return {
        Swiper: ({ children, autoplay }: any) => {
            const slides = React.Children.toArray(children);
            const [currentIndex, setCurrentIndex] = React.useState(0);

            const next = () => setCurrentIndex(i => (i + 1) % slides.length);
            const prev = () => setCurrentIndex(i => (i - 1 + slides.length) % slides.length);

            return (
                <div data-testid="mock-swiper">
                    {slides[currentIndex]}
                    <button data-testid="btn-prev" onClick={prev}>Prev</button>
                    <button data-testid="btn-next" onClick={next}>Next</button>
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

describe('Carousel navigation', () => {
    const mockSlides = [
        {
            id: 1,
            content: `Com base em dados de mercado, identificamos oportunidades, 
                selecionamos produtos estratégicos e definimos canais ideais para 
                posicionar sua marca com eficiência e garantir resultados nos marketplaces.`,
            image: "/images/radar-oportunidades.png",
        },
        {
            id: 2,
            content: `Com 99% de precisão, velocidade incomparável e preços competitivos, 
                cuidamos de montagem de kits, separação de pacotes e logística, 
                permitindo que você foque no crescimento do seu negócio.`,
            image: "/images/logistica.png",
        },
        {
            id: 3,
            content: `Em mais de 15 marketplaces, oferecemos um ecossistema completo para 
                expandir sua presença digital. Identificamos os melhores produtos, 
                cuidamos da operação, performance, estoque e logística.`,
            image: "/images/gestao-completa.png",
        },
    ];

    beforeEach(() => {
        (HomeService as jest.Mock).mockImplementation(() => ({
            getCarouselData: jest.fn().mockResolvedValue(mockSlides),
        }));
    });

    it('should navigate slides manually using Prev and Next buttons', async () => {
        const { default: Carousel } = await import('@/components/home/carousel');
        render(<Carousel />);

        await waitFor(() => {
            expect(screen.getByText((content) =>
                content.includes(mockSlides[0].content.substring(0, 20).trim())
            )).toBeInTheDocument();
        });

        const btnNext = screen.getByTestId('btn-next');
        const btnPrev = screen.getByTestId('btn-prev');

        fireEvent.click(btnNext);
        expect(screen.getByText((content) =>
            content.includes(mockSlides[1].content.substring(0, 20).trim())
        )).toBeInTheDocument();

        fireEvent.click(btnNext);
        expect(screen.getByText((content) =>
            content.includes(mockSlides[2].content.substring(0, 20).trim())
        )).toBeInTheDocument();

        fireEvent.click(btnPrev);
        expect(screen.getByText((content) =>
            content.includes(mockSlides[1].content.substring(0, 20).trim())
        )).toBeInTheDocument();
    });
});