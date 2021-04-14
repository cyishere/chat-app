import Avatar from "../Sidebar/Avatar";

const Messages = () => {
  const user1 = {
    username: "Lou Miller",
  };
  const user2 = {
    username: "Debbie Ocean",
  };

  return (
    <ul className="p-8">
      <li className="list-none flex space-x-4 mb-8">
        <Avatar
          user={user1}
          imageUrl="https://pbs.twimg.com/profile_images/1354749722422960128/yoHy3kAI_400x400.jpg"
        />
        <article className="bg-white p-4 rounded-md shadow">
          Oh, honey, is this a proposal?
        </article>
      </li>
      <li className="list-none flex justify-end space-x-4 mb-8">
        <article className="bg-indigo-600 text-white p-4 rounded-md shadow">
          Baby, I don't have a diamond yet.
        </article>
        <Avatar
          imageUrl="https://pbs.twimg.com/profile_images/1380714602996985857/CUN8xqah_400x400.jpg"
          user={user2}
        />
      </li>
    </ul>
  );
};

export default Messages;
