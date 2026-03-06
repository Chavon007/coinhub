function MessageItem({ message, isOwnMessage }) {
  return (
    <div
      className={`flex  ${isOwnMessage ? "justify-end" : "justify-start"} mb-2 `}
    >
      <div className="flex flex-col p-1 lg:p-5">
        <div
          className={`max-w-[250px] md:max-w-[300px] lg:max-w-[400px] rounded-xl p-2 ${isOwnMessage ? "bg-gray-200" : "bg-gray-600"}`}
        >
          <p
            className={`font-roboto text-sm font-light ${isOwnMessage ? "text-black" : "text-text-primary"}`}
          >
            {message.text}
          </p>
          <small className="text-text-secondary text-xs font-outfit font-bold">
            {new Date(message.createdAt).toLocaleTimeString()}
          </small>
        </div>
      </div>
    </div>
  );
}

export default MessageItem;
