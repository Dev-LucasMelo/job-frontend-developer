jest.mock('swiper/css', () => ({}));
jest.mock('swiper/css/navigation', () => ({}));
jest.mock('swiper/css/pagination', () => ({}));

jest.mock('swiper/react', () => {
    return {
        Swiper: ({ children }: any) => <div data-testid="mock-swiper">{children}</div>,
        SwiperSlide: ({ children }: any) => <div data-testid="mock-slide">{children}</div>,
    };
});

jest.mock('swiper/modules', () => ({
    Autoplay: {},
    Navigation: {},
    Pagination: {},
}));

jest.mock('@/services/Home');

import { render, screen, waitFor } from '@testing-library/react';
import Carousel from '@/components/home/carousel';
import HomeService from '@/services/Home';

describe('Carousel render', () => {
    let mock = [
        {
            id: 1,
            content: `Com base em dados de mercado, identificamos oportunidades, 
                selecionamos produtos estratégicos e definimos canais ideais para 
                posicionar sua marca com eficiência e garantir resultados nos marketplaces.`,
            image: "/dashboard_dolado/src/assets/images/Home/radar-oportunidades.png"
        },
        {
            id: 2,
            content: `Com 99% de precisão, velocidade incomparável e preços competitivos, 
                cuidamos de montagem de kits, separação de pacotes e logística, 
                permitindo que você foque no crescimento do seu negócio.`,
            image: "/dashboard_dolado/src/assets/images/Home/logistica.png"
        },
        {
            id: 3,
            content: `Em mais de 15 marketplaces, oferecemos um ecossistema completo para 
                expandir sua presença digital. Identificamos os melhores produtos, 
                cuidamos da operação, performance, estoque e logística.`,
            image: "/dashboard_dolado/src/assets/images/Home/gestao-completa.png"
        },
        {
            id: 4,
            content: `Fornecemos uma análise detalhada de custos, concorrência, demanda e 
                requisitos operacionais para vender na Amazon dos EUA, além de um diagnóstico 
                preciso e plano estratégico de decisão segura.`,
            image: "/dashboard_dolado/src/assets/images/Home/analise-custos.png"
        }
    ]

    beforeEach(() => {
        (HomeService as jest.Mock).mockImplementation(() => ({
            getCarouselData: jest.fn().mockResolvedValue(mock),
        }));
    });

    it('correctly renders service slides', async () => {
        render(<Carousel />);

        await waitFor(() => {
            expect(screen.getAllByTestId('mock-slide').length).toBe(4);
        });

        mock.forEach((slide) => {
            const partialText = slide.content.substring(0, 20).trim();
            expect(screen.getByText(new RegExp(partialText))).toBeInTheDocument();
        });

    })


})