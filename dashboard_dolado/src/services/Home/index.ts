import { CardProps } from "@/types/home/cardType";
import radarOportunidadesIcon from "@/assets/images/Home/radar-oportunidades.png"
import logisticaIcon from "@/assets/images/Home/logistica.png"
import gestaoCompletaIcon from "@/assets/images/Home/gestao-completa.png"
import analiseCustosIcon from "@/assets/images/Home/analise-custos.png"

export default class HomeService {
    async getCarouselData(): Promise<CardProps[]> {
        return [

            {
                id: 1,
                content: `Com base em dados de mercado, identificamos oportunidades, 
                selecionamos produtos estratégicos e definimos canais ideais para 
                posicionar sua marca com eficiência e garantir resultados nos marketplaces.`,
                image: radarOportunidadesIcon
            },
            {
                id: 2,
                content: `Com 99% de precisão, velocidade incomparável e preços competitivos, 
                cuidamos de montagem de kits, separação de pacotes e logística, 
                permitindo que você foque no crescimento do seu negócio.`,
                image: logisticaIcon
            },
            {
                id: 3,
                content: `Em mais de 15 marketplaces, oferecemos um ecossistema completo para 
                expandir sua presença digital. Identificamos os melhores produtos, 
                cuidamos da operação, performance, estoque e logística.`,
                image: gestaoCompletaIcon
            },
            {
                id: 4,
                content: `Fornecemos uma análise detalhada de custos, concorrência, demanda e 
                requisitos operacionais para vender na Amazon dos EUA, além de um diagnóstico 
                preciso e plano estratégico de decisão segura.`,
                image: analiseCustosIcon
            }
        ]
    }
}