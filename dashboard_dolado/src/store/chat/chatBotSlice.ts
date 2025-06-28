import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ichatbot, MessageProps, passos } from '@/types/chat/chatTypes';

const estadoInicial: Ichatbot = {
    messages: [
        {
            id: Date.now(),
            autor: 'server',
            content: "Oi! Eu sou Sofia, consultora digital da Dolado. 😊 Sei que falar sobre vendas online pode parecer complicado, mas prometo que vamos tornar isso bem simples. Em 5 minutos, vou te mostrar exatamente como sua empresa pode crescer nos marketplaces. Pode ser?",
            options: [
                "Claro, vamos lá!",
                "Primeiro quero entender melhor"
            ],
            status: 'sent'
        },
    ],
    passoAtual: "welcome",
    historicoPassos: [],
    aguardandoResposta: true
}

export const chatBotSlice = createSlice({
    name: "chatbot",
    initialState: estadoInicial,
    reducers: {
        addMessage: (state, action: PayloadAction<MessageProps>) => {
            state.messages.push({ ...action.payload });
        },
        alterCurrentStep: (state, action: PayloadAction<passos>) => {
            state.passoAtual = action.payload
        },
        changeState: (state, action: PayloadAction<boolean>) => {
            state.aguardandoResposta = action.payload
        },
        addStep: (state, action: PayloadAction<passos>) => {
            state.historicoPassos.push(action.payload)
        },
        alterStatusMessage: (state, action: PayloadAction<{ id: number, status: "sent" | "finished"}> ) => {
            const alvo = state.messages.find(item => item.id === action.payload.id)
            if (alvo) {
                alvo.status = action.payload.status
            }
        }
    }
})

export const { addMessage, alterCurrentStep, changeState, addStep, alterStatusMessage } = chatBotSlice.actions;
export default chatBotSlice.reducer