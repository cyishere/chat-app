import Avatar from "../Avatar";

const UserItem = ({ user, seletedUser, setSelectedUser }) => {
  const activeClassNames =
    seletedUser?.username && seletedUser.username === user.username
      ? "bg-indigo-100"
      : "";

  return (
    <li
      className={`list-none flex space-x-4 items-center rounded p-4 cursor-pointer hover:bg-gray-100 ${activeClassNames}`}
      onClick={() => setSelectedUser(user)}
    >
      <Avatar username={user.username} imageUrl={user.imageUrl} />
      <div>
        <h3 className="font-medium">{user.username}</h3>
        <p className="text-gray-400">{`${user.latestMessage.content.slice(
          0,
          19
        )}...`}</p>
      </div>
    </li>
  );
};

export default UserItem;
