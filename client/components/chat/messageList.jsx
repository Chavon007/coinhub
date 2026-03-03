import MessageItem from "./messageItems";

function MessageList({ message, currentUserId }) {
  return (
    <div>
      {message.map((m, index) => (
        <MessageItem
          key={index}
          message={message}
          isOwnMessage={message.senderId === currentUserId}
        />
      ))}
    </div>
  );
}
export default MessageList;
