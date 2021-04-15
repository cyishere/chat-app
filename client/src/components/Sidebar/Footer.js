import { useAuthState, useAuthDispatch } from "../../context/auth";
import Avatar from "../Avatar";

const Footer = () => {
  const { user } = useAuthState();

  const dispatch = useAuthDispatch();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    window.location.href = "/login";
  };

  return (
    <div className="flex justify-between bg-gray-200 p-4 rounded-md">
      <div className="flex space-x-4 items-center">
        <Avatar imageUrl={user.imageUrl} username={user.username} />
        <span>{user.username}</span>
      </div>
      <button
        className="bg-blue-500 py-2 px-6 text-white rounded hover:bg-blue-700"
        type="button"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Footer;
