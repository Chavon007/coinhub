import MessageItem from "./messageItems";

function MessageList({ message, currentUserId }) {
  return (
    <div>
      {message.map((m, index) => (
        <MessageItem
          key={index}
          message={m}
          isOwnMessage={m.senderId === currentUserId}
        />
      ))}
    </div>
  );
}
export default MessageList;
