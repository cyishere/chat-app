import { Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { useAuthDispatch } from "../context/auth";

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      username
    }
  }
`;

const Home = (props) => {
  const { loading, error, data } = useQuery(GET_USERS);

  const dispatch = useAuthDispatch();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    props.history.push("/login");
  };

  let usersMarkup;

  if (error) console.log(error);

  if (data) console.log(data);

  if (!data || loading) {
    usersMarkup = <p>Loading...</p>;
  } else if (data.getUsers.length === 0) {
    usersMarkup = <p>No users join yet.</p>;
  } else if (data.getUsers.length > 0) {
    usersMarkup = (
      <ul>
        {data.getUsers.map((user) => (
          <li
            className="list-none rounded mb-4 p-4 hover:bg-gray-100"
            key={user.username}
          >
            {user.username}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="grid grid-cols-4 bg-white grid-flow-row h-screen">
      <aside className="p-4 flex chat-window">
        {usersMarkup}
        <div className="flex bg-indigo-200 chat-sidebar-footer">
          <Link className="text-black" to="/register">
            Register
          </Link>
          <Link className="text-black" to="/login">
            Login
          </Link>
          <button
            className="bg-blue-500 py-2 px-6 text-white hover:bg-blue-700"
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </aside>
      <main className="col-span-3 bg-gray-200 flex chat-window p-4">
        <h1 className="font-mono text-6xl leading-8 mt-10 mb-12 text-center">
          Home Page
        </h1>
      </main>
    </div>
  );
};

export default Home;
