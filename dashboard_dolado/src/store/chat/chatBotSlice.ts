import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ichatbot, MessageProps, steps } from '@/types/chat/chatTypes';

const initialState: Ichatbot = {
    messages: [
        {
            id: Date.now(),
            author: 'server',
            content: "Oi! Eu sou Sofia, consultora digital da Dolado. 😊 Sei que falar sobre vendas online pode parecer complicado, mas prometo que vamos tornar isso bem simples. Em 5 minutos, vou te mostrar exatamente como sua empresa pode crescer nos marketplaces. Pode ser?",
            options: [
                "Claro, vamos lá!",
                "Primeiro quero entender melhor"
            ],
            status: 'sent'
        },
    ],
    currentStep: "welcome",
    stepHistory: [],
    waitingReply: false
}

export const chatBotSlice = createSlice({
    name: "chatbot",
    initialState: initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<MessageProps>) => {
            state.messages.push({ ...action.payload });
        },
        alterCurrentStep: (state, action: PayloadAction<steps>) => {
            state.currentStep = action.payload
        },
        changeState: (state, action: PayloadAction<boolean>) => {
            state.waitingReply = action.payload
        },
        addStep: (state, action: PayloadAction<steps>) => {
            state.stepHistory.push(action.payload)
        },
        alterMessageStatus: (state, action: PayloadAction<{ id: number, status: "sent" | "finished" }>) => {
            const target = state.messages.find(item => item.id === action.payload.id)
            if (target) {
                target.status = action.payload.status
            }
        }
    }
})

export const { addMessage, alterCurrentStep, changeState, addStep, alterMessageStatus } = chatBotSlice.actions;
export default chatBotSlice.reducer