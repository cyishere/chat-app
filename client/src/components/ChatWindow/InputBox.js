import React from "react";

const InputBox = () => {
  return (
    <form className="bg-white p-6 rounded-md flex space-x-4 justify-between">
      <input
        type="text"
        className="border border-gray-300 flex-grow active:border-indigo-500"
      />
      <button
        type="submit"
        className="bg-indigo-500 text-white py-2 px-4 hover:bg-indigo-700"
      >
        Send
      </button>
    </form>
  );
};

export default InputBox;
