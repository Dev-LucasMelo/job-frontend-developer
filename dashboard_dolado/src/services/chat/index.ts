import { AppDispatch } from "@/store";
import { addMessage, changeState, alterCurrentStep, addStep, alterMessageStatus } from "@/store/chat/chatBotSlice";
import { botParams, Ichatbot, MessageProps } from "@/types/chat/chatTypes";
import { Instructions, indexedInstructionsType } from "@/types/chat/botTypes"

export default class chatBotService {
    private dispatch: AppDispatch
    private Instructions: Instructions[]

    constructor(dispatch: AppDispatch) {
        this.dispatch = dispatch;
        this.Instructions = [
            {
                "message": "Oi! Eu sou Sofia, consultora digital da Dolado. 😊 Sei que falar sobre vendas online pode parecer complicado, mas prometo que vamos tornar isso bem simples. Em 5 minutos, vou te mostrar exatamente como sua empresa pode crescer nos marketplaces. Pode ser?",
                "type": "welcome",
                "options": [
                    "Claro, vamos lá!",
                    "Primeiro quero entender melhor"
                ],
                "personality": "Consultiva, acolhedora, confiante mas não pressiona"
            },
            {
                "message": "Perfeito! Deixa eu te conhecer melhor. Conta aí, que tipo de operação vocês têm? Quero entender a complexidade do negócio para dar as orientações mais assertivas.",
                "type": "qualification",
                "options": [
                    "Somos indústria/fabricantes",
                    "Distribuidores atacadistas",
                    "Operação mista (fabricamos e distribuímos)",
                    "Grupo empresarial"
                ],
                "followUp": {
                    "message": "Que legal! E em termos de estrutura, vocês são uma operação de que porte?",
                    "options": [
                        "Média empresa (R$ 10-50mi/ano)",
                        "Grande empresa (R$ 50-200mi/ano)",
                        "Corporação (R$ 200mi+/ano)",
                        "Grupo/Holding"
                    ],
                    "tone": "Entende que está falando com tomadores de decisão sérios, com operações complexas"
                }
            },
            {
                "message": "Entendi perfeitamente o perfil! Agora, uma pergunta estratégica: como vocês enxergam os marketplaces? Sei que muitas indústrias têm receios sobre canibalizarização dos canais tradicionais.",
                "type": "marketplace",
                "options": [
                    "Vemos como oportunidade adicional",
                    "Temos receio de conflito com distribuidores",
                    "Ainda estamos avaliando",
                    "Concorrentes já estão lá, precisamos reagir"
                ],
                "followUp": {
                    "message": "Faz sentido! E se fossem testar, qual canal seria mais estratégico para o porte de vocês?",
                    "options": [
                        "Mercado Livre (maior alcance)",
                        "Amazon (perfil mais premium)",
                        "Shopee (crescimento rápido)",
                        "B2B marketplaces",
                        "Marketplace próprio"
                    ],
                    "insight": "Mostra que entende estratégias de canal para grandes empresas"
                }
            },
            {
                "message": "Perfeito! Agora vamos falar do portfólio. Com o volume que vocês devem ter, imagino que seja um catálogo robusto. Quantas SKUs vocês gerenciam?",
                "type": "products",
                "options": [
                    "Catálogo focado (até 500 SKUs)",
                    "Portfólio amplo (500-2000 SKUs)",
                    "Mega catálogo (2000+ SKUs)",
                    "Multiple categorias/divisões"
                ],
                "followUp": {
                    "message": "E me conta, qual segmento representa o core do negócio de vocês?",
                    "options": [
                        "Bens de consumo duráveis",
                        "Componentes/Insumos industriais",
                        "Produtos de marca própria",
                        "Linha completa multi-categoria",
                        "B2B especializado"
                    ],
                    "tone": "Reconhece a complexidade de grandes operações e múltiplas linhas"
                }
            },
            {
                "message": "Seus produtos têm potencial gigantesco online! Agora, para entender melhor a maturidade operacional: como vocês gerenciam a operação hoje? ERP, WMS, integração?",
                "type": "diagnosis",
                "options": [
                    "ERP robusto (SAP, Oracle, etc)",
                    "Sistema próprio bem estruturado",
                    "Mix de sistemas integrados",
                    "Operação ainda manual em partes"
                ],
                "followUp": {
                    "message": "E em termos de marketing/branding digital, como vocês se posicionam no mercado?",
                    "options": [
                        "Marca consolidada offline, zero digital",
                        "Presença básica (site institucional)",
                        "Marketing B2B estruturado",
                        "Estratégia digital em desenvolvimento",
                        "Focamos só no relacionamento direto"
                    ],
                    "tone": "Entende que grandes empresas têm operações complexas e decisões estruturadas"
                }
            },
            {
                "message": "conversando com você fica claro uma coisa: vocês estão numa posição PRIVILEGIADA. Têm produto consolidado, operação estruturada, marca respeitada - só falta usar isso no digital. Empresas do porte de vocês que entraram nos marketplaces cresceram 40-60% sem canibalizarizar os canais tradicionais.",
                "type": "result",
                "diagnosis": {
                    "stage": "Gigante Adormecido Digital",
                    "potential": "Potencial de R$ 10-30mi adicionais em 18 meses via marketplaces",
                    "specificInsights": "Indústrias com faturamento similar à de vocês criaram novos canais de receita representando 15-25% do faturamento total",
                    "recommendations": [
                        "Estratégia de canal complementar (não concorrente)",
                        "Pricing diferenciado para não conflitar com distribuidores",
                        "Teste controlado em marketplace premium primeiro",
                        "Estrutura dedicada para e-commerce (não impacta operação atual)"
                    ]
                },
                "nextSteps": {
                    "message": "Que tal uma conversa estratégica com nosso especialista em grandes contas? Ele já ajudou indústrias similares a criar canais digitais de R$ 20-50mi sem nenhum conflito. Posso agendar?",
                    "options": [
                        "Sim, quero conversa estratégica",
                        "Manda um case similar primeiro"
                    ],
                    "urgency": "Seus concorrentes já estão se movimentando - quem sair na frente vai dominar o digital no seu segmento"
                }
            }
        ]
    }

