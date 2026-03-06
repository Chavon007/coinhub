"use client";

import { useEffect, useRef } from "react";
import MessageItem from "./messageItems";

function MessageList({ message, currentUserId }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div>
      {message.map((m) => (
        <MessageItem
          key={m.id}
          message={m}
          isOwnMessage={m.senderId === currentUserId}
        />
      ))}

      <div ref={bottomRef}></div>
    </div>
  );
}

export default MessageList;
