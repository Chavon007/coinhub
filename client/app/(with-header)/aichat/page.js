import ChatHistory from "@/components/chat/chathistory";
import ChatWindow from "@/components/chat/chatWindow";
import ReferenceToken from "@/components/referenceToken";
function AiChat() {
  return (
    <div className="flex bg-background w-full md:h-screen  lg:h-auto">
      <ChatHistory />
      <ChatWindow />
      <ReferenceToken />
    </div>
  );
}

export default AiChat;
