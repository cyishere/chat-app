import { Link } from "react-router-dom";

const Home = () => {
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
    </div>
  );
};

export default Home;
