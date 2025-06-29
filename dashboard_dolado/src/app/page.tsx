import ChatBot from "@/components/chat/chatbot"
import Carousel from "@/components/home/carousel";

export default function Home() {
  return (
    <section className="flex-1">
        <Carousel />
        <ChatBot />
    </section>
  );
}
