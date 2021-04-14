import { useAuthState, useAuthDispatch } from "../../context/auth";
import Avatar from "./Avatar";

const Footer = (props) => {
  const { user } = useAuthState();

  const dispatch = useAuthDispatch();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    props.history.push("/login");
  };

  return (
    <div className="flex justify-between bg-gray-200 p-4 rounded-md">
      <div className="flex space-x-4 items-center">
        <Avatar
          imageUrl="https://pbs.twimg.com/profile_images/1380714602996985857/CUN8xqah_400x400.jpg"
          user={user}
        />
        <span>{user.username}</span>
      </div>
      <button
        className="bg-blue-500 py-2 px-6 text-white hover:bg-blue-700"
        type="button"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Footer;
