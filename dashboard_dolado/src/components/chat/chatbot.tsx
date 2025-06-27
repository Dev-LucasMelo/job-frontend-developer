'use client';

import { useState } from "react";

import chatBotIcon from "@/assets/images/chat/chat.png"
import Message from "@/components/chat/message"
import Image from "next/image";

import sendIcon from "@/assets/images/chat/send.png"

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(true)
    const [mensagem, setMensagem] = useState("")

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

                        <Message
                            id={1}
                            content={"teste bot"}
                            autor="server"
                        />

                        <Message
                            id={2}
                            content={"teste client teste client teste client qweuiueqwiuqwe qweiueqwuiweu qewieqi"}
                            autor="client"
                        />

                        <Message
                            id={3}
                            content={"Gostaria de ajuda ? "}
                            autor="server"
                            options={["sim sim sim", "nao", "talvez"]}
                            setMensagem={setMensagem}
                        />

                    </div>

                    <div className="p-2 border-t flex items-center">
                        <input
                            type="text"
                            value={mensagem}
                            placeholder="Digite sua mensagem..."
                            className="flex-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => setMensagem(e.target.value)}
                        />

                        <button 
                            
                            className="border-1 border-blue-600 cursor-pointer 
                            w-8 h-8 rounded-full flex items-center justify-center 
                            transition duration-300 mx-1"
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