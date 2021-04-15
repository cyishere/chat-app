import * as timeago from "timeago.js";
import Avatar from "../Avatar";

const MessageItem = ({ selectedUser, user, message }) => {
  let markup = <li className="list-none text-center">Something wrong...</li>;

  if (selectedUser?.username && selectedUser.username === message.to) {
    markup = (
      <li className="list-none flex justify-end space-x-4 mb-8">
        <section>
          <article className="bg-indigo-600 text-white p-4 rounded-md shadow mb-1.5">
            {message.content}
          </article>
          <p className="text-gray-400 text-sm text-right">
            {timeago.format(message.createdAt)}
          </p>
        </section>

        <Avatar imageUrl={user.imageUrl} username={user.username} />
      </li>
    );
  } else {
    markup = (
      <li className="list-none flex space-x-4 mb-8">
        <Avatar username={message.from} imageUrl={selectedUser.imageUrl} />
        <section>
          <article className="bg-white p-4 rounded-md shadow mb-1.5">
            {message.content}
          </article>
          <p className="text-gray-400 text-sm">
            {timeago.format(message.createdAt)}
          </p>
        </section>
      </li>
    );
  }

  return markup;
};

export default MessageItem;
