
import Chatbot from "@/components/chat/chatbot";
import Debug from "@/components/debug/debugComponent";

export default function dashboardPage() {

  return (
    <div>
      <Debug />
      <Chatbot />
    </div>
  );
}