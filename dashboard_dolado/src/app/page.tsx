import Carrousel from "@/components/home/carousel";
import ChatBot from "@/components/chat/chatbot"

export default function Home() {
  return (
    <section className="flex-1">
        <Carrousel />
        <ChatBot />
    </section>
  );
}
