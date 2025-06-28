'use client';

import { useRef, useState } from "react";

import chatBotIcon from "@/assets/images/chat/chat.png"
import Message from "@/components/chat/message"
import Image from "next/image";

import sendIcon from "@/assets/images/chat/send.png"
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import chatBotService from "@/services/chat";

const Chatbot = () => {
    const historicoConversa = useAppSelector((state) => state.chatbot.messages)
    const aguardandoResposta = useAppSelector((state) => state.chatbot.aguardandoResposta)

    const [isOpen, setIsOpen] = useState(true)
    const [mensagem, setMensagem] = useState("")

    const dispatch = useAppDispatch()
    const service = useRef(new chatBotService(dispatch))

    function enviarMensagem() {
        if (mensagem) {
            service.current.enviarMensagemPorInput(mensagem)
            setMensagem("")
        }
    }

    const enviarMensagemTeclado = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            enviarMensagem();
        }
    };

    return (
        <>
            {isOpen && (
                <div className="z-50 fixed bottom-3 right-5 w-80 h-96 bg-white border rounded-xl shadow-xl flex flex-col overflow-hidden">

                    <div className="bg-blue-600 text-white px-4 py-2 flex justify-between items-center">
                        <h2 className="font-semibold text-sm">Chatbot</h2>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white text-lg font-bold hover:text-gray-300"
                        >
                            ×
                        </button>
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto text-sm text-gray-700 flex flex-col">

                        {historicoConversa.map((msg) => (
                            <Message
                                key={msg.id}
                                id={msg.id}
                                content={msg.content}
                                autor={msg.autor}
                                options={msg.options}
                                status={msg.status}
                            />
                        ))}

                        {/* component de loading */}
                    </div>

                    <div className="p-2 border-t flex items-center">
                        <input
                            type="text"
                            value={mensagem}
                            onKeyDown={enviarMensagemTeclado}
                            placeholder="Digite sua mensagem..."
                            className="flex-1 px-3 py-2 border rounded-md text-sm 
                                       focus:outline-none focus:ring-2 focus:ring-blue-400 
                                       disabled:placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => setMensagem(e.target.value)}
                            disabled={!aguardandoResposta}
                        />

                        <button
                            onClick={() => enviarMensagem()}
                            className="border-1 border-blue-600 cursor-pointer 
                                       w-8 h-8 rounded-full flex items-center justify-center 
                                       transition duration-300 mx-1
                                       disabled:opacity-50 disabled:cursor-not-allowed
                            "
                            disabled={!aguardandoResposta}
                        >
                            <Image
                                src={sendIcon}
                                alt="enviar"
                                width={20}
                            />

                        </button>

                    </div>

                </div>
            )}

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer z-40 fixed bottom-10 right-10 w-14 h-14 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg flex items-center justify-center text-white text-2xl font-bold transition duration-300"
                aria-label="Abrir chatbot"
            >
                <Image
                    src={chatBotIcon}
                    alt="Iniciar conversa"
                    width={30}
                    height={30}
                />
            </button>

        </>
    );
}

export default Chatbot;