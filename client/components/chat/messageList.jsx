import MessageItem from "./messageItems";

function MessageList({ message, currentUserId }) {
  return (
    <div>
      {message.map((m) => (
        <MessageItem
          key={m.id}
          message={m}
          isOwnMessage={m.senderId === currentUserId}
        />
      ))}
    </div>
  );
}
export default MessageList;
