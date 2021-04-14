import Avatar from "./Avatar";

const UserItem = ({ user }) => {
  return (
    <li className="list-none flex space-x-4 items-center rounded p-4 cursor-pointer hover:bg-gray-100">
      <Avatar
        user={user}
        imageUrl="https://pbs.twimg.com/profile_images/1354749722422960128/yoHy3kAI_400x400.jpg"
      />
      <span>{user.username}</span>
    </li>
  );
};

export default UserItem;