    async sendMessageByInput(mensagem: string) {
        this.dispatch(addMessage({
            id: Date.now(),
            author: "client",
            content: mensagem,
            status: "sent"
        }))

        this.dispatch(changeState(false))
    }

    async sendMessageBySuggestion(message: string, currentState: Ichatbot): Promise<botParams> {

        // montar objeto 
        const newMessage: MessageProps = {
            id: Date.now(),
            author: "client",
            content: message,
            status: "sent"
        }

        // atualizar estados pelo redux 
        this.dispatch(addMessage(newMessage))

        this.dispatch(alterMessageStatus({
            id: currentState.messages[currentState.messages.length - 1].id,
            status: "finished"
        }))

        // atualizar referencia atual do componente 

        let botData: botParams = {
            currentStep: currentState.currentStep,
            lastMessage: newMessage,
        }

        return botData
    }

    async processResponse(data: botParams) {

        const { currentStep, lastMessage } = data

        const indexedInstructions = this.Instructions.reduce((resultado, item) => {
            resultado[item.type] = item as any;
            return resultado;
        }, {} as indexedInstructionsType)

        const { diagnosis, marketplace, products, qualification, result } = indexedInstructions

        switch (currentStep) {
            case "welcome":

                if (lastMessage.content == "Claro, vamos lá!") {

                    this.dispatch(addMessage({
                        id: Date.now(),
                        author: 'server',
                        content: qualification.message,
                        status: "sent",
                        options: qualification.options
                    }))

                    this.dispatch(addStep("welcome"))
                    this.dispatch(alterCurrentStep("qualification"))
                }

                break;
            case "qualification":

                if (qualification.options.includes(lastMessage.content)) {

                    if (qualification.followUp) {
                        this.dispatch(addMessage({
                            id: Date.now(),
                            author: 'server',
                            content: qualification.followUp.message,
                            status: "sent",
                            options: qualification.followUp.options
                        }))
                    }

                }

                if (qualification.followUp.options.includes(lastMessage.content)) {

                    this.dispatch(addMessage({
                        id: Date.now(),
                        author: 'server',
                        content: marketplace.message,
                        status: "sent",
                        options: marketplace.options
                    }))

                    this.dispatch(addStep("qualification"))
                    this.dispatch(alterCurrentStep("marketplace"))
                }

                break;
            case "marketplace":

                if (marketplace.options.includes(lastMessage.content)) {

                    if (marketplace.followUp) {
                        this.dispatch(addMessage({
                            id: Date.now(),
                            author: 'server',
                            content: marketplace.followUp.message,
                            status: "sent",
                            options: marketplace.followUp.options
                        }))
                    }

                }

                if (marketplace.followUp.options.includes(lastMessage.content)) {

                    this.dispatch(addMessage({
                        id: Date.now(),
                        author: 'server',
                        content: products.message,
                        status: "sent",
                        options: products.options
                    }))

                    this.dispatch(addStep("marketplace"))
                    this.dispatch(alterCurrentStep("products"))
                }

                break;
            case "products":

                if (products.options.includes(lastMessage.content)) {

                    if (products.followUp) {
                        this.dispatch(addMessage({
                            id: Date.now(),
                            author: 'server',
                            content: products.followUp.message,
                            status: "sent",
                            options: products.followUp.options
                        }))
                    }

                }

                if (products.followUp.options.includes(lastMessage.content)) {

                    this.dispatch(addMessage({
                        id: Date.now(),
                        author: 'server',
                        content: diagnosis.message,
                        status: "sent",
                        options: diagnosis.options
                    }))

                    this.dispatch(addStep("products"))
                    this.dispatch(alterCurrentStep("diagnosis"))
                }

                break;
            case "diagnosis":

                if (diagnosis.options.includes(lastMessage.content)) {

                    if (diagnosis.followUp) {
                        this.dispatch(addMessage({
                            id: Date.now(),
                            author: 'server',
                            content: diagnosis.followUp.message,
                            status: "sent",
                            options: diagnosis.followUp.options
                        }))
                    }

                }

                if (diagnosis.followUp.options.includes(lastMessage.content)) {

                    if (result) {

                        this.dispatch(addMessage({
                            id: Date.now(),
                            author: 'server',
                            content: result.message,
                            status: "sent",
                            results: result
                        }))
                    }

                    this.dispatch(addStep("diagnosis"))
                    this.dispatch(alterCurrentStep("result"))
                }

                break;
            case "result":

                if (result.nextSteps.options.includes(lastMessage.content)) {
                    this.dispatch(changeState(true))
                }

                break;
        }

        this.dispatch(alterMessageStatus({
            id: lastMessage.id,
            status: "finished"
        }))
    }

}