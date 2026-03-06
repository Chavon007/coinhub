"use client";

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
    <div className=" p-3 rounded-xl w-[98%] mx-auto bg-background">
      <form onSubmit={handleSubmit}>
        {error && (
          <p className="text-red-500 text-xs font-outfit font-light">{error}</p>
        )}

        <div className="flex justify-between items-center">
          <input
            className="border-none w-[500px] p-2 text-text-primary text-xs font-outfit focus:outline-none placeholder:text-text-secondary placeholder:text-xs placeholder:font-nunito-sans"
            type="text"
            placeholder="Type your message"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button
            className="text-text-primary text-2xl hover:text-text-secondary cursor-pointer"
            type="submit"
          >
            <IoMdSend />
          </button>
        </div>
      </form>
    </div>
  );
}
export default MessageInput;
