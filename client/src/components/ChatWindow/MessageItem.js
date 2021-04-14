import Avatar from "../Avatar";

const MessageItem = ({ selectedUser, user, message }) => {
  let markup = <li className="list-none text-center">Something wrong...</li>;

  if (selectedUser?.username && selectedUser.username === message.to) {
    markup = (
      <li className="list-none flex justify-end space-x-4 mb-8">
        <article className="bg-indigo-600 text-white p-4 rounded-md shadow">
          {message.content}
        </article>
        <Avatar imageUrl={user.imageUrl} username={user.username} />
      </li>
    );
  } else {
    markup = (
      <li className="list-none flex space-x-4 mb-8">
        <Avatar username={message.from} imageUrl={selectedUser.imageUrl} />
        <article className="bg-white p-4 rounded-md shadow">
          {message.content}
        </article>
      </li>
    );
  }

  return markup;
};

export default MessageItem;
