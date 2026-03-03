"use client"

import { useState } from "react";
import { IoMdSend } from "react-icons/io";
function MessageInput({ onSend }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) {
      setError("Please enter a message");
      return;
    }
    onSend(text.trim());
    setError("");
    setText("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {error && <p>{error}</p>}

        <div>
          <input
            type="text"
            placeholder="Type your message"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button type="submit">
            <IoMdSend />
          </button>
        </div>
      </form>
    </div>
  );
}
export default MessageInput;
