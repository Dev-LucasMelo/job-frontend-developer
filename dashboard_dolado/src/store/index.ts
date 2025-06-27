import { configureStore } from '@reduxjs/toolkit';
import chatBotReducer from "@/store/chat/chatBotSlice"

export const store = configureStore({
  reducer: {
    chatbot: chatBotReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;