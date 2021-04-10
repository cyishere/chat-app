import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="box-border min-h-screen flex flex-col justify-center items-center">
      <section className="container max-w-md mx-auto my-12 p-8 bg-white">
        <h1 className="font-mono text-6xl leading-8 mt-10 mb-12 text-center">
          Login
        </h1>
        <form className="mx-auto mb-6">
          <label htmlFor="username" className="block text-lg">
            Username
          </label>
          <input
            type="text"
            className="block border border-solid border-gray-500 w-full p-2 mb-4 focus:bg-gray-100"
            id="username"
            name="username"
            placeholder="Luke Skywalker"
          />

          <label htmlFor="password" className="block text-lg">
            Password
          </label>
          <input
            type="password"
            className="block border border-solid border-gray-500 w-full p-2 mb-4 focus:bg-gray-100"
            id="password"
            name="password"
            min="5"
            placeholder="At least 5 characters"
          />

          <button className="bg-green-500 border-0 w-full text-white hover:bg-green-600 py-2 px-4">
            Login
          </button>
        </form>
        <p className="text-center">
          Haven't had an account? Please{" "}
          <Link className="text-pink-600" to="/register">
            register
          </Link>
          .
        </p>
      </section>
    </div>
  );
};

export default Login;
