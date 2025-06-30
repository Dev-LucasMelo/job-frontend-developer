import reducer, {
    addMessage,
    alterCurrentStep,
    changeState,
    addStep,
    alterMessageStatus
} from '@/store/chat/chatBotSlice'
import { Ichatbot } from '@/types/chat/chatTypes'
import { MessageProps } from '@/types/chat/chatTypes'

describe('chatbotSlice', () => {
    const initialState: Ichatbot = {
        messages: [],
        currentStep: 'welcome',
        stepHistory: [],
        waitingReply: false,
    }

    it('should add a new message to the messages array', () => {
        const newMessage: MessageProps = {
            id: 1,
            author: 'client',
            content: 'Oi, tudo bem?',
            status: 'sent',
        }

        const nextState = reducer(initialState, addMessage(newMessage))

        expect(nextState.messages).toHaveLength(1)
        expect(nextState.messages[0]).toEqual(newMessage)
    })

    it('must change the currentStep attribute', () => {
        const nextState = reducer(initialState, alterCurrentStep('diagnosis'))
        expect(nextState.currentStep).toBe('diagnosis')
    })

    it('must change the waitingReply attribute', () => {
        const nextState = reducer(initialState, changeState(true))
        expect(nextState.waitingReply).toBe(true)
    })

    it('must add a step to the stepHistory array', () => {
        const nextState = reducer(initialState, addStep('products'))
        expect(nextState.stepHistory).toContain('products')
    })

    it('should change the status of the message with the given id', () => {
        const startState: Ichatbot = {
            ...initialState,
            messages: [
                {
                    id: 1,
                    author: 'client',
                    content: 'Mensagem de teste',
                    status: 'sent',
                },
            ],
        }

        const nextState = reducer(startState, alterMessageStatus({ id: 1, status: 'finished' }))

        expect(nextState.messages[0].status).toBe('finished')
    })

    it('should not change status if message is not found', () => {
        const startState: Ichatbot = {
            ...initialState,
            messages: [
                {
                    id: 99,
                    author: 'client',
                    content: 'Outra mensagem',
                    status: 'sent',
                },
            ],
        }

        const nextState = reducer(startState, alterMessageStatus({ id: 1, status: 'finished' }))

        expect(nextState.messages[0].status).toBe('sent') // não muda
    })
})