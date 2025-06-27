import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ichatbot, MessageProps} from '@/types/chat/chatTypes';

const estadoInicial: Ichatbot = {
    messages: [{
        id: Date.now(),
        autor: 'server',
        content: "Olá me chamo Sofia, sou assistente virtual da dolado. em que posso ajudar ?"
    }]
}

export const chatBotSlice = createSlice({
    name: "chatbot",
    initialState: estadoInicial,
    reducers: {
        addMessage: (state, action: PayloadAction<MessageProps>) => {
            state.messages.push({ ...action.payload });
        },
    }
})

export const { addMessage } = chatBotSlice.actions;
export default chatBotSlice.reducer