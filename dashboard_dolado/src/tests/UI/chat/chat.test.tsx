import React from 'react'

jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => {
        // eslint-disable-next-line @next/next/no-img-element
        return <img {...props} alt={props.alt} />
    },
}))

import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import Chatbot from '@/components/chat/chatbot'
import chatbotReducer from '@/store/chat/chatBotSlice'

const renderWithTestStore = (ui: React.ReactNode, preloadedState: any) => {
    const store = configureStore({
        reducer: chatbotReducer,
        preloadedState
    })

    return render(<Provider store={store}>{ui}</Provider>)
}

describe('Chatbot', () => {
    it('should open and close the chatbot when clicking the floating button', () => {

        renderWithTestStore(<Chatbot />, {
            chatbot: {
                messages: [],
                waitingReply: false,
            },
        })

        expect(screen.queryByText('Chatbot')).not.toBeInTheDocument()

        fireEvent.click(screen.getByRole('button', { name: /abrir chatbot/i }))
        expect(screen.getByText('Chatbot')).toBeInTheDocument()

        fireEvent.click(screen.getByText('×'))
        expect(screen.queryByText('Chatbot')).not.toBeInTheDocument()
    })

    it('should render history messages', () => {

        renderWithTestStore(<Chatbot />, {
            chatbot: {
                messages: [
                    { id: 1, content: 'Olá! Como posso ajudar?', author: 'bot' },
                    { id: 2, content: 'Gostaria de saber mais', author: 'user' }
                ],
                waitingReply: true
            }
        })

        fireEvent.click(screen.getByRole('button', { name: /abrir chatbot/i }))

        expect(screen.getByText('Olá! Como posso ajudar?')).toBeInTheDocument()
        expect(screen.getByText('Gostaria de saber mais')).toBeInTheDocument()
    })

    it('should disable input and button when waitingReply is true', () => {
        renderWithTestStore(<Chatbot />, {
            chatbot: {
                messages: [],
                waitingReply: false,
            },
        })

        fireEvent.click(screen.getByRole('button', { name: /abrir chatbot/i }))

        const input = screen.getByPlaceholderText(/digite sua mensagem/i)
        const button = screen.getByRole('button', { name: /enviar/i })

        expect(input).toBeDisabled()
        expect(button).toBeDisabled()
    })
})