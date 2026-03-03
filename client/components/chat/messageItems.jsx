function MessageItem({ message, isOwnMessage }) {
  return (
    <div>
      <div>
        <p>{message.text}</p>
        <small>{new Date(message.createdAt).toLocaleTimeString()}</small>
      </div>

      <div>{isOwnMessage ? "You" : "Other user"}</div>
    </div>
  );
}

export default MessageItem;
