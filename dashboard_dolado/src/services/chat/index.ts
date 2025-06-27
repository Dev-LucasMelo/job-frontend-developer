import { AppDispatch } from "@/store";
import { addMessage } from "@/store/chat/chatBotSlice";

export default class chatBotService {
    private dispatch: AppDispatch

    constructor(dispatch: AppDispatch) {
        this.dispatch = dispatch;
    }

    async enviarMensagemPorInput(mensagem: string) {
        this.dispatch(addMessage({
            id: Date.now(),
            autor: "client",
            content: mensagem
        }))
    }

    async enviarMensagemPorSugestao(mensagem: string) {
        this.dispatch(addMessage({
            id: Date.now(),
            autor: "client",
            content: mensagem
        }))
    }

}