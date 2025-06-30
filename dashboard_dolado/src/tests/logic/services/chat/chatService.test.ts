import { configureStore } from '@reduxjs/toolkit'
import chatbotReducer, { addMessage, initialState as chatbotInitialState } from '@/store/chat/chatBotSlice'
import chatBotService from '@/services/chat/index'
import { Ichatbot } from '@/types/chat/chatTypes'
import { MessageProps } from '@/types/chat/chatTypes'

const setupStore = (preloadedState?: { chat?: Partial<Ichatbot> }) => {
    return configureStore({
        reducer: {
            chat: chatbotReducer
        },
        preloadedState: {
            chat: {
                ...chatbotInitialState,
                ...preloadedState
            }
        }
    })
}
type AppStore = ReturnType<typeof setupStore>

describe('chatBotService', () => {
    let store: AppStore

    beforeEach(() => {
        store = setupStore()
    })

    afterEach(() => {
        jest.restoreAllMocks()
    })

    it('sendMessageByInput — add client message and set waitingReply to false', async () => {
        let service = new chatBotService(store.dispatch);

        await service.sendMessageByInput("Olá, tudo bem?")

        const state = store.getState().chat

        expect(state.messages).toHaveLength(2)
        expect(state.messages[1].content).toBe("Olá, tudo bem?")
        expect(state.messages[1].author).toBe("client")
        expect(state.messages[1].status).toBe("sent")
        expect(state.waitingReply).toBe(false)
    })

    it('sendMessageBySuggestion — sends message, ends previous and returns botParams', async () => {

        let service = new chatBotService(store.dispatch);

        const initialState = store.getState().chat
        const previousMessageId = initialState.messages[0].id

        const result = await service.sendMessageBySuggestion('mensagem de inicio', {
            currentStep: "welcome",
            messages: initialState.messages,
            stepHistory: initialState.stepHistory,
            waitingReply: initialState.waitingReply
        })

        const state = store.getState().chat

        expect(state.messages).toHaveLength(2)
        expect(state.messages[1]).toEqual(expect.objectContaining({
            content: "mensagem de inicio",
            author: "client",
            status: "sent"
        }))

        const previousMessage = state.messages.find(msg => msg.id === previousMessageId)
        expect(previousMessage?.status).toBe("finished")

        expect(result).toEqual({
            currentStep: "welcome",
            lastMessage: expect.objectContaining({
                content: "mensagem de inicio",
                author: "client",

            })
        })
    })

    it('processResponse(welcome) — responds welcome and advances to qualification', async () => {
        jest.spyOn(Date, 'now').mockReturnValue(2000);
        let service = new chatBotService(store.dispatch);

        const userMessage: MessageProps = {
            id: Date.now(),
            author: "client",
            content: "Claro, vamos lá!",
            status: "sent"
        }

        store = setupStore({
            chat: {
                messages: [
                    {
                        id: 1,
                        author: "server",
                        content: "Mensagem inicial",
                        status: "sent"
                    },
                    userMessage
                ],
                currentStep: "welcome",
                stepHistory: [],
                waitingReply: true
            }
        })

        service = new chatBotService(store.dispatch)

        await service.processResponse({
            currentStep: "welcome",
            lastMessage: userMessage
        })

        const state = store.getState().chat

        expect(state.messages).toHaveLength(2)

        const lastMessage = state.messages[state.messages.length - 1]
        expect(lastMessage.author).toBe("server")
        expect(lastMessage.content).toContain("Perfeito!")

        expect(state.currentStep).toBe("qualification")
        expect(state.stepHistory).toContain("welcome")

        const userMsg = state.messages.find(m => m.id === userMessage.id)

        expect(userMsg).toBeDefined()
        expect(userMsg?.status).toBe("finished")
    })

    it('processResponse(qualification) — respond to followUp and move to marketplace', async () => {

        jest.spyOn(Date, 'now').mockReturnValue(2000);

        let service = new chatBotService(store.dispatch);

        const userMessage1: MessageProps = {
            id: Date.now(),
            author: "client",
            content: "Somos indústria/fabricantes",
            status: "sent"
        }

        const userMessage2: MessageProps = {
            id: Date.now(),
            author: "client",
            content: "Média empresa (R$ 10-50mi/ano)",
            status: "sent"
        }

        store = setupStore({
            chat: {
                messages: [
                    {
                        id: 1,
                        author: "server",
                        content: "Perfeito! Deixa eu te conhecer melhor. Conta aí, que tipo de operação vocês têm?",
                        status: "sent",
                        options: [
                            "Somos indústria/fabricantes",
                            "Distribuidores atacadistas",
                            "Operação mista (fabricamos e distribuímos)",
                            "Grupo empresarial"
                        ]
                    },
                    userMessage1
                ],
                currentStep: "qualification",
                stepHistory: ["welcome"],
                waitingReply: true
            }
        })

        service = new chatBotService(store.dispatch)


        store.dispatch(addMessage(userMessage2))

        await service.processResponse({
            currentStep: "qualification",
            lastMessage: userMessage1
        })

        let state = store.getState().chat

        const followUp = state.messages.at(-1)
        expect(followUp?.author).toBe("server")
        expect(followUp?.content).toContain("Que legal!")

        const updatedMessage = state.messages.find(m => m.id === userMessage1.id)

        expect(updatedMessage).toBeDefined()
        expect(updatedMessage?.status).toBe("finished")

        await service.processResponse({
            currentStep: "qualification",
            lastMessage: userMessage2
        })

        state = store.getState().chat

        const nextStepMsg = state.messages.at(-1)
        expect(nextStepMsg?.author).toBe("server")
        expect(nextStepMsg?.content).toContain("Entendi perfeitamente")

        expect(state.currentStep).toBe("marketplace")
        expect(state.stepHistory).toContain("qualification")
        expect(state.messages.find(m => m.id === userMessage2.id)?.status).toBe("finished")
    })

    it('processResponse(diagnosis) — responds to followUp and moves on to result', async () => {
        jest.spyOn(Date, 'now').mockReturnValue(2000);

        const userMessage1: MessageProps = {
            id: Date.now(),
            author: "client",
            content: "ERP robusto (SAP, Oracle, etc)",
            status: "sent"
        }

        store = setupStore({
            chat: {
                messages: [
                    {
                        id: 1,
                        author: "server",
                        content: "Como vocês gerenciam a operação hoje?",
                        status: "sent",
                        options: [
                            "ERP robusto (SAP, Oracle, etc)",
                            "Sistema próprio bem estruturado",
                            "Mix de sistemas integrados",
                            "Operação ainda manual em partes"
                        ]
                    },
                    userMessage1
                ],
                currentStep: "diagnosis",
                stepHistory: ["welcome", "qualification", "marketplace", "products"],
                waitingReply: true
            }
        })

        let service = new chatBotService(store.dispatch)

        await service.processResponse({
            currentStep: "diagnosis",
            lastMessage: userMessage1
        })

        let state = store.getState().chat

        const followUp = state.messages.at(-1)
        expect(followUp?.author).toBe("server")
        expect(followUp?.content).toContain("marketing/branding digital")

        const updatedMessage = state.messages.find(m => m.id === userMessage1.id)

        expect(updatedMessage).toBeDefined()
        expect(updatedMessage?.status).toBe("finished")

        const userMessage2: MessageProps = {
            id: Date.now(),
            author: "client",
            content: "Marca consolidada offline, zero digital",
            status: "sent"
        }

        await service.processResponse({
            currentStep: "diagnosis",
            lastMessage: userMessage2
        })

        state = store.getState().chat

        const resultMessage = state.messages.at(-1)
        expect(resultMessage?.author).toBe("server")
        expect(resultMessage?.content).toContain("conversando com você fica claro uma coisa")
        expect(state.currentStep).toBe("result")
        expect(state.stepHistory).toContain("diagnosis")
        expect(state.messages.find(m => m.id === userMessage2.id)?.status).toBe("finished")
    })

})

