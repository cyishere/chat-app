import React from "react";

const InputBox = () => {
  return (
    <form className="bg-white p-6 rounded-md flex space-x-4 justify-between">
      <input
        type="text"
        className="border border-gray-300 flex-grow px-4 placeholder-gray-400 rounded active:border-indigo-500 "
        placeholder="Enter your message here."
      />
      <button
        type="submit"
        className="bg-indigo-500 text-white py-2 px-6 hover:bg-indigo-700 rounded"
      >
        Send
      </button>
    </form>
  );
};

export default InputBox;
