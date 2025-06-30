import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import chatbotReducer from '@/store/chat/chatBotSlice'
import Message from '@/components/chat/message'
import { Result } from '@/types/chat/botTypes'

jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => {
        // eslint-disable-next-line @next/next/no-img-element
        return <img {...props} alt={props.alt} />
    },
}))

const renderWithStore = (ui: React.ReactNode) => {
    const store = configureStore({
        reducer: chatbotReducer,
    })

    return render(<Provider store={store}>{ui}</Provider>)
}

describe('Message component', () => {
    it('should apply correct styles based on the author of the message', () => {

        renderWithStore(
            <Message
                id={1}
                author="server"
                content="Olá, sou o usuário"
                status="sent"
            />,
        )

        const message = screen.getByText(/Olá, sou o usuário/i)
        expect(message).toHaveClass('bg-gray-200')
    })

    it('should render clickable options if status is not "finished" and contain array of options', () => {
        const mockOption = 'Quero saber mais'

        renderWithStore(
            <Message
                id={2}
                author="server"
                content="Escolha uma opção:"
                status="sent"
                options={[mockOption]}
            />
        )

        const button = screen.getByRole('button', { name: mockOption })
        expect(button).toBeInTheDocument()
        expect(button).toBeEnabled()
    })

    it('should render full diagnostics when results is present', () => {

        const mockResults: Result = {
            type: "result",
            diagnosis: {
                stage: 'Inicial',
                potential: 'Alto',
                specificInsights: 'Seu perfil indica ótimo potencial.',
                recommendations: ['Estude mais TypeScript', 'Treine lógica de programação'],
            },
            message: "finalizando diagnostico",
            nextSteps: {
                message: "followUp",
                options: ['Quero continuar']
            }
        }

        renderWithStore(
            <Message
                id={3}
                author="server"
                content="Diagnóstico gerado:"
                status="sent"
                results={mockResults}
            />
        )

        expect(screen.getByText(/diagnóstico:/i)).toBeInTheDocument()
        expect(screen.getByText(/Inicial/)).toBeInTheDocument()
        expect(screen.getByText(/Alto/)).toBeInTheDocument()
        expect(screen.getByText(/Seu perfil indica ótimo potencial/)).toBeInTheDocument()
        expect(screen.getByText(/Estude mais TypeScript/)).toBeInTheDocument()
        expect(screen.getByText(/Treine lógica de programação/)).toBeInTheDocument()
    })
})