import chatBotService from "@/services/chat";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { MessageProps } from "@/types/chat/chatTypes";
import { useRef } from "react";

const Message = (props: MessageProps) => {
    const { content, autor, options, status } = props

    const messageStyle = {
        client: "bg-blue-600 text-white w-60 mb-3 p-2 relative left-11 rounded-tl-xl rounded-tr-xl rounded-bl-xl",
        server: "bg-gray-200 w-60 mb-3 p-2 rounded-tr-xl rounded-bl-xl rounded-br-xl"
    }

    const dispatch = useAppDispatch()
    const service = useRef(new chatBotService(dispatch))
    const estadoAtual = useAppSelector((state) => state.chatbot)

    async function escolherOpcao(mensagem: string) {
        let estadoAtualizado = await service.current.enviarMensagemPorSugestao(mensagem, estadoAtual)
        service.current.processarResposta(estadoAtualizado)
    }

    return (
        <>
            <p className={messageStyle[autor]}>
                {content}
            </p>

            {
                options?.map((option, index) => (
                    <button
                        value={option}
                        onClick={(e) => escolherOpcao(option)}
                        key={index}
                        className="
                            text-left duration-300 border border-blue-600 mb-2 rounded-md p-1 cursor-pointer font-semibold bg-white-500 
                            hover:text-white hover:bg-blue-600
                            disabled:opacity-50 disabled:hover:bg-white disabled:text-black disabled:border-gray-600 disabled:cursor-not-allowed
                        "
                        disabled={status == "finished" ? true : false}
                    >
                        {option}
                    </button>
                ))
            }

        </>

    );
}

export default Message;