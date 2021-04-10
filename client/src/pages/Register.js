import { useState } from "react";
import { Link } from "react-router-dom";
import { useFormChange } from "../utils/hooks";
import { gql, useMutation } from "@apollo/client";

const REGISTER_USER = gql`
  mutation Register(
    $username: String!
    $email: String!
    $password: String!
    $passconf: String!
  ) {
    register(
      username: $username
      email: $email
      password: $password
      passconf: $passconf
    ) {
      username
      email
      createdAt
    }
  }
`;

const Register = (props) => {
  const { values, handleChange } = useFormChange({
    username: "",
    email: "",
    password: "",
    passconf: "",
  });
  const [errors, setErrors] = useState({});

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    onCompleted: () => props.history.push("/login"),
    onError: (err) => err.graphQLErrors[0].extensions.errors,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    registerUser({ variables: values });
  };

  return (
    <div className="box-border min-h-screen flex flex-col justify-center items-center">
      <section className="container max-w-md mx-auto my-12 p-8 bg-white">
        <h1 className="font-mono text-6xl leading-8 mt-10 mb-12 text-center">
          Register
        </h1>
        <form className="mx-auto mb-6" onSubmit={handleSubmit}>
          <label htmlFor="username" className="block text-lg">
            Username
          </label>
          <input
            type="text"
            className="block border border-solid border-gray-500 w-full p-2 mb-4 focus:bg-gray-100"
            id="username"
            name="username"
            value={values.username}
            onChange={handleChange}
            placeholder="Luke Skywalker"
          />

          <label htmlFor="email" className="block text-lg">
            E-mail
          </label>
          <input
            type="email"
            className="block border border-solid border-gray-500 w-full p-2 mb-4 focus:bg-gray-100"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="luke@starwar.com"
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
            value={values.password}
            onChange={handleChange}
            placeholder="At least 5 characters"
          />

          <label htmlFor="passconf" className="block text-lg">
            Confirm Password
          </label>
          <input
            type="passconf"
            className="block border border-solid border-gray-500 w-full p-2 mb-4 focus:bg-gray-100"
            id="passconf"
            name="passconf"
            value={values.passconf}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="bg-pink-500 border-0 w-full text-white hover:bg-pink-600 py-2 px-4"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
        <p className="text-center">
          Already have an account? Please{" "}
          <Link to="/login" className="text-green-600">
            login
          </Link>
          .
        </p>
      </section>
    </div>
  );
};

export default Register;
