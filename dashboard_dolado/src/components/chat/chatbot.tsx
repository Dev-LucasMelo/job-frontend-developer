'use client';

import { useEffect, useRef, useState } from "react";

import chatBotIcon from "@/assets/images/chat/chat.png"
import Message from "@/components/chat/message"
import Image from "next/image";

import sendIcon from "@/assets/images/chat/send.png"
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import chatBotService from "@/services/chat";
import TypingIndicator from "@/components/chat/TypingIndicator";

const Chatbot = () => {
    const messageHistory = useAppSelector((state) => state.chatbot.messages)
    const waitingReply = useAppSelector((state) => state.chatbot.waitingReply)

    const lastMessage = messageHistory[messageHistory.length - 1]

    const [isOpen, setIsOpen] = useState(false)
    const [newMessage, setNewMessage] = useState("")

    const dispatch = useAppDispatch()
    const service = useRef(new chatBotService(dispatch))

    const messagesEndRef = useRef<HTMLDivElement>(null);

    function sendMessage() {
        if (newMessage) {
            service.current.sendMessageByInput(newMessage)
            setNewMessage("")
        }
    }

    const sendMessageByKeyboard = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollTo({
            top: messagesEndRef.current.scrollHeight,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messageHistory]);

    return (
        <>
            {isOpen && (
                <div className="z-50 fixed bottom-3 right-5 flex flex-col 
                                overflow-hidden h-110 max-w-sm w-full bg-white rounded-2xl 
                                shadow-xl border border-gray-200">

                    <div className="bg-blue-600 text-white px-4 py-2 flex justify-between items-center">

                        <h2 className="bg-blue-600 text-white p-4 font-semibold text-lg">Chatbot</h2>

                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white text-lg font-bold hover:text-gray-300"
                        >
                            ×
                        </button>
                    </div>

                    <div ref={messagesEndRef} className="p-4 space-y-3 h-[400px] overflow-y-auto text-sm flex flex-col">

                        {messageHistory.map((msg) => (
                            <Message
                                key={msg.id}
                                id={msg.id}
                                content={msg.content}
                                author={msg.author}
                                options={msg.options}
                                status={msg.status}
                                results={msg.results}
                            />
                        ))}

                        {lastMessage && <TypingIndicator author={lastMessage.author} />}
                    </div>

                    <div className="border-t border-gray-200 px-4 py-3 bg-white flex items-center">
                        <input
                            type="text"
                            value={newMessage}
                            onKeyDown={sendMessageByKeyboard}
                            placeholder="Digite sua mensagem..."
                            className="flex-1 w-full p-2 rounded-md border border-gray-300 
                                       focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 
                                       disabled:placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
                            onInput={(e: React.ChangeEvent<HTMLInputElement>) => setNewMessage(e.target.value)}
                            disabled={!waitingReply}
                        />

                        <button
                            onClick={() => sendMessage()}
                            disabled={!waitingReply}
                            className="border border-blue-600 text-blue-600 cursor-pointer p-2 ml-2 rounded-full hover:bg-blue-600 
                                       hover:text-white transition-all duration-300
                                       disabled:opacity-50 disabled:cursor-not-allowed">
                            <Image src={sendIcon} alt="Enviar" width={20} className="transition-transform group-hover:translate-x-1" />
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