import { Link } from "react-router-dom";
import { useAuthDispatch } from "../context/auth";

const Home = (props) => {
  const dispatch = useAuthDispatch();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    props.history.push("/login");
  };

  return (
    <div className="max-w-md mx-auto text-center">
      <h1 className="font-mono text-6xl leading-8 mt-10 mb-12 text-center">
        Home Page
      </h1>
      <p className="mb-10 text-white">
        <Link to="/register">Register</Link>
      </p>
      <p className="mb-10 text-white">
        <Link to="/login">Login</Link>
      </p>
      <p className="mb-10 text-white">
        <button
          className="bg-gray-50 py-2 px-6 text-blue-700 hover:bg-gray-300 hover:text-black"
          type="button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </p>
    </div>
  );
};

export default Home;
