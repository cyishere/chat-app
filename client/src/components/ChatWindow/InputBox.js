import React from "react";
import { gql, useMutation } from "@apollo/client";
import { useMessageDispatch } from "../../context/message";
import { useFormChange } from "../../utils/hooks";

const SEND_MESSAGE = gql`
  mutation SendMessage($to: String!, $content: String!) {
    sendMessage(to: $to, content: $content) {
      id
      content
      from
      to
      createdAt
    }
  }
`;

const InputBox = ({ selectedUser }) => {
  const { values, handleChange, resetValues } = useFormChange({
    content: "",
  });
  const dispatch = useMessageDispatch();
  const [sendMessage, { loading, error }] = useMutation(SEND_MESSAGE, {
    onCompleted: (data) => {
      dispatch({
        type: "ADD_MESSAGE",
        payload: { username: selectedUser.username, message: data.sendMessage },
      });
      resetValues();
    },
  });

  if (error) {
    alert(error);
  }

  const submitNewMessage = (e) => {
    e.preventDefault();
    sendMessage({ variables: { ...values, to: selectedUser.username } });
  };

  return (
    <form
      className="bg-white p-6 rounded-md flex space-x-4 justify-between"
      onSubmit={submitNewMessage}
    >
      <input
        type="text"
        className="border border-gray-300 flex-grow px-4 placeholder-gray-400 rounded active:border-indigo-500 "
        placeholder="Enter your message here."
        name="content"
        value={values.content}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="bg-indigo-500 text-white py-2 px-6 rounded hover:bg-indigo-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "..." : "Send"}
      </button>
    </form>
  );
};

export default InputBox;
