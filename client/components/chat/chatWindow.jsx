"use client";

import { useState } from "react";

import MessageInput from "./messageInput";

import MessageList from "./messageList";

function ChatWindow() {
  const currentUser = {
    id: "user_1",
    name: "salvation",
  };

  const [message, setMessage] = useState([
    {
      id: "msg_1",
      text: "Hello",
      senderId: "user_1",
      createdAt: new Date().toISOString(),
    },
    {
      id: "msg_2",
      text: "Hi, how can i help you?",
      senderId: "user_2",
      createdAt: new Date().toISOString(),
    },
    {
      id: "msg_3",
      text: "I need help with fixing my computer. It stopped working and it is not displaying any text on the screen",
      senderId: "user_1",
      createdAt: new Date().toISOString(),
    },
    {
      id: "msg_4",
      text: "This sounds like a serious problem that need to be fixed",
      senderId: "user_2",
      createdAt: new Date().toISOString(),
    },
  ]);

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    const newMessage = {
      id: crypto.randomUUID(),
      text,
      senderId: currentUser.id,
      createdAt: new Date().toISOString(),
    };

    setMessage((prev) => [...prev, newMessage]);
  };

  return (
    <div className=" flex flex-col w-[60%] mx-auto bg-surface h-screen">
      <div className="flex-1 overflow-y-auto p-4">
        <MessageList message={message} currentUserId={currentUser.id} />
      </div>

      <div className="mt-auto pb-3">
        <MessageInput onSend={handleSendMessage} />
      </div>
    </div>
  );
}

export default ChatWindow;
