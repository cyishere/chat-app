import { useState } from "react";
import { Link } from "react-router-dom";
import { useFormChange } from "../utils/hooks";
import { gql, useLazyQuery } from "@apollo/client";

const LOGIN_USER = gql`
  query Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      email
      createdAt
      token
    }
  }
`;

const Login = (props) => {
  const { values, handleChange } = useFormChange({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const [loginUser, { loading }] = useLazyQuery(LOGIN_USER, {
    onCompleted: (data) => {
      localStorage.setItem("token", data.login.token);
      props.history.push("/");
    },
    onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors),
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    loginUser({ variables: values });
  };

  return (
    <div className="box-border min-h-screen flex flex-col justify-center items-center">
      <section className="container max-w-md mx-auto my-12 p-8 bg-white">
        <h1 className="font-mono text-6xl leading-8 mt-10 mb-12 text-center">
          Login
        </h1>
        <form className="mx-auto mb-6" onSubmit={handleLoginSubmit}>
          <label
            htmlFor="username"
            className={`block text-lg ${errors.username && "text-red-500"}`}
          >
            {errors.username ?? "Username"}
          </label>
          <input
            type="text"
            className={`block border border-solid w-full p-2 mb-4 focus:bg-gray-100 ${
              errors.username ? "border-red-500" : "border-gray-500"
            }`}
            id="username"
            name="username"
            value={values.username}
            onChange={handleChange}
            placeholder="Luke Skywalker"
          />

          <label
            htmlFor="password"
            className={`block text-lg ${errors.password && "text-red-500"}`}
          >
            {errors.password ?? "Password"}
          </label>
          <input
            type="password"
            className={`block border border-solid w-full p-2 mb-4 focus:bg-gray-100 ${
              errors.password ? "border-red-500" : "border-gray-500"
            }`}
            id="password"
            name="password"
            min="5"
            value={values.password}
            onChange={handleChange}
            placeholder="At least 5 characters"
          />

          <button
            className="bg-green-500 border-0 w-full text-white hover:bg-green-600 py-2 px-4"
            disabled={loading}
          >
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