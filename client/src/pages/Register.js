const Register = () => {
  return (
    <div className="container max-w-md mx-auto my-12 p-8 bg-white">
      <h1 className="font-mono text-6xl leading-8 mt-10 mb-12 text-center">
        Register
      </h1>
      <form className="mx-auto">
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

        <label htmlFor="email" className="block text-lg">
          E-mail
        </label>
        <input
          type="email"
          className="block border border-solid border-gray-500 w-full p-2 mb-4 focus:bg-gray-100"
          id="email"
          name="email"
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
        />

        <button className="bg-pink-500 border-0 w-full text-white hover:bg-pink-600 py-2 px-4">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;
